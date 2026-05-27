"""
Project routes — projects live inside an organization.

POST /organizations/{org_id}/projects
   - Authenticated. Caller must be owner or admin of the org (AUTHZ).
   - org_id comes from the URL path, NOT the payload.
   - Returns the new project.

GET /organizations/{org_id}/projects
   - Authenticated. Caller must be a member of the org (any role).
   - Returns the list of all projects in this org.

GET /organizations/{org_id}/projects/{id}
   - Authenticated. Caller must be a member of the org (any role).
   - Returns one project — but ONLY if it actually belongs to the org
     in the path (tenant isolation). Otherwise 404.

PATCH /organizations/{org_id}/projects/{id}
   - Authenticated. Caller must be owner or admin of the org.
   - Tenant-isolated (project must belong to the org in the path).
   - Only `name` and `description` are editable.

DELETE /organizations/{org_id}/projects/{id}
   - Authenticated. Caller must be owner or admin of the org.
   - Tenant-isolated.
   - No cascade configured yet → fails if the project has suites
     (we will revisit when suites land).
"""

import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from packages.core.db import get_session
from packages.core.models.membership import Membership
from packages.core.models.organization import Organization
from packages.core.models.project import Project
from packages.core.models.user import User
from packages.core.schemas.project import ProjectCreate, ProjectResponse, ProjectUpdate
from packages.core.security.deps import get_current_user

router = APIRouter(prefix="/organizations", tags=["projects"])


@router.post(
    "/{org_id}/projects",
    response_model=ProjectResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_project(
    org_id: uuid.UUID,
    payload: ProjectCreate,
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
            detail="Only owners or admins can create projects",
        )

    # STEP 4 — ACT: insert the project. org_id comes from the path (trusted),
    # never from the payload.
    project = Project(
        name=payload.name,
        description=payload.description,
        org_id=org.id,
    )
    session.add(project)
    await session.commit()
    await session.refresh(project)
    return project


@router.get(
    "/{org_id}/projects",
    response_model=list[ProjectResponse],
)
async def list_projects(
    org_id: uuid.UUID,
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

    # STEP 3 — AUTHZ: caller must be a member of THIS org (any role)
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

    # STEP 4 — FETCH: all projects belonging to this org
    result = await session.execute(
        select(Project).where(Project.org_id == org.id)
    )
    return result.scalars().all()


@router.get(
    "/{org_id}/projects/{id}",
    response_model=ProjectResponse,
)
async def get_project(
    org_id: uuid.UUID,
    id: uuid.UUID,
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

    # STEP 3 — AUTHZ: caller must be a member of THIS org (any role)
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

    # STEP 4 — FIND the project
    project = await session.get(Project, id)
    if project is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    # STEP 5 — TENANT ISOLATION: the project must belong to the org in the path.
    # 404 (not 403) — don't reveal the existence of resources in other orgs.
    if project.org_id != org.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    return project


@router.patch(
    "/{org_id}/projects/{id}",
    response_model=ProjectResponse,
)
async def update_project(
    org_id: uuid.UUID,
    id: uuid.UUID,
    payload: ProjectUpdate,
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
            detail="Only owners or admins can update projects",
        )

    # STEP 4 — FIND the project + tenant isolation
    project = await session.get(Project, id)
    if project is None or project.org_id != org.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    # STEP 5 — APPLY only the fields the caller actually sent.
    # exclude_unset=True means we ignore fields they didn't provide
    # (so PATCH doesn't blank out columns by omission).
    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(project, field, value)

    await session.commit()
    await session.refresh(project)
    return project


@router.delete(
    "/{org_id}/projects/{id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_project(
    org_id: uuid.UUID,
    id: uuid.UUID,
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
            detail="Only owners or admins can delete projects",
        )

    # STEP 4 — FIND the project + tenant isolation
    project = await session.get(Project, id)
    if project is None or project.org_id != org.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    # STEP 5 — REMOVE. No cascade yet; if the project has suites,
    # Postgres will reject the delete with an IntegrityError.
    await session.delete(project)
    await session.commit()

