from pydantic import BaseModel
from typing import Optional
from datetime import date

class TransactionCreate(BaseModel):
    description: str
    user_id: int
    amount: float
    date: Optional[date]
    category_id: Optional[int]

class TransactionOut(BaseModel):
    id: int
    user_id: int
    amount: float
    description: str
    category_id: Optional[int]

    class Config:
        from_attributes = True