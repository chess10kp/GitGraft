from datetime import date
from typing import List

from fastapi import APIRouter, HTTPException, Query
from fastapi.params import Depends
from sqlalchemy.orm import Session
from starlette.requests import HTTPConnection

from src.app import crud, models, schemas  # noqa: None
from src.app.database import SessionLocal, engine
from src.app.schemas import Expense, ExpenseCreateNew

models.Base.metadata.create_all(bind=engine)
router = APIRouter()

data: List[Expense] = []


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/expenses/", response_model=List[schemas.Expense])
def get_expenses(skip: int = 0, limit: int = 10, db=Depends(get_db)):
    return crud.get_expenses(db, skip, limit)


@router.get("/expenses/{spender_id}", response_model=schemas.Expense)
def get_expense_by_user_id(spender_id: int, db=Depends(get_db)):
    spender_exists = crud.get_spender_by_id(db, spender_id)
    if not spender_exists:
        raise HTTPException(404, "User to link to does not exist")
    return crud.get_expense_by_user_id(db, spender_id)


@router.post("/spender/{spender_id}/expenses/new")
def insert_expense(
    expense: ExpenseCreateNew, spender_id: int, db=Depends(get_db)
) -> Expense:
    spender = crud.get_spender_by_id(db, spender_id)
    if not spender:
        raise HTTPException(400, "User to link to does not exist")
    return crud.create_expense(db, expense, spender_id)


# TODO: check all get routes

# TODO:
# @router.put("/expenses/update")
# async def update_expense(
#     id: int,
#     amount: int | None = None,
#     description: str | None = None,
# ) -> List[Expense]:
#     return data


# TODO:
# @router.delete("/expenses/delete/")
# async def delete_expense(
#     id: int = Query(ge=0, min_length=1, example=3)
# ) -> Expense | str:
#     deleted_expense = crud.d


@router.get("/spender/", response_model=List[schemas.Spender])
def get_spender(db=Depends(get_db), limit: int = 10, skip: int = 0):
    spenders = crud.get_spenders(db, skip=skip, limit=limit)
    if not spenders:
        raise HTTPException(status_code=404, detail="No users found")
    return spenders


@router.get("/spender/{spender_id}")
def get_spender_by_id(spender_id: int, db=Depends(get_db)):
    spender = crud.get_spender_by_id(db, spender_id)
    if spender is None:
        raise HTTPException(404, detail="User not found")
    return spender


@router.post("/spender/", response_model=schemas.Spender)
def create_spender(new_spender: schemas.SpenderCreateNew, db=Depends(get_db)):
    existing_spender = crud.get_spender_by_username(db, new_spender.username)
    if existing_spender:
        raise HTTPException(400, detail="User already exists")
    return crud.create_spender(db, new_spender)
