from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas.category_schema import CategoryCreate, CategoryOut
from crud.category_crud import list_categories, create_category
from database import get_db

router = APIRouter()

@router.post("/", response_model=CategoryOut)
def create_category_endpoint(payload: CategoryCreate, db: Session = Depends(get_db)):
    return create_category(db, name=payload.name, user_id=payload.user_id)

@router.get("/", response_model=list[CategoryOut])
def list_categories_endpoint(user_id: int = None, db: Session = Depends(get_db)):
    return list_categories(db, user_id=user_id)
