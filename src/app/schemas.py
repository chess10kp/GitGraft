from datetime import datetime
from typing import List

from pydantic import BaseModel, Field


class ExpenseBase(BaseModel):
    amount: int = Field(ge=0)
    description: str | None = Field(min_length=1)


class ExpenseCreateNew(ExpenseBase):
    category: str = Field(min_length=1)


class ExpenseResponse(ExpenseBase):
    id: int

    class Config:
        from_attributes = True  

class Expense(ExpenseBase):
    id: int

    class Config:
        from_attributes = True  

class SpenderBase(BaseModel):
    username: str


class SpenderCreateNewResponse(SpenderBase):
    password: str

class SpenderCreateNew(SpenderBase):
    password: str

class SpenderResponse(SpenderBase):
    id: int

    class Config:
        from_attributes = True
