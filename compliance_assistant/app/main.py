from fastapi import FastAPI  
from app.routes import router as compliance_router


app = FastAPI(title="Compliance Assistant")  

app.include_router(compliance_router, prefix="/api", tags=["Compliance"])
