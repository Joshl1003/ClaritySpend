from datetime import datetime, timedelta
from typing import Optional
from jose import jwt
from passlib.context import CryptContext
import os

pwd_context = CryptContext(schemas=["bcrypt"], depracated="auto")

JWT_SECRET = os.getenv("JWT_SECRET", "dev-secret-change-me")
JWT_ALG = os.getenv("JWT_ALG", "HS256")
ACCESS_TOKEN_MINUTES = int(os.getenv("ACCESS_TOKEN_MINUTES", "15"))

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(password: str, password_hash: str) -> bool:
    return pwd_context.verify(password, password_hash)

def create_access_token(subject: str, expires_minutes: Optional[int] = None) -> str:
    minutes = expires_minutes or ACCESS_TOKEN_MINUTES
    exp = datetime.utcnow() + timedelta(minutes=minutes)
    payload = {"sub": subject, "exp": exp}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)