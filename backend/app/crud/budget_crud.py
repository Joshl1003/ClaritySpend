from app.models.budget import Budget
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.schemas.budget_schema import BudgetUpdate

def list_budgets(db, user_id: int):
    return db.query(Budget).filter(Budget.user_id == user_id).all()

def create_budget(db, name: str, user_id: int, category_id: int, amount: float, period: str = "monthly"):
    b = Budget(name=name, user_id=user_id, category_id=category_id, amount=amount, period=period)
    db.add(b)
    db.commit()
    db.refresh(b)
    return b

def delete_budget(db: Session, budget_id: int):
    b = db.query(Budget).filter(Budget.id == budget_id).first()
    if not b:
        raise HTTPException(status_code=404, detail="Budget not found")
    db.delete(b)
    db.commit()
    return b

def update_budget(db: Session, budget_id: int, update_data: BudgetUpdate) -> Budget:
    b = db.query(Budget).filter(Budget.id == budget_id).first()
    if not b:
        raise HTTPException(status_code=404, detail="Budget not found")
    
    data = update_data.model_dump(exclude_unset=True)

    for field, value in data.items():
        setattr(b, field, value)

    db.commit()
    db.refresh(b)
    return b