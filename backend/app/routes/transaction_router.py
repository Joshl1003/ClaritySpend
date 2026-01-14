from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.transaction_schema import TransactionCreate, TransactionOut, TransactionUpdate
from app.crud.transaction_crud import list_transactions, create_transaction, delete_transaction, update_transaction
from app.database.connection import get_db
from app.core.deps import get_current_user
from app.models.user import User


router = APIRouter(prefix="/transactions", tags=["Transactions"])

@router.post("/", response_model=TransactionOut)
def create_transaction_endpoint(payload: TransactionCreate, db: Session = Depends(get_db)):
    return create_transaction(
        db,
        description=payload.description,
        amount=payload.amount,
        user_id=payload.user_id,
        category_id=payload.category_id,
        date=payload.date
    )

@router.get("/", response_model=list[TransactionOut])
def list_transactions_endpoint(current_user: User = Depends(get_current_user),  
                               limit: int = 100, db: Session = Depends(get_db)):
    return list_transactions(db, user_id=current_user.id, limit=limit)

@router.delete("/{transaction_id}/", response_model=TransactionOut)
def delete_transaction_endpoint(transaction_id: int, db: Session = Depends(get_db)):
    return delete_transaction(db, transaction_id)

@router.put("/{transaction_id}/", response_model=TransactionOut)
def edit_budget_endpoint(transaction_id: int, payload: TransactionUpdate, db: Session = Depends(get_db)):
    return update_transaction(db, transaction_id=transaction_id, update_data=payload)