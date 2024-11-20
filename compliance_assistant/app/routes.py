from fastapi import APIRouter
import random

router = APIRouter()

# Example document data
documents = [
    {"document": "IEC", "description": "Importer-Exporter Code, required for international trade."},
    {"document": "AD Code", "description": "Authorized Dealer Code for foreign currency transactions."},
    {"document": "Commercial Invoice", "description": "Details of goods, value, and sale terms."},
    {"document": "Bill of Lading", "description": "Proof of goods received for shipment."},
    {"document": "Packing List", "description": "Details of shipment contents."},
]

@router.get("/generate-documents")
async def generate_documents():
    # Randomly select 3-5 documents
    num_docs = random.randint(3, 5)
    selected_docs = random.sample(documents, num_docs)
    return {"compliance_documents": selected_docs}
