from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TransactionCreate(BaseModel):
    description: str
    user_id: int
    amount: float
    date: Optional[datetime]
    category_id: Optional[int]

class TransactionOut(BaseModel):
    id: int
    user_id: int
    amount: float
    date: Optional[datetime]
    description: str
    category_id: Optional[int]
    category_name: Optional[str]

    class Config:
        from_attributes = True

class TransactionUpdate(BaseModel):
    description: Optional[str] 
    amount: Optional[float]
    date: Optional[datetime]
    category_id: Optional[int]

    class Config:
        from_attributes = True