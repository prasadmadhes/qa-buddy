"""
User model — represents a person who uses QA Buddy.

This creates a "users" table in the database:
┌──────────┬───────┬────────────────┬────────────┬────────────┐
│ id (UUID)│ name  │ email          │ created_at │ updated_at │
├──────────┼───────┼────────────────┼────────────┼────────────┤
│ a1b2...  │Prasad │ prasad@mail.com│ 2026-03-27 │ 2026-03-27 │
└──────────┴───────┴────────────────┴────────────┴────────────┘
"""

import uuid

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from packages.core.models.base import Base


class User(Base):
    __tablename__ = "users"  # the actual table name in PostgreSQL

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,  # auto-generates a unique ID
    )
    name: Mapped[str] = mapped_column(String(100))
    email: Mapped[str] = mapped_column(String(255), unique=True)  # no duplicate emails
    password_hash: Mapped[str] = mapped_column(String(255))  # we never store raw passwords
