import datetime

from fastapi import FastAPI  # type: ignore

from .models import Expense

app = FastAPI()

data: list[Expense] = []


@app.get("/expenses/")
def get_expenses() -> list[Expense]:
    return data


@app.post("/expenses/new")
async def insert_expense(expense: Expense) -> Expense:
    expense.timestamp = datetime.datetime.now()
    data.append(expense)
    return expense


@app.put("/expenses/update")
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


@app.delete("/expenses/delete/")
async def delete_expense(id: int) -> Expense | str:
    for expense in data:
        if id == expense.id:
            data.remove(expense)
            return expense
    return "Expense not found"
