from fastapi import FastAPI
from app.routes import budget_router
from backend.app.database.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:5173",  
]

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(budget_router.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Welcome to ClaritySpend backend!"}



