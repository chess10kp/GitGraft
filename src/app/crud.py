from datetime import datetime
from os import sched_setscheduler
from types import new_class
from typing import List

from sqlalchemy.orm import Session

from . import models, schemas


def get_user(db: Session, user_id: int) -> models.Spender | None:
    return db.query(models.Spender).filter(models.Spender.id == user_id).first()


def get_users(
    db: Session, skip: int = 0, limit: int = 10
) -> List[models.Spender] | None:
    return db.query(models.Spender).offset(skip).limit(limit).all()


def create_spender(db: Session, spender: schemas.SpenderCreateNew):
    new_pass = spender.password + "hash"  # TODO: improve hash with JWT
    new_spender = models.Spender(username=spender.username, password=new_pass)
    db.add(new_spender)
    db.commit()
    db.refresh(new_spender)
    return new_spender


def get_expenses(
    db: Session, skip: int = 0, limit: int = 100
) -> List[models.Expense] | None:
    return db.query(models.Expense).offset(skip).limit(limit).all()


def get_expense(db: Session, expense_id: int) -> models.Expense | None:
    return db.query(models.Expense).filter(models.Expense.id == expense_id).first()

def create_expense(db: Session, expense: schemas.ExpenseCreateNew): 
    new_expense = models.Expense(amount=expense.amount, description=expense.description, timestamp=datetime.now())
    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)
    return new_expense
