from pydantic import BaseModel
from typing import Optional
from datetime import date

class BudgetCreate(BaseModel):
    user_id: int
    category_id: Optional[int]
    amount: float
    period: Optional[str] = "monthly"
    # for later
    start_date: Optional[date]
    end_date: Optional[date] 

class BudgetOut(BaseModel):
    id: int
    user_id: int
    category_id: Optional[int]
    amount: float
    period: str

    class Config:
        orm_mode = True
