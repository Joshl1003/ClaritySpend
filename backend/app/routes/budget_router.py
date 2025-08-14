from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas.budget_schema import BudgetCreate, BudgetOut
from crud.budget_crud import list_budgets, create_budget
from database import get_db

router = APIRouter()

@router.post("/", response_model=BudgetOut)
def create_budget_endpoint(payload: BudgetCreate, db: Session = Depends(get_db)):
    return create_budget(db, user_id=payload.user_id, category_id=payload.category_id, amount=payload.amount, period=payload.period)

@router.get("/", response_model=list[BudgetOut])
def list_budgets_endpoint(user_id: int, db: Session = Depends(get_db)):
    return list_budgets(db, user_id=user_id)
