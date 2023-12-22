from datetime import datetime
from typing import List

from fastapi import APIRouter, Query

from src.app.schemas import Expense

router = APIRouter()

data: List[Expense] = []


@router.get("/expenses/")
def get_expenses() -> List[Expense]:
    return data


@router.post("/expenses/new")
async def insert_expense(expense: Expense) -> Expense:
    return expense


@router.put("/expenses/update")
async def update_expense(
    id: int,
    amount: int | None = None,
    description: str | None = None,
) -> List[Expense]:
    return data


@router.delete("/expenses/delete/")
async def delete_expense(
    id: int = Query(ge=0, min_length=1, example=3)
) -> Expense | str:
    return "Expense not found"
