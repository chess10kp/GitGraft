from fastapi import FastAPI

from src.app.routes import router

app = FastAPI(
        title="Expense Tracker",
        description="Expense Tracker using SQLite3",
        version="0.0.1",
        )


app.include_router(router)