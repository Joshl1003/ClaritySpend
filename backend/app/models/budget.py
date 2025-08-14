from sqlalchemy import Column, Integer, Float, Date, ForeignKey, String
from .base import Base

class Budget(Base):
    __tablename__ = "budgets"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=True)
    amount = Column(Float, nullable=False)
    period = Column(String(20), default="monthly")  # monthly, weekly, etc.
    start_date = Column(Date, nullable=True)
    end_date = Column(Date, nullable=True)
