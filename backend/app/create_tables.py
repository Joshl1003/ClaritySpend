from database import engine
from backend.app.models import user, category, transaction, budget  # import all model files
from database import Base

def create_db():
    Base.metadata.create_all(bind=engine)
    print("Tables created!")

if __name__ == "__main__":
    create_db()

