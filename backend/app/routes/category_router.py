from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.category_schema import CategoryCreate, CategoryOut, CategoryUpdate
from app.crud.category_crud import list_categories, create_category, delete_category, update_category
from app.database.connection import get_db
from app.core.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/categories", tags=["Categories"])

@router.post("/", response_model=CategoryOut)
def create_category_endpoint(payload: CategoryCreate, db: Session = Depends(get_db)):
    return create_category(db, name=payload.name, user_id=payload.user_id)

@router.get("/", response_model=list[CategoryOut])
def list_categories_endpoint(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return list_categories(db, user_id=current_user.id)

@router.delete("/{category_id}", response_model=CategoryOut)
def delete_category_endpoint(category_id: int, db: Session = Depends(get_db)):
    return delete_category(db, category_id)

@router.put("/{category_id}", response_model=CategoryOut)
def edit_category_endpoint(category_id: int, payload: CategoryUpdate, db: Session = Depends(get_db)):
    return update_category(db, category_id=category_id, update_data=payload)