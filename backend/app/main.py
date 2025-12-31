from fastapi import FastAPI
from app.database.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

from app.routes.budget_router import router as budget_router
from app.routes.transaction_router import router as transaction_router
from app.routes.category_router import router as category_router
import app.models

app = FastAPI()

origins = [
    "http://localhost:5174",  
    "http://127.0.0.1:5174",
    "http://localhost:5173",  
    "http://127.0.0.1:5173",


]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(budget_router)
app.include_router(transaction_router)
app.include_router(category_router)



@app.get("/")
def root():
    return {"message": "CORS Welcome to ClaritySpend backend!"}



