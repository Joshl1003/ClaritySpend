from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.budget_schema import BudgetCreate, BudgetOut
from app.crud.budget_crud import list_budgets, create_budget, delete_budget
from app.database.connection import get_db

router = APIRouter(prefix="/budgets", tags=["Budgets"])

@router.post("/", response_model=BudgetOut)
def create_budget_endpoint(payload: BudgetCreate, db: Session = Depends(get_db)):
    return create_budget(
        db,
        user_id=payload.user_id,
        category_id=payload.category_id,
        amount=payload.amount,
        period=payload.period
    )

@router.get("/", response_model=list[BudgetOut])
def list_budgets_endpoint(user_id: int, db: Session = Depends(get_db)):
    return list_budgets(db, user_id=user_id)

@router.delete("/{budget_id}", response_model=BudgetOut)
def delete_budget_endpoint(budget_id: int, db: Session = Depends(get_db)):
    return delete_budget(db, budget_id)



