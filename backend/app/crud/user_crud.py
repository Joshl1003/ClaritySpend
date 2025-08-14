from models.user import User

def get_user(db, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_email(db, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db, username: str, email: str, password_hash: str = None):
    user = User(username=username, email=email, password_hash=password_hash)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
