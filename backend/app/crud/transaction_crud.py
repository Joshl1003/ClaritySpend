from app.models.transaction import Transaction
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.schemas.transaction_schema import TransactionUpdate

def list_transactions(db, user_id: int = None, limit: int = 100):
    q = db.query(Transaction).order_by(Transaction.date.desc())
    if user_id:
        q = q.filter(Transaction.user_id == user_id)
    return q.limit(limit).all()

def create_transaction(db, description, amount, user_id, category_id=None, date=None):
    t = Transaction(description=description, amount=amount, user_id=user_id, category_id=category_id)
    if date:
        t.date = date
    db.add(t)
    db.commit()
    db.refresh(t)
    return t

def delete_transaction(db: Session, transaction_id: int):
    t = db.get(Transaction, transaction_id)
    if not t:
        raise HTTPException(status_code=404, detail="Transaction not found")
    db.delete(t)
    db.commit()
    return t

def update_transaction(db: Session, transaction_id: int, update_data: TransactionUpdate) -> Transaction:
    t = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if not t:
        raise HTTPException(status_code=404, detail="Transaction not found")
    
    data = update_data.model_dump(exclude_unset=True)

    for field, value in data.items():
        setattr(t, field, value)

    db.commit()
    db.refresh(t)
    return t