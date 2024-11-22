from fastapi import FastAPI  
from fastapi.middleware.cors import CORSMiddleware  
from app.routes import router as compliance_router


app = FastAPI(title="Compliance Assistant")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Add your frontend URL here
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)
app.include_router(compliance_router, prefix="/api", tags=["Compliance"])
