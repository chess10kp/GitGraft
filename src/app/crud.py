from typing import List

from sqlalchemy.orm import Session

from . import models, schemas


def get_user(db: Session, user_id: int) -> models.Spender | None:
    return db.query(models.Spender).filter(models.Spender.id == user_id).first()


def get_users(db: Session, skip: int = 0, limit: int = 10) -> List[models.Spender] | None:
    return db.query(models.Spender).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.SpenderCreateNew): 
    new_pass = user.password
def get_expenses(db: Session, skip: int = 0, limit: int = 100) -> List[models.Expense] | None: 
    return db.query(models.Expense).offset(skip).limit(limit).all()

def get_expense(db: Session, expense_id: int) -> models.Expense | None: 
    return db.query(models.Expense).filter(models.Expense.id == expense_id).first()
