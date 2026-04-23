from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from packages.core.db import get_session
from packages.core.models.organization import Organization
from packages.core.schemas.organization import OrgCreate, OrgResponse

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
