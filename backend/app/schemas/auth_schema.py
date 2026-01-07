from pydantic import BaseModel, EmailStr
from typing import Optional

class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut
