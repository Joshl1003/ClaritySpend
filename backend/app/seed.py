from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database.database import SessionLocal, Base, engine
from app.models.user import User
from app.models.category import Category
from app.models.transaction import Transaction
from app.models.budget import Budget
from datetime import datetime, timedelta
import random


def run():
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()
    try:
        # Create user instance
        user = db.query(User).filter(User.email == "test@example.com").first()
        if not user:
            user = User(
                username="test_user", 
                email="test@example.com", 
                password_hash="hashed_pw"
            )
            # Add it to the session (staged for commit)
            db.add(user)
            # Commit the transaction — writes record to database
            db.commit() 
            # Refresh the object to get auto-generated fields (like user.id)
            db.refresh(user)

        # categories for user
        names = ["Food", "Transportation", "Entertainment", "Bills", "Shopping", "Health"]
        cats: list[Category] = []
        for n in names:
            category = db.query(Category).filter(Category.name == n, Category.user_id == user.id).first()
            if not category:
                category = Category(name=n, user_id=user.id)
                db.add(category)
                db.commit()
                db.refresh(category)
            cats.append(category)

        # budget per each category
        for c in cats:
            exists = db.query(Budget).filter(Budget.user_id == user.id, Budget.category_id == c.id).scalar()

            if not exists: 
                budget = Budget(
                    user_id = user.id, 
                    category_id = c.id, 
                    amount = round(random.uniform(100, 800), 2),
                    period = "monthly" 
                )
                db.add(budget)
        db.commit()

        # transactions for last 45 days
        taction_count = db.query(func.count(Transaction.id)).filter(Transaction.user_id == user.id).scalar()
        if taction_count < 45:
            tacts = []
            for i in range(45):
                day = datetime.utcnow() - timedelta(days=i)
                c = random.choice(cats)
                amount = round(random.uniform(5, 120), 2)
                tacts.append(
                    Transaction(
                        description=f"{c.name} purchase",
                        amount=amount,
                        date=day,
                        user_id=user.id,
                        category_id=c.id,
                    )
                )
            db.bulk_save_objects(tacts) 
            db.commit()

        print("Seed completed successfully")

    except Exception as e:
        db.rollback()
        print(f"Seed failed: {e}")
        raise

    finally:
        db.close()

if __name__ == "__main__":
    run()

