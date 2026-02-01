"""
Run this script to create all database tables based on your SQLAlchemy models.

Usage (from backend folder, with venv active):
    python -m app.create_tables
"""

from app.database.database import Base, engine
import app.models  # ensures all model classes are imported & registered with Base


def create_tables() -> None:
    # Print what SQLAlchemy "sees" before creating tables (optional debug)
    print("Models registered in metadata:", list(Base.metadata.tables.keys()))

    print("Creating tables in the database...")
    Base.metadata.create_all(bind=engine)
    print("Tables created (or already existed).")


if __name__ == "__main__":
    create_tables()
