"""
Project model — a container for test suites and test cases.

This creates a "projects" table in the database:
┌──────────┬──────────────┬─────────────────────┬──────────┬────────────┬────────────┐
│ id (UUID)│ name         │ description         │ org_id   │ created_at │ updated_at │
├──────────┼──────────────┼─────────────────────┼──────────┼────────────┼────────────┤
│ p1...    │ Backend API  │ API test cases      │ org1...  │ 2026-04-02 │ 2026-04-02 │
└──────────┴──────────────┴─────────────────────┴──────────┴────────────┴────────────┘

- org_id points to the organizations table (ForeignKey)
- Every project belongs to exactly one organization
"""

import uuid

from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from packages.core.models.base import Base


class Project(Base):
    __tablename__ = "projects"

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,                                # 🔑 my own ID
        default=uuid.uuid4,
    )
    name: Mapped[str] = mapped_column(String(100))
    description: Mapped[str | None] = mapped_column(Text, default=None)  # optional, can be long text

    # Which organization does this project belong to?
    org_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("organizations.id")                   # 🔗 points to organizations table
    )
