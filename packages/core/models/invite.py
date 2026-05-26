"""
Invite model — a pending invitation to join an organization.

This creates an "invites" table:
┌────────┬─────────┬───────────┬────────┬─────────┬───────────────────┬────────────┬─────────────┬────────────┬────────────┐
│ id     │ org_id  │ email     │ role   │ token   │ invited_by_user_id │ expires_at │ accepted_at │ created_at │ updated_at │
├────────┼─────────┼───────────┼────────┼─────────┼───────────────────┼────────────┼─────────────┼────────────┼────────────┤
│ inv1.. │ org1..  │ bob@x.com │ member │ abc123… │ alice..            │ 2026-06-02 │ NULL        │ 2026-05-26 │ 2026-05-26 │
└────────┴─────────┴───────────┴────────┴─────────┴───────────────────┴────────────┴─────────────┴────────────┴────────────┘

Design choices:
- email is a STRING, not a user_id — invitees may not have an account yet.
- token is the secret in the URL — unique, looked up directly on accept.
- accepted_at is nullable — NULL means "pending"; a timestamp means "used."
- org_id and invited_by_user_id both CASCADE on delete:
    * If the org is deleted, its pending invites die with it.
    * If the inviter's account is deleted, their pending invites die too.
- Resend strategy (Option B2) is handled in the route, not the schema:
  no UNIQUE constraint on (email, org_id). The create-invite route
  finds any non-accepted existing invite and updates it in place.
"""

import datetime as dt
import uuid

from sqlalchemy import DateTime, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column

from packages.core.models.base import Base


class Invite(Base):
    __tablename__ = "invites"

    # Primary key — auto-generated UUID.
    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,
    )

    # Which org is this invite for?
    # CASCADE: if the org is deleted, drop its pending invites too.
    org_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("organizations.id", ondelete="CASCADE"),
    )

    # Who's being invited? Stored as an email because the invitee may
    # not have an account yet — we can only identify them by email
    # until they sign up.
    email: Mapped[str] = mapped_column(String(255))

    # What role will they get on accept? "owner" / "admin" / "member".
    role: Mapped[str] = mapped_column(String(20))

    # The secret in the URL. unique=True auto-creates a unique index
    # — fast lookup by token, no duplicates allowed.
    token: Mapped[str] = mapped_column(String(64), unique=True)

    # Who created this invite? Used for audit + "invited by X" UI.
    # CASCADE: if the inviter is deleted, drop their pending invites too.
    invited_by_user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
    )

    # When does the invite stop working? Routes check this at accept time.
    expires_at: Mapped[dt.datetime] = mapped_column(
        DateTime(timezone=True),
    )

    # NULL = pending. Timestamp = used at that moment.
    accepted_at: Mapped[dt.datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    # created_at and updated_at inherited from Base.
