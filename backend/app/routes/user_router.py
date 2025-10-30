from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.user_schema import UserCreate, UserOut
from app.crud.user_crud import get_user, get_user_by_email, create_user, delete_user
from app.database.connection import get_db



router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/", response_model=UserOut)
def create_user_endpoint(payload: UserCreate, db: Session = Depends(get_db)):
    if get_user_by_email(db, payload.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    user = create_user(db, username=payload.username, email=payload.email)
    return user

@router.get("/{user_id}", response_model=UserOut)
def get_user_endpoint(user_id: int, db: Session = Depends(get_db)):
    user = get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.delete("/{user_id}", response_model=UserOut)
def delete_user_endpoint(user_id: int, db: Session = Depends(get_db)):
    return delete_user(db, user_id)