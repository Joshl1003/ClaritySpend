from fastapi import FastAPI
from app.routes import budget_router
from app.database.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(budget_router.router)

@app.get("/")
def root():
    return {"message": "Welcome to ClaritySpend backend!"}



