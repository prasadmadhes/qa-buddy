"""
Invite routes — Alice creates invites for Bob to join an org.

POST /organizations/{org_id}/invites
   - Authenticated. Must be owner or admin of the org (AUTHZ).
   - Resend semantics (B2): if a non-accepted invite already exists
     for (email, org), UPDATE it in place. Otherwise INSERT new.
   - Returns the invite with its token (shown once).
"""

import datetime as dt
import secrets
import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from packages.core.db import get_session
from packages.core.models.invite import Invite
from packages.core.models.membership import Membership
from packages.core.models.organization import Organization
from packages.core.models.user import User
from packages.core.schemas.invite import InviteCreate, InviteResponse
from packages.core.security.deps import get_current_user

router = APIRouter(prefix="/organizations", tags=["invites"])


@router.post(
    "/{org_id}/invites",
    response_model=InviteResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_invite(
    org_id: uuid.UUID,
    payload: InviteCreate,
    current_user: User = Depends(get_current_user),         # STEP 1 — AUTHN
    session: AsyncSession = Depends(get_session),
):
    # STEP 2 — FIND the org
    org = await session.get(Organization, org_id)
    if org is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Organization not found",
        )

    # STEP 3 — AUTHZ: caller must be owner or admin of THIS org
    membership = await session.scalar(
        select(Membership).where(
            Membership.user_id == current_user.id,
            Membership.org_id == org.id,
            Membership.role.in_(["owner", "admin"]),
        )
    )
    if membership is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only owners or admins can invite people",
        )

    # STEP 4 — ACT: UPDATE existing pending invite, or INSERT new (resend strategy B2)
    existing = await session.scalar(
        select(Invite).where(
            Invite.email == payload.email,
            Invite.org_id == org.id,
            Invite.accepted_at.is_(None),
        )
    )

    expires_at = dt.datetime.now(dt.timezone.utc) + dt.timedelta(days=7)
    fresh_token = secrets.token_urlsafe(32)

    if existing is not None:
        # UPDATE — refresh the pending invite in place
        existing.token = fresh_token
        existing.role = payload.role.value          # Enum → string for the DB column
        existing.expires_at = expires_at
        existing.invited_by_user_id = current_user.id
        invite = existing
    else:
        # INSERT — fresh invite
        invite = Invite(
            org_id=org.id,
            email=payload.email,
            role=payload.role.value,
            token=fresh_token,
            invited_by_user_id=current_user.id,
            expires_at=expires_at,
        )
        session.add(invite)

    await session.commit()
    return invite
