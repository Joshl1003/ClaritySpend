from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.category_schema import CategoryCreate, CategoryOut, CategoryUpdate
from app.crud.category_crud import list_categories, create_category, delete_category, update_category
from app.database.connection import get_db

router = APIRouter(prefix="/categories", tags=["Categories"])

@router.post("/", response_model=CategoryOut)
def create_category_endpoint(payload: CategoryCreate, db: Session = Depends(get_db)):
    return create_category(db, name=payload.name, user_id=payload.user_id)

@router.get("/", response_model=list[CategoryOut])
def list_categories_endpoint(user_id: int = None, db: Session = Depends(get_db)):
    return list_categories(db, user_id=user_id)

@router.delete("/{category_id}", response_model=CategoryOut)
def delete_category_endpoint(category_id: int, db: Session = Depends(get_db)):
    return delete_category(db, category_id)

@router.put("/{category_id}", response_model=CategoryOut)
def edit_category_endpoint(category_id: int, payload: CategoryUpdate, db: Session = Depends(get_db)):
    return update_category(db, category_id=category_id, update_data=payload)