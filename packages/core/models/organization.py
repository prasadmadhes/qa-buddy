"""
Organization model — represents a team or company.

This creates an "organizations" table in the database:
┌──────────┬────────────────────┬───────────────────┬────────────┬────────────┐
│ id (UUID)│ name               │ slug              │ created_at │ updated_at │
├──────────┼────────────────────┼───────────────────┼────────────┼────────────┤
│ org1...  │ Acme Corp          │ acme-corp         │ 2026-04-02 │ 2026-04-02 │
└──────────┴────────────────────┴───────────────────┴────────────┴────────────┘

- slug = URL-friendly version of the name ("Acme Corp" → "acme-corp")
- Every user gets an auto-created org when they sign up
"""

import uuid

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from packages.core.models.base import Base


class Organization(Base):
    __tablename__ = "organizations"

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,
    )
    name: Mapped[str] = mapped_column(String(100))
    slug: Mapped[str] = mapped_column(String(100), unique=True)  # no duplicate slugs
