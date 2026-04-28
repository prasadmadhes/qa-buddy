"""
Password hashing helpers.

Two functions:
- hash_password(raw)            → used at signup, before saving to DB
- verify_password(raw, hash)    → used at login, to check a typed password

We call bcrypt directly. bcrypt wants bytes (not strings), so we
.encode() going in and .decode() coming out. Cost factor 12 means
2^12 = 4096 rounds of bcrypt math per hash — slow on purpose.
"""

import bcrypt


def hash_password(raw_password: str) -> str:
    """Turn a plain password into a bcrypt hash safe to store."""
    hashed_bytes = bcrypt.hashpw(raw_password.encode(), bcrypt.gensalt(rounds=12))
    return hashed_bytes.decode()


def verify_password(raw_password: str, password_hash: str) -> bool:
    """Return True if the typed password matches the stored hash."""
    return bcrypt.checkpw(raw_password.encode(), password_hash.encode())
