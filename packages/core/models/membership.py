"""
Membership model — connects a User to an Organization with a role.

This creates a "memberships" table in the database:
┌──────────┬───────────┬───────────┬─────────┬────────────┬────────────┐
│ id (UUID)│ user_id   │ org_id    │ role    │ created_at │ updated_at │
├──────────┼───────────┼───────────┼─────────┼────────────┼────────────┤
│ m1...    │ u1...     │ org1...   │ owner   │ 2026-04-02 │ 2026-04-02 │
│ m2...    │ u1...     │ org2...   │ member  │ 2026-04-02 │ 2026-04-02 │
└──────────┴───────────┴───────────┴─────────┴────────────┴────────────┘

- user_id points to the users table (ForeignKey)
- org_id points to the organizations table (ForeignKey)
- role is one of: owner, admin, member
"""

import uuid

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column

from packages.core.models.base import Base


class Membership(Base):
    __tablename__ = "memberships"

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,
    )

    # Points to the users table — "which user?"
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"))

    # Points to the organizations table — "which org?"
    org_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("organizations.id"))

    # What role does this user have in this org?
    role: Mapped[str] = mapped_column(String(20))  # "owner", "admin", "member"
