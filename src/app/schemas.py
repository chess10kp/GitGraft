from datetime import datetime
from typing import List

from pydantic import BaseModel, Field


class ExpenseBase(BaseModel):
    amount: int = Field(ge=0)
    description: str | None = Field(min_length=1)

class ExpenseCreateNew(ExpenseBase):
    category: str = Field(min_length=1)
    timestamp: datetime | None = None


class Expense(ExpenseBase):
    id: int
    fk_id_expenses: int

    class Config:
        from_attributes = True #enable orm_mode

class SpenderBase(BaseModel):
    username: str


class SpenderCreateNew(SpenderBase):
    password: str


class Spender(SpenderBase):
    id: int
    expenses: List[Expense] = []

    class Config:
        from_attributes = True
