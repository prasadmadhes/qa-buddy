"""
FastAPI security dependencies.

get_current_user — read the "Authorization: Bearer <jwt>" header, decode
                   the token, look up the user, return the User instance
                   (or raise 401 on any failure).

Used by any protected route via:

    from packages.core.security.deps import get_current_user

    @router.get("/some/path")
    async def handler(current_user: User = Depends(get_current_user)):
        ...

Future siblings (when needed):
    get_current_user_optional   — returns User | None, doesn't 401
    require_org_membership(id)  — also checks the user belongs to org `id`
    require_role(role)          — also checks the user's membership role
"""

import uuid
from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jwt import ExpiredSignatureError, InvalidTokenError
from sqlalchemy.ext.asyncio import AsyncSession

from packages.core.db import get_session
from packages.core.models.user import User
from packages.core.security.jwt import decode_access_token


# OAuth2PasswordBearer does two things:
#   1. Reads the "Authorization: Bearer <token>" header from the request.
#      If absent or malformed, FastAPI auto-raises 401 before the
#      route handler runs.
#   2. Registers the scheme in OpenAPI so Swagger UI shows an "Authorize"
#      button that knows where to POST credentials to get a token.
#      tokenUrl="/auth/login" tells the docs where login lives.
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> User:
    """
    Resolve "the user behind this request" from the Bearer JWT.

    Raises 401 if:
      - No Bearer token in the header           (oauth2_scheme handles this)
      - Token signature is invalid              (tampered or wrong secret)
      - Token is expired                        ("exp" claim in the past)
      - "sub" claim is missing or not a UUID
      - The user_id from "sub" no longer exists in the DB
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    # 1. Decode the JWT (verifies signature + expiry — see 7.10/02 for the math).
    try:
        payload = decode_access_token(token)
    except ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except InvalidTokenError:
        # Catches: bad signature, malformed, unsupported algorithm, etc.
        raise credentials_exception

    # 2. Extract user_id from the "sub" claim.
    user_id_str = payload.get("sub")
    if not user_id_str:
        raise credentials_exception
    try:
        user_id = uuid.UUID(user_id_str)
    except ValueError:
        raise credentials_exception

    # 3. Look up the user. session.get is a PK lookup that hits identity_map
    #    first (skips the DB if the user is already loaded in this session).
    user = await session.get(User, user_id)
    if user is None:
        # Token was valid but the user has since been deleted.
        raise credentials_exception

    return user
