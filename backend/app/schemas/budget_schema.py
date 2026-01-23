from pydantic import BaseModel
from typing import Optional
from datetime import date

class BudgetCreate(BaseModel):
    name: str
    category_id: Optional[int]
    amount: float
    period: Optional[str] = "monthly"
    # for later
    # start_date: Optional[date]
    # end_date: Optional[date] 

class BudgetOut(BaseModel):
    id: int
    name: str
    user_id: int
    category_id: Optional[int]
    category_name: Optional[str]
    amount: float
    period: str

    class Config:
        from_attributes = True

class BudgetUpdate(BaseModel):
    name: Optional[str]
    amount: Optional[float]
    period: Optional[str]
    category_id: Optional[int]

    class Config:
        from_attributes = True

