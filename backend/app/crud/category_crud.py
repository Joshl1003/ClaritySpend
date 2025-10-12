from app.models.category import Category

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
