"""
Suite routes — suites live inside a project (which lives inside an org).

URL pattern (doubly nested, mirrors the hierarchy):
   /organizations/{org_id}/projects/{project_id}/suites[/{id}]

Every endpoint in this file runs the same parent-walk:

   1. authn               (Depends → current_user)
   2. find org            (404 if missing)
   3. authz on the org    (membership row — tier depends on the verb)
   4. find project        (404 if missing)
   5. tenant isolation    (project.org_id == org_id in URL, else 404)
   6. its own work        (insert / select / update / delete the suite)

For suite-level endpoints (GET-one / PATCH / DELETE), we also do:
   7. find suite          (404)
   8. tenant isolation 2  (suite.project_id == project_id in URL, else 404)
"""

import uuid

from fastapi import APIRouter, Depends, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from packages.core.db import get_session
from packages.core.models.suite import Suite
from packages.core.models.user import User
from packages.core.schemas.suite import SuiteCreate, SuiteResponse, SuiteUpdate
from packages.core.security.authz import (
    load_org_and_check_membership,
    load_project_in_org,
    load_suite_in_project,
)
from packages.core.security.deps import get_current_user

router = APIRouter(prefix="/organizations", tags=["suites"])

@router.post(
    "/{org_id}/projects/{project_id}/suites",
    response_model=SuiteResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_suite(
    org_id: uuid.UUID,
    project_id: uuid.UUID,
    payload: SuiteCreate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    org = await load_org_and_check_membership(
        session=session, org_id=org_id, user_id=current_user.id, write=True,
    )
    project = await load_project_in_org(
        session=session, project_id=project_id, org_id=org.id,
    )

    suite = Suite(
        name=payload.name,
        description=payload.description,
        project_id=project.id,
    )
    session.add(suite)
    await session.commit()
    await session.refresh(suite)
    return suite


@router.get(
    "/{org_id}/projects/{project_id}/suites",
    response_model=list[SuiteResponse],
)
async def list_suites(
    org_id: uuid.UUID,
    project_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    org = await load_org_and_check_membership(
        session=session, org_id=org_id, user_id=current_user.id, write=False,
    )
    project = await load_project_in_org(
        session=session, project_id=project_id, org_id=org.id,
    )

    result = await session.execute(
        select(Suite).where(Suite.project_id == project.id)
    )
    return result.scalars().all()


@router.get(
    "/{org_id}/projects/{project_id}/suites/{id}",
    response_model=SuiteResponse,
)
async def get_suite(
    org_id: uuid.UUID,
    project_id: uuid.UUID,
    id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    org = await load_org_and_check_membership(
        session=session, org_id=org_id, user_id=current_user.id, write=False,
    )
    project = await load_project_in_org(
        session=session, project_id=project_id, org_id=org.id,
    )
    return await load_suite_in_project(
        session=session, suite_id=id, project_id=project.id,
    )


@router.patch(
    "/{org_id}/projects/{project_id}/suites/{id}",
    response_model=SuiteResponse,
)
async def update_suite(
    org_id: uuid.UUID,
    project_id: uuid.UUID,
    id: uuid.UUID,
    payload: SuiteUpdate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    org = await load_org_and_check_membership(
        session=session, org_id=org_id, user_id=current_user.id, write=True,
    )
    project = await load_project_in_org(
        session=session, project_id=project_id, org_id=org.id,
    )
    suite = await load_suite_in_project(
        session=session, suite_id=id, project_id=project.id,
    )

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(suite, field, value)

    await session.commit()
    await session.refresh(suite)
    return suite


@router.delete(
    "/{org_id}/projects/{project_id}/suites/{id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_suite(
    org_id: uuid.UUID,
    project_id: uuid.UUID,
    id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    org = await load_org_and_check_membership(
        session=session, org_id=org_id, user_id=current_user.id, write=True,
    )
    project = await load_project_in_org(
        session=session, project_id=project_id, org_id=org.id,
    )
    suite = await load_suite_in_project(
        session=session, suite_id=id, project_id=project.id,
    )

    await session.delete(suite)
    await session.commit()
