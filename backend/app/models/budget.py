from sqlalchemy import Column, Integer, Float, Date, ForeignKey, String
from app.database.database import Base
from sqlalchemy.orm import relationship

class Budget(Base):
    __tablename__ = "budgets"

    name = Column(String, nullable=False)
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=True)
    amount = Column(Float, nullable=False)
    period = Column(String(20), default="monthly")  # monthly, weekly, etc.
    # start_date = Column(Date, nullable=True)
    # end_date = Column(Date, nullable=True)

    category = relationship("Category", lazy="selectin")
    
    @property
    def category_name(self):
        return self.category.name if self.category else None
