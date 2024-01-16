from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base


class Spender(Base):
    __tablename__ = "spenders"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False)
    password = Column(String, nullable=False)

    expenses = relationship("Expense", back_populates="spender")


class Expense(Base):
    __tablename__ = "expenses"
    id = Column(Integer, primary_key=True, index=True, nullable=False)
    amount = Column(Integer, index=True, nullable=False)
    description = Column(String, index=False, nullable=False)
    category = Column(String, index=True, nullable=True)
    timestamp = Column(String, index=True, nullable=False)
    fk_expenses_id_spenders = Column(Integer, ForeignKey("spenders.id"))

    spender = relationship("Spender", back_populates="expenses")
