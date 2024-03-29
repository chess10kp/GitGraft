from datetime import datetime

from src.app.utils import get_hashed_password

from . import models, schemas


def get_spender_by_id(db, user_id: int) -> dict | None:
    """
    Search for Spender by id of spender
    """
    return db.query(models.Spender).get(user_id)


def get_spender_by_username(db, username: str) -> models.Spender | None:
    """
    Search for spender using username of spender
    """
    return db.query(models.Spender).filter(models.Spender.username == username).first()


def get_spenders(db, skip: int = 0, limit: int = 10):
    """
    Get multiple spenders
    """
    spenders = db.query(models.Spender).offset(skip).limit(limit).all()
    return spenders


def create_spender(db, spender: schemas.SpenderCreateNew):
    """
    Create a new spender in the database
    """
    new_pass = get_hashed_password(spender.password)
    new_spender = models.Spender(username=spender.username, password=new_pass)
    db.add(new_spender)
    db.commit()
    db.refresh(new_spender)
    return new_spender


def delete_spender(db, spender_id: int | str) -> dict:
    """
    Delete a spender and all their expenses
    """
    expenses = db.query(models.Expense).filter(models.Expense.id == spender_id).all()
    for expense in expenses:
        db.delete(expense)
    spender = db.query(models.Spender).get(spender_id)
    db.delete(spender)
    return spender


def get_expenses(db, skip: int = 0, limit: int = 100):
    """
    Get multiple expenses
    """
    expenses = db.query(models.Expense).offset(skip).limit(limit).all()
    return expenses


def get_expense_by_id(db, expense_id: int) -> models.Expense | None:
    """
    Get expense by id
    """
    return db.query(models.Expense).filter(models.Expense.id == expense_id).first()


def create_expense(db, expense: schemas.ExpenseCreateNew, spender_id: int):
    """
    Create a new expense
    """
    new_expense_data = expense.dict()
    new_expense_data["timestamp"] = datetime.now()
    new_expense = models.Expense(**new_expense_data, fk_expenses_id_spenders=spender_id)
    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)
    return new_expense


def delete_expense(db, expense_id: int):
    """
    Delete an expense
    """
    try: 
        expense = db.query(models.Expense).filter(models.Expense.id == expense_id).first()
        db.delete(expense)
        db.commit()
        return expense
    except Exception as e:
        print(f"Error deleting expense: {e})")
        db.rollback()
