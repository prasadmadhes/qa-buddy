"""
JWT helpers — create and verify access tokens.

create_access_token(user_id) — used at login, returns a signed JWT string
decode_access_token(token)   — used on every protected request, returns the payload

Uses PyJWT with HMAC-SHA256. Secret and expiry come from settings.
"""

import datetime as dt
import uuid

import jwt

from packages.core.config import settings


def create_access_token(user_id: uuid.UUID) -> str:
    """Build a signed JWT for the given user."""
    now = dt.datetime.now(tz=dt.timezone.utc)
    payload = {
        "sub": str(user_id),
        "iat": now,
        "exp": now + dt.timedelta(minutes=settings.JWT_EXPIRE_MINUTES),
    }
    return jwt.encode(payload, settings.JWT_SECRET, algorithm="HS256")


def decode_access_token(token: str) -> dict:
    """Verify a JWT and return its payload. Raises if invalid or expired."""
    return jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
