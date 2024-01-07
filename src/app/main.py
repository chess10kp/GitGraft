from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.app.routes import router

app = FastAPI(
    title="Expense Tracker",
    description="Expense Tracker",
    version="0.0.1",
)

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_headers=["*"],
)


app.include_router(router)
