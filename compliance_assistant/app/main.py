from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from typing import Dict
import PyPDF2
import io

# Initialize FastAPI app
app = FastAPI(
    title="FAQ Chat API",
    description="API for answering questions using Google's Gemini AI",
    version="1.0.0"
)

# Configure CORS
origins = [
    "http://localhost:3000",    # React default port
    "http://localhost:5173",    # Vite default port
    "http://127.0.0.1:5173",   # Vite default IP
    "http://127.0.0.1:3000",   # React default IP
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini AI
GEMINI_API_KEY = "AIzaSyCPr8_lAoMrFb8D26V5PF1Oucz08QAedxc"
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-pro')

# Store chat sessions
chat_sessions: Dict[str, genai.ChatSession] = {}

def extract_text_from_pdf(pdf_file: UploadFile) -> str:
    try:
        # Read the file content
        pdf_content = pdf_file.file.read()
        
        # Create a PDF reader object
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(pdf_content))
        
        # Extract text from all pages
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
            
        return text
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Error processing PDF: {str(e)}"
        )

@app.post("/ask/")
async def ask_question(
    question: str = Form(...),
    file: UploadFile = File(...)
):
    try:
        # Validate file type
        if not file.content_type == "application/pdf":
            raise HTTPException(
                status_code=400,
                detail="Only PDF files are supported"
            )

        # Extract text from the PDF
        context = extract_text_from_pdf(file)
        
        # Prepare prompt for Gemini
        prompt = f"""
        Context: {context}

        Question: {question}

        Please provide a clear and concise answer based on the context above.
        """

        # Generate response using Gemini
        response = model.generate_content(prompt)
        
        # Return the response
        return {
            "answer": response.text,
            "score": 0.95  # Placeholder confidence score
        }
    
    except Exception as e:
        if "429" in str(e):
            raise HTTPException(
                status_code=429,
                detail="Rate limit exceeded. Please try again later."
            )
        else:
            print(f"Error: {str(e)}")  # For debugging
            raise HTTPException(
                status_code=500,
                detail=f"An error occurred: {str(e)}"
            )

@app.post("/faq/start")
async def start_faq_session(
    context: str = Form(...),
    session_id: str = Form(...)
):
    try:
        # Initialize chat
        chat = model.start_chat(history=[])
        
        # Send initial context to chat
        initial_prompt = f"""
        You are a compliance FAQ assistant. You will help answer questions about the following context:

        {context}

        Please maintain context of this information for all future questions. Keep your answers clear, 
        concise, and directly related to the provided context.
        """
        
        chat.send_message(initial_prompt)
        
        # Store chat session
        chat_sessions[session_id] = chat
        
        return {
            "message": "FAQ session started successfully",
            "session_id": session_id
        }
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error starting FAQ session: {str(e)}"
        )

@app.post("/faq/ask")
async def ask_faq(
    question: str = Form(...),
    session_id: str = Form(...)
):
    try:
        # Check if session exists
        if session_id not in chat_sessions:
            raise HTTPException(
                status_code=404,
                detail="Session not found. Please start a new FAQ session."
            )
        
        # Get chat session
        chat = chat_sessions[session_id]
        
        # Send question and get response
        response = chat.send_message(question)
        
        return {
            "answer": response.text,
            "session_id": session_id
        }
    
    except Exception as e:
        if "429" in str(e):
            raise HTTPException(
                status_code=429,
                detail="Rate limit exceeded. Please try again later."
            )
        else:
            raise HTTPException(
                status_code=500,
                detail=f"Error processing FAQ question: {str(e)}"
            )

@app.delete("/faq/end/{session_id}")
async def end_faq_session(session_id: str):
    try:
        # Remove chat session
        if session_id in chat_sessions:
            del chat_sessions[session_id]
            return {"message": "FAQ session ended successfully"}
        else:
            raise HTTPException(
                status_code=404,
                detail="Session not found"
            )
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error ending FAQ session: {str(e)}"
        )

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy"}