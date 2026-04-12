"""
User schemas — controls what data comes in and goes out for users.

UserCreate   ← signup form (name, email, password)
UserUpdate   ← edit profile (name only)
UserResponse ← what API sends back (no password!)
"""

import uuid

from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    """
    What the user sends when signing up.

    Example request:
    {
        "name": "Prasad",
        "email": "prasad@mail.com",
        "password": "secret123"
    }
    """
    name: str
    email: EmailStr     # must be a valid email format
    password: str       # raw password — we'll hash it before saving


class UserUpdate(BaseModel):
    """
    What the user sends when editing their profile.
    All fields are optional — they only send what they want to change.

    Example request:
    {
        "name": "Prasad M"    ← only changing name
    }
    """
    name: str | None = None     # optional — only update if provided


class UserResponse(BaseModel):
    """
    What the API sends back to the user.
    Notice: NO password_hash — we never expose that.

    Example response:
    {
        "id": "a1b2-c3d4-...",
        "name": "Prasad",
        "email": "prasad@mail.com"
    }
    """
    id: uuid.UUID
    name: str
    email: str

    class Config:
        from_attributes = True  # allows converting SQLAlchemy model → Pydantic schema
