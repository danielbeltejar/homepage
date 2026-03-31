import os

import bcrypt as _bcrypt
from fastapi import APIRouter, Depends, HTTPException, status

from middleware.auth import create_access_token, get_current_user
from models.auth import LoginRequest, TokenResponse, UserResponse

ADMIN_USERNAME = os.environ.get("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD_HASH = os.environ.get(
    "ADMIN_PASSWORD_HASH",
    _bcrypt.hashpw(b"admin", _bcrypt.gensalt()).decode(),
)

auth_router = APIRouter(prefix="/auth", tags=["auth"])


def _verify_password(plain: str, hashed: str) -> bool:
    return _bcrypt.checkpw(plain.encode(), hashed.encode())


@auth_router.post("/login", response_model=TokenResponse)
def login(request: LoginRequest):
    if request.username != ADMIN_USERNAME:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    if not _verify_password(request.password, ADMIN_PASSWORD_HASH):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    token = create_access_token(request.username)
    return TokenResponse(access_token=token)


@auth_router.get("/me", response_model=UserResponse)
def get_me(username: str = Depends(get_current_user)):
    return UserResponse(username=username)
