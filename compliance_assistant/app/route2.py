from fastapi import FastAPI, HTTPException
import pickle
import torch
from transformers import pipeline

# Load the model and tokenizer from the .pkl file
with open("fine_tuned_tinyroberta.pkl", "rb") as f:
    data = pickle.load(f)
    model = data["model"]
    tokenizer = data["tokenizer"]

# Ensure the model is on the correct device (e.g., GPU if available)
device = 0 if torch.cuda.is_available() else -1

# Create a question-answering pipeline
qa_pipeline = pipeline("question-answering", model=model, tokenizer=tokenizer, device=device)

# Initialize FastAPI app
app = FastAPI()

# Define the API endpoint
@app.post("/ask/")
async def ask_question(question: str, context: str):
    try:
        # Perform inference
        result = qa_pipeline(question=question, context=context)
        return {"answer": result["answer"], "score": result["score"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# # Run the FastAPI app
# if _name_ == "_main_":
#     import uvicorn
#     uvicorn.run(app, host="127.0.0.1", port=8000)