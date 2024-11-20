import json  

def validate_compliance(content: str):  
    # Simulated compliance validation logic  
    required_fields = ["IEC", "AD Code", "Shipping Bill", "Commercial Invoice"]  
    document_data = json.loads(content)  

    missing_fields = [field for field in required_fields if field not in document_data]  
    if missing_fields:  
        return {"status": "fail", "missing_fields": missing_fields}  

    return {"status": "success", "message": "All required fields are present"}  
