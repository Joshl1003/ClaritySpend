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
        from_attributes = True

class CategoryUpdate(BaseModel):
    name: str
    
    class Config:
        from_attributes = True

