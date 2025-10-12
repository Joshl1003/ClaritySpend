from app.models.budget import Budget

def list_budgets(db, user_id: int):
    return db.query(Budget).filter(Budget.user_id == user_id).all()

def create_budget(db, user_id: int, category_id: int, amount: float, period: str = "monthly"):
    b = Budget(user_id=user_id, category_id=category_id, amount=amount, period=period)
    db.add(b)
    db.commit()
    db.refresh(b)
    return b
