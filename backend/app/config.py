import os
from dotenv import load_dotenv
from pathlib import Path

# Load .env from same directory as this file (app/)
env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL not found in environment variables.")
