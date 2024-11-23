from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import random
import os
import pickle

import torch
from transformers import pipeline


router = APIRouter()

# Example document data
documents = [
    {"document": "IEC", "description": "Importer-Exporter Code, required for international trade."},
    {"document": "AD Code", "description": "Authorized Dealer Code for foreign currency transactions."},
    {"document": "Commercial Invoice", "description": "Details of goods, value, and sale terms."},
    {"document": "Bill of Lading", "description": "Proof of goods received for shipment."},
    {"document": "Packing List", "description": "Details of shipment contents."},
]

# Route for generating random documents
@router.get("/generate-synthetic-data/{document_type}")
async def generate_synthetic_data_endpoint(document_type: str):
    try:
        # Generate synthetic data based on document type
        synthetic_data = generate_synthetic_data(document_type)
        return synthetic_data
    except Exception as e:
        return JSONResponse(content={"message": f"Error: {str(e)}"}, status_code=500)

# Pydantic Model for Document Validation Input
class Document(BaseModel):
    document_type: str
    content: str  # You can modify this to handle more complex document data.

# Route for Document Validation
@router.post("/validate-document")
async def validate_document(document: Document):
    valid_documents = ["Commercial Invoice", "IEC", "AD Code", "Bill of Lading", "Packing List"]
    if document.document_type not in valid_documents:
        raise HTTPException(status_code=400, detail="Invalid document type.")
    
    # Validation logic can go here (e.g., check content format)
    return {"message": f"The {document.document_type} is valid."}

# Route for uploading documents
@router.post("/upload-document")
async def upload_document(file: UploadFile = File(...)):
    try:
        # Ensure the directory exists, create it if it doesn't
        upload_folder = "./uploads"
        os.makedirs(upload_folder, exist_ok=True)
        
        # Save file to local storage
        file_location = os.path.join(upload_folder, file.filename)
        with open(file_location, "wb") as buffer:
            buffer.write(await file.read())
        
        return {"filename": file.filename, "location": file_location}
    except Exception as e:
        return JSONResponse(content={"message": f"Error: {str(e)}"}, status_code=500)

# Synthetic data generation for different document types
def generate_synthetic_data(document_type: str):
    data = {
        "IEC": {
            "document_type": "IEC",
            "content": f"IEC number: {random.randint(100000, 999999)}, issued by {random.choice(['Government of India', 'Ministry of Commerce'])}."
        },
        "AD Code": {
            "document_type": "AD Code",
            "content": f"AD Code: {random.randint(1000, 9999)}, issued by {random.choice(['Reserve Bank of India', 'Authorized Bank'])}."
        },
        "Commercial Invoice": {
            "document_type": "Commercial Invoice",
            "content": f"Invoice Number: {random.randint(100000, 999999)}\nItems: {random.choice(['Laptop', 'Mobile', 'Tablet'])}\nQuantity: {random.randint(1, 5)}\nPrice: ₹{random.randint(10000, 50000)}."
        },
        "Bill of Lading": {
            "document_type": "Bill of Lading",
            "content": f"Bill Number: {random.randint(100000, 999999)}\nShipper: {random.choice(['ABC Corp', 'XYZ Pvt Ltd'])}\nConsignee: {random.choice(['Company A', 'Company B'])}."
        },
        "Packing List": {
            "document_type": "Packing List",
            "content": f"Packing List Number: {random.randint(100000, 999999)}\nItems: {random.choice(['Shoes', 'Clothing', 'Electronics'])}\nQuantity: {random.randint(1, 5)}."
        }
    }

    return data.get(document_type, {"message": "Unknown document type"})

# Path to the pickled model
PICKLE_FILE_PATH = "./fine_tuned_tinyroberta.pkl"

# Load the model and tokenizer from the pickle file
with open(PICKLE_FILE_PATH, "rb") as f:
    model, tokenizer = pickle.load(f)

# Create a question-answering pipeline
device = 0 if torch.cuda.is_available() else -1
qa_pipeline = pipeline("question-answering", model=model, tokenizer=tokenizer, device=device)

# Request model for QA
class QARequest(BaseModel):
    context: str
    question: str

# Route to perform question-answering
@router.post("/answer")
async def get_answer(request: QARequest):
    try:
        # Use the pipeline for inference
        result = qa_pipeline(question=request.question, context=request.context)
        return {"answer": result["answer"], "score": result["score"]}
    except Exception as e:
        return {"error": str(e)}
