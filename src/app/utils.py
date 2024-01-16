import os
from datetime import datetime, timedelta
from typing import Any, Union

from dotenv import load_dotenv
from jose import jwt
from passlib.context import CryptContext

load_dotenv()

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

ACCESS_TOKEN_EXPIRY_MINUTES = 30
REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7
ALGORITHM = "HS256"
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
JWT_REFRESH_SECRET_KEY = os.getenv("JWT_REFRESH_SECRET_KEY")


def get_hashed_password(password: str) -> str:
    return password_context.hash(password)


def verify_hashed_password(password: str, hashed_password: str) -> bool:
    return password_context.verify(password, hashed_password)


def create_access_token(subject: Union[str, Any], expires_delta: int = 0) -> str:
    if not expires_delta:
        expires_delta = datetime.utcnow() + expires_delta
    else:
        expires_delta = datetime.utcnow() + timedelta(
            minutes=ACCESS_TOKEN_EXPIRY_MINUTES
        )

    to_encode = {"exp": expires_delta, "sub": str(subject)}
    jwt_encoded = jwt.encode(to_encode, JWT_SECRET_KEY, ALGORITHM)
    return jwt_encoded


def create_refresh_token(subject: Union[str, Any], expires_delta: int = 0) -> str:
    if not expires_delta:
        expires_delta = datetime.utcnow() + expires_delta
    else:
        expires_delta = datetime.utcnow() + timedelta(
            minutes=REFRESH_TOKEN_EXPIRE_MINUTES
        )

    to_encode = {"exp": expires_delta, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, JWT_REFRESH_SECRET_KEY, ALGORITHM)
    return encoded_jwt
