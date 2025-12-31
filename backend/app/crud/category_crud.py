from app.models.category import Category
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.schemas.category_schema import CategoryUpdate

def list_categories(db, user_id: int = None):
    q = db.query(Category)
    if user_id:
        q = q.filter(Category.user_id == user_id)
    return q.all()

def create_category(db, name: str, user_id: int = None):
    c = Category(name=name, user_id=user_id)
    db.add(c)
    db.commit()
    db.refresh(c)
    return c

def delete_category(db: Session, category_id: int):
    c = db.get(Category, category_id)
    if not c:
        raise HTTPException(status_code=404, detail="Category not found")
    db.delete(c)
    db.commit()
    return c

def update_category(db: Session, category_id: int, update_data: CategoryUpdate) -> Category:
    c = db.query(Category).filter(Category.id == category_id).first()
    if not c:
        raise HTTPException(status_code=404, detail="category not found")
    
    data = update_data.model_dump(exclude_unset=True)

    for field, value in data.items():
        setattr(c, field, value)

    db.commit()
    db.refresh(c)
    return c