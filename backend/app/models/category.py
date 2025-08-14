from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)  # null if global category

    # transactions = relationship("Transaction", back_populates="category") ??
