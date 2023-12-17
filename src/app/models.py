from datetime import datetime

from pydantic import BaseModel, Field


class Expense(BaseModel):
    id: int
    amount: int = Field(ge=0)
    description: str | None = Field(min_length=1)
    timestamp: datetime | None = None


class User(BaseModel):
    expenses: Expense
