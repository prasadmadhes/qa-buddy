import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from packages.core.db import get_session
from packages.core.models.organization import Organization
from packages.core.schemas.organization import OrgCreate, OrgResponse, OrgUpdate

router = APIRouter(prefix="/organizations", tags=["organizations"])


@router.post("", response_model=OrgResponse, status_code=status.HTTP_201_CREATED)
async def create_organization(
    payload: OrgCreate,
    session: AsyncSession = Depends(get_session),
):
    org = Organization(name=payload.name, slug=payload.slug)
    session.add(org)
    await session.commit()
    await session.refresh(org)
    return org


@router.get("", response_model=list[OrgResponse])
async def list_organizations(
    session: AsyncSession = Depends(get_session),
):
    result = await session.execute(select(Organization))
    orgs = result.scalars().all()
    return orgs


@router.get("/{id}", response_model=OrgResponse)
async def get_organization(
    id: uuid.UUID,
    session: AsyncSession = Depends(get_session),
):
    org = await session.get(Organization, id)
    if org is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Organization not found",
        )
    return org


@router.patch("/{id}", response_model=OrgResponse)
async def update_organization(
    id: uuid.UUID,
    payload: OrgUpdate,
    session: AsyncSession = Depends(get_session),
):
    org = await session.get(Organization, id)
    if org is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Organization not found",
        )

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(org, field, value)

    await session.commit()
    await session.refresh(org)
    return org
