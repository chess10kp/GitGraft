from datetime import datetime
from typing import List

from pydantic import BaseModel, Field


class ExpenseBase(BaseModel):
    amount: int = Field(ge=0)
    description: str | None = Field(min_length=1)
    timestamp: datetime | None = None


class Expense(ExpenseBase):
    id: int
    owner_id: int

    class Config:
        from_attributes = True


class SpenderBase(BaseModel):
    email: str


class SpenderCreateNew(SpenderBase):
    password: str


class Spender(SpenderBase):
    id: int
    expenses: List[Expense] = []

    class Config:
        from_attributes = True
