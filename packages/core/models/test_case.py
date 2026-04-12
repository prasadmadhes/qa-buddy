"""
TestCase model — the core of QA Buddy. An actual test case with steps,
priority, category, and review status.

This creates a "test_cases" table in the database:
┌──────────┬──────────────────┬──────────┬──────────┬──────────┬──────────┬────────┐
│ id (UUID)│ title            │ suite_id │folder_id │ priority │ category │ status │
├──────────┼──────────────────┼──────────┼──────────┼──────────┼──────────┼────────┤
│ tc1...   │ Login with email │ s1...    │ f2...    │ high     │ smoke    │approved│
└──────────┴──────────────────┴──────────┴──────────┴──────────┴──────────┴────────┘

- suite_id points to the suites table (ForeignKey) — required
- folder_id points to the folders table (ForeignKey) — optional
- priority, category, status are Enums (fixed list of allowed values)
"""

import uuid
from enum import Enum

from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from packages.core.models.base import Base


# --- Enums: fixed lists of allowed values (like dropdown menus) ---

class Priority(str, Enum):
    critical = "critical"
    high = "high"
    medium = "medium"
    low = "low"


class Category(str, Enum):
    smoke = "smoke"
    functional = "functional"
    regression = "regression"
    edge_case = "edge_case"
    negative = "negative"
    boundary = "boundary"
    integration = "integration"


class Status(str, Enum):
    draft = "draft"                    # just created, not ready
    pending_review = "pending_review"  # AI generated, waiting for human review
    approved = "approved"              # human approved, part of test library
    rejected = "rejected"              # human rejected


class TestCase(Base):
    __tablename__ = "test_cases"

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,                                    # 🔑 my own ID
        default=uuid.uuid4,
    )
    title: Mapped[str] = mapped_column(String(255))

    # What is this test about?
    objective: Mapped[str | None] = mapped_column(Text, default=None)

    # What needs to be true before running this test?
    preconditions: Mapped[str | None] = mapped_column(Text, default=None)

    # Step-by-step instructions to run the test
    steps: Mapped[str | None] = mapped_column(Text, default=None)

    # What should happen if the test passes?
    expected_result: Mapped[str | None] = mapped_column(Text, default=None)

    # How important is this test?
    priority: Mapped[str] = mapped_column(
        String(20), default=Priority.medium.value            # defaults to "medium"
    )

    # What type of test is this?
    category: Mapped[str] = mapped_column(
        String(20), default=Category.functional.value        # defaults to "functional"
    )

    # What's the review status?
    status: Mapped[str] = mapped_column(
        String(20), default=Status.draft.value               # defaults to "draft"
    )

    # Optional tags for extra labeling (stored as comma-separated text)
    tags: Mapped[str | None] = mapped_column(Text, default=None)

    # Where did this test case come from? (e.g., "github:repo/file.py" or "jira:TICKET-123")
    source_reference: Mapped[str | None] = mapped_column(String(500), default=None)

    # --- Foreign Keys ---

    # Which suite does this test case belong to?
    suite_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("suites.id")                              # 🔗 required
    )

    # Which folder is it in? (optional — can be directly in the suite)
    folder_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("folders.id"), default=None               # 🔗 optional
    )
