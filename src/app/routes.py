from typing import List

from fastapi import APIRouter, HTTPException, status
from fastapi.params import Depends
from fastapi.security import OAuth2PasswordBearer

from src.app import crud, models, schemas  # noqa: None
from src.app.database import SessionLocal, engine
from src.app.schemas import Expense, ExpenseCreateNew
from src.app.utils import get_hashed_password, verify_hashed_password

models.Base.metadata.create_all(bind=engine)
router = APIRouter()

data: List[Expense] = []


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/spender/{spender_id}/expenses")
def get_expenses(skip: int = 0, limit: int = 10, db=Depends(get_db)):
    return crud.get_expenses(db, skip, limit)


@router.get("/spender/{spender_id}/expenses/{expense_id}")
def get_expense_by_user_id(spender_id: int, expense_id: int, db=Depends(get_db)):
    spender_exists = crud.get_spender_by_id(db, spender_id)
    if not spender_exists:
        raise HTTPException(404, "User to link to does not exist")
    return crud.get_expense_by_id(db, expense_id)


@router.post("/spender/{spender_id}/expenses/new")
def insert_expense(
    expense: ExpenseCreateNew, spender_id: int, db=Depends(get_db)
) -> Expense:
    spender = crud.get_spender_by_id(db, spender_id)
    if not spender:
        raise HTTPException(400, "User to link to does not exist")
    return crud.create_expense(db, expense, spender_id)


@router.delete("/spender/{spender_id}/expenses/delete/{expense_id}")
def delete_expense(spender_id: int, expense_id: int, db=Depends(get_db)):
    spender = crud.get_spender_by_id(db, spender_id)
    if not spender:
        raise HTTPException(404, "User to delete expense from not found")
    expense = crud.get_expense_by_id(db, expense_id)
    if not expense:
        raise HTTPException(404, "Expense to delete not found")
    expense = crud.delete_expense(db, expense_id)
    return expense


# TODO:
# @router.put("/expenses/update")
# async def update_expense(
#     id: int,
#     amount: int | None = None,
#     description: str | None = None,
# ) -> List[Expense]:
#     return data

@router.get("/login/{username}/{password}/")
async def login( username: str, password: str, db=Depends(get_db)) -> bool | dict: 
    user = crud.get_spender_by_username(db, username)
    if user is None : 
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="User does not exist")
    logged_in = verify_hashed_password(password, str(user.password))
    return user if logged_in else logged_in


@router.get(
    "/spender/",
)
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


@router.post("/spender/new")
def create_spender(new_spender: schemas.SpenderCreateNew, db=Depends(get_db)):
    existing_spender = crud.get_spender_by_username(db, new_spender.username)
    if existing_spender:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="User with this username already exists")
    return crud.create_spender(db, new_spender)
