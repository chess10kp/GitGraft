from datetime import datetime

from fastapi import APIRouter, Query

from src.app.models import Expense

router = APIRouter()

data: list[Expense] = []

@router.get("/expenses/")
def get_expenses() -> list[Expense]:
    return data


@router.post("/expenses/new")
async def insert_expense(expense: Expense) -> Expense:
    expense.timestamp = datetime.now()
    data.append(expense)
    return expense


@router.put("/expenses/update")
async def update_expense(
    id: int,
    amount: int | None = None,
    description: str | None = None,
) -> list[Expense]:
    for expense in data:
        if id == expense.id:
            expense.description = description if description else expense.description
            expense.amount = amount if amount is not None else expense.amount
            expense.timestamp = datetime.datetime.now()
    return data


@router.delete("/expenses/delete/")
async def delete_expense(id: int = Query(ge=0, min_length=1, example=3)) -> Expense | str:
    for expense in data:
        if id == expense.id:
            data.remove(expense)
            return expense
    return "Expense not found"
