"""
Suite model — a group of related test cases inside a project.

This creates a "suites" table in the database:
┌──────────┬─────────────────────┬────────────┬────────────┬────────────┐
│ id (UUID)│ name                │ project_id │ created_at │ updated_at │
├──────────┼─────────────────────┼────────────┼────────────┼────────────┤
│ s1...    │ Authentication Tests│ p1...      │ 2026-04-02 │ 2026-04-02 │
└──────────┴─────────────────────┴────────────┴────────────┴────────────┘

- project_id points to the projects table (ForeignKey)
- Every suite belongs to exactly one project
"""

import uuid

from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from packages.core.models.base import Base


class Suite(Base):
    __tablename__ = "suites"

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,                                # 🔑 my own ID
        default=uuid.uuid4,
    )
    name: Mapped[str] = mapped_column(String(100))
    description: Mapped[str | None] = mapped_column(Text, default=None)

    # Which project does this suite belong to?
    project_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("projects.id")                        # 🔗 points to projects table
    )
