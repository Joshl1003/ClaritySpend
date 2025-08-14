from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.user_schema import UserCreate, UserOut
from crud.user_crud import get_user, get_user_by_email, create_user
from database import get_db

router = APIRouter()

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

