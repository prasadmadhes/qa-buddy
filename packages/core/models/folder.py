"""
Folder model — organizes test cases within a suite. Can be nested.

This creates a "folders" table in the database:
┌──────────┬────────────────┬──────────┬───────────┬────────────┬────────────┐
│ id (UUID)│ name           │ suite_id │ parent_id │ created_at │ updated_at │
├──────────┼────────────────┼──────────┼───────────┼────────────┼────────────┤
│ f1...    │ Login          │ s1...    │ NULL      │ 2026-04-02 │ 2026-04-02 │
│ f2...    │ Email Login    │ s1...    │ f1...     │ 2026-04-02 │ 2026-04-02 │
└──────────┴────────────────┴──────────┴───────────┴────────────┴────────────┘

- suite_id points to the suites table (ForeignKey)
- parent_id points to THIS SAME table (self-referencing ForeignKey)
- parent_id = NULL means it's a top-level folder
"""

import uuid

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column

from packages.core.models.base import Base


class Folder(Base):
    __tablename__ = "folders"

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,                                  # 🔑 my own ID
        default=uuid.uuid4,
    )
    name: Mapped[str] = mapped_column(String(100))

    # Which suite does this folder belong to?
    suite_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("suites.id")                            # 🔗 points to suites table
    )

    # Is this folder inside another folder? (NULL = top-level)
    parent_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("folders.id"), default=None             # 🔗 points to THIS SAME table
    )
