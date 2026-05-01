import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from packages.core.db import get_session
from packages.core.models.membership import Membership
from packages.core.models.organization import Organization
from packages.core.models.user import User
from packages.core.schemas.membership import (
    MembershipCreate,
    MembershipResponse,
    MembershipUpdate,
)

router = APIRouter(prefix="/memberships", tags=["memberships"])


@router.post("", response_model=MembershipResponse, status_code=status.HTTP_201_CREATED)
async def create_membership(
    payload: MembershipCreate,
    session: AsyncSession = Depends(get_session),
):
    # Pre-check #1 — does the user exist?
    user = await session.get(User, payload.user_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    # Pre-check #2 — does the organization exist?
    org = await session.get(Organization, payload.org_id)
    if org is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Organization not found",
        )

    membership = Membership(
        user_id=payload.user_id,
        org_id=payload.org_id,
        role=payload.role.value,
    )
    session.add(membership)
    await session.commit()
    await session.refresh(membership)
    return membership


@router.get("", response_model=list[MembershipResponse])
async def list_memberships(
    session: AsyncSession = Depends(get_session),
):
    result = await session.execute(select(Membership))
    memberships = result.scalars().all()
    return memberships


@router.get("/{id}", response_model=MembershipResponse)
async def get_membership(
    id: uuid.UUID,
    session: AsyncSession = Depends(get_session),
):
    membership = await session.get(Membership, id)
    if membership is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Membership not found",
        )
    return membership


@router.patch("/{id}", response_model=MembershipResponse)
async def update_membership(
    id: uuid.UUID,
    payload: MembershipUpdate,
    session: AsyncSession = Depends(get_session),
):
    membership = await session.get(Membership, id)
    if membership is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Membership not found",
        )

    membership.role = payload.role.value

    await session.commit()
    await session.refresh(membership)
    return membership


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_membership(
    id: uuid.UUID,
    session: AsyncSession = Depends(get_session),
):
    membership = await session.get(Membership, id)
    if membership is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Membership not found",
        )
    await session.delete(membership)
    await session.commit()
