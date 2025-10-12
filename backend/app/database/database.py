from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
env_path = Path(__file__).resolve().parents[1] / ".env"  # go up 1 level from /database/
load_dotenv(dotenv_path=env_path)

DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL is None:
    raise ValueError("DATABASE_URL not found in environment variables.")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()



