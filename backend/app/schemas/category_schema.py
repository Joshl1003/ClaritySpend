from pydantic import BaseModel
from typing import Optional

class CategoryCreate(BaseModel):
    name: str
    user_id: Optional[int] = None

class CategoryOut(BaseModel):
    id: int
    name: str
    user_id: Optional[int]

    class Config:
        orm_mode = True
