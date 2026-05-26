import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from packages.core.db import get_session
from packages.core.models.membership import Membership
from packages.core.models.organization import Organization
from packages.core.models.user import User
from packages.core.schemas.organization import OrgCreate, OrgResponse, OrgUpdate
from packages.core.security.deps import get_current_user

router = APIRouter(prefix="/organizations", tags=["organizations"])


@router.post("", response_model=OrgResponse, status_code=status.HTTP_201_CREATED)
async def create_organization(
    payload: OrgCreate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    # Stage the team org. is_personal=False (default, made explicit for clarity).
    org = Organization(name=payload.name, slug=payload.slug, is_personal=False)
    session.add(org)

    # flush() sends INSERT for the org inside the open transaction and brings
    # org.id back into Python. If the slug collides, rollback the whole thing.
    try:
        await session.flush()
    except IntegrityError:
        await session.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An organization with this slug already exists",
        )

    # Auto-make the calling user the owner.
    # user_id comes from the JWT-verified current_user, NEVER from the payload —
    # otherwise a client could claim org ownership for any user_id.
    session.add(Membership(
        user_id=current_user.id,
        org_id=org.id,
        role="owner",
    ))

    # commit() locks both rows in atomically — all-or-nothing.
    await session.commit()

    return org


@router.get("", response_model=list[OrgResponse])
async def list_organizations(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    # SCOPE (not 403): list only orgs the calling user is a member of (any role).
    # This is the LIST-endpoint flavour of authz — scope baked into the SQL.
    result = await session.execute(
        select(Organization)
        .join(Membership, Membership.org_id == Organization.id)
        .where(Membership.user_id == current_user.id)
    )
    return result.scalars().all()


@router.get("/{id}", response_model=OrgResponse)
async def get_organization(
    id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    # FIND: 404 if no such org.
    org = await session.get(Organization, id)
    if org is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Organization not found",
        )

    # AUTHZ: must be a member of THIS org (any role).
    membership = await session.scalar(
        select(Membership).where(
            Membership.user_id == current_user.id,
            Membership.org_id == org.id,
        )
    )
    if membership is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not a member of this organization",
        )

    return org


@router.patch("/{id}", response_model=OrgResponse)
async def update_organization(
    id: uuid.UUID,
    payload: OrgUpdate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    org = await session.get(Organization, id)
    if org is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Organization not found",
        )

    # AUTHZ: must be owner or admin of THIS org.
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
            detail="Only owners or admins can update this organization",
        )

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(org, field, value)

    try:
        await session.commit()
    except IntegrityError:
        await session.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An organization with this slug already exists",
        )
    await session.refresh(org)
    return org


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_organization(
    id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    org = await session.get(Organization, id)
    if org is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Organization not found",
        )

    # AUTHZ: only owners can delete the org (strictest tier).
    membership = await session.scalar(
        select(Membership).where(
            Membership.user_id == current_user.id,
            Membership.org_id == org.id,
            Membership.role == "owner",
        )
    )
    if membership is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the owner can delete this organization",
        )

    await session.delete(org)
    await session.commit()
