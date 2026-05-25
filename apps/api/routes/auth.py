import re
import secrets
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from packages.core.config import settings
from packages.core.db import get_session
from packages.core.models.membership import Membership
from packages.core.models.organization import Organization
from packages.core.models.user import User
from packages.core.schemas.auth import LoginRequest, TokenResponse
from packages.core.schemas.signup import SignupRequest, SignupResponse
from packages.core.schemas.user import UserResponse
from packages.core.security.deps import get_current_user
from packages.core.security.jwt import create_access_token
from packages.core.security.password import hash_password, verify_password


def _slugify(text: str) -> str:
    """'Acme QA' → 'acme-qa'. Lowercase, non-alphanumerics → dashes, trim."""
    text = text.lower().strip()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")


def _personal_org_slug(name: str) -> str:
    """
    Generate a unique-ish slug for a personal workspace.

    Pattern: <slugified-name>-<8 hex chars>
    Example: 'Alice'   → 'alice-7k3p2a4f'
             'Müller'  → 'm-ller-bb12cd34'  (non-ASCII stripped by slugify)
             '李四'     → 'user-cd34ee56'    (empty slug → fallback 'user')

    The 8 hex chars come from secrets.token_hex(4) — 32 bits of entropy,
    so collisions on identical names are ~1 in 4 billion. Cheap enough
    to skip the "retry on collision" loop for personal orgs.
    """
    base = _slugify(name) or "user"
    return f"{base}-{secrets.token_hex(4)}"


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


@router.post(
    "/signup",
    response_model=SignupResponse,
    status_code=status.HTTP_201_CREATED,
)
async def signup(
    payload: SignupRequest,
    session: AsyncSession = Depends(get_session),
):
    # 1. Stage the user (bcrypt the password).
    user = User(
        name=payload.name,
        email=payload.email,
        password_hash=hash_password(payload.password),
    )
    session.add(user)

    # 2. Stage the personal organization. Auto-generated name + slug;
    #    is_personal=True so the UI can label it "Personal" vs "Team".
    org = Organization(
        name=f"{payload.name}'s Workspace",
        slug=_personal_org_slug(payload.name),
        is_personal=True,
    )
    session.add(org)

    # 3. flush() sends user + org INSERTs to the DB inside the open
    #    transaction. After this, user.id and org.id are populated,
    #    but the rows are still invisible to other sessions until commit.
    try:
        await session.flush()
    except IntegrityError as e:
        await session.rollback()
        constraint = getattr(e.orig, "constraint_name", "") or ""
        if "email" in constraint:
            detail = "An account with this email already exists"
        elif "slug" in constraint:
            # 32-bit random suffix collision — astronomically rare.
            detail = "Could not create workspace — please retry"
        else:
            detail = "Could not complete signup — please try again"
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=detail)

    # 4. Wire the owner membership using the freshly-flushed IDs.
    session.add(Membership(user_id=user.id, org_id=org.id, role="owner"))

    # 5. commit() finalises all three rows atomically.
    await session.commit()

    return SignupResponse(
        access_token=create_access_token(user.id),
        expires_in=settings.JWT_EXPIRE_MINUTES * 60,
        user=user,
        organization=org,
    )


@router.get("/me", response_model=UserResponse)
async def me(current_user: Annotated[User, Depends(get_current_user)]):
    """Return the currently-authenticated user. Requires `Authorization: Bearer <jwt>`."""
    return current_user
