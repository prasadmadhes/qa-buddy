from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from packages.core.config import settings
from packages.core.db import get_session
from packages.core.models.user import User
from packages.core.schemas.auth import LoginRequest, TokenResponse
from packages.core.security.jwt import create_access_token
from packages.core.security.password import verify_password

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=TokenResponse)
async def login(
    payload: LoginRequest,
    session: AsyncSession = Depends(get_session),
):
    user = await session.scalar(
        select(User).where(User.email == payload.email)
    )
    if user is None or not verify_password(payload.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    return TokenResponse(
        access_token=create_access_token(user.id),
        expires_in=settings.JWT_EXPIRE_MINUTES * 60,
    )
