from datetime import datetime
from typing import List

from . import models, schemas


def get_spender_by_id(db, user_id: int) -> models.Spender | None:
    return db.query(models.Spender).filter(models.Spender.id == user_id).first()


def get_spender_by_username(db, username: str) -> models.Spender | None:
    return db.query(models.Spender).filter(models.Spender.username == username).first()


def get_spenders(db, skip: int = 0, limit: int = 10) -> List[models.Spender] | None:
    return db.query(models.Spender).offset(skip).limit(limit).all()


def create_spender(db, spender: schemas.SpenderCreateNew):
    new_pass = spender.password + "hash"  # TODO: improve hash with JWT
    new_spender = models.Spender(username=spender.username, password=new_pass)
    db.add(new_spender)
    db.commit()
    db.refresh(new_spender)
    return new_spender


def get_expenses(db, skip: int = 0, limit: int = 100) -> List[models.Expense] | None:
    return db.query(models.Expense).offset(skip).limit(limit).all()


def get_expense_by_user_id(db, spender_id: int) -> models.Expense | None:
    return db.query(models.Expense).filter(models.Expense.id == spender_id).first()


def create_expense(db, expense: schemas.ExpenseBase, spender_id: int):
    expense.dict()["timestamp"] = datetime.now()
    new_expense = models.Expense(**expense.dict(), fk_expenses_id_spenders=spender_id)
    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)
    return new_expense
