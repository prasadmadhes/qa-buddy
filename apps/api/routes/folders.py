"""
Folder routes — folders live inside a suite. They can also nest inside
other folders in the same suite (self-referencing parent_id).

URL pattern:
   /organizations/{org_id}/projects/{project_id}/suites/{suite_id}/folders[/{id}]

Two kinds of "parent" to keep straight:
   - URL parents (org, project, suite)  → fixed in the path, structural.
   - parent_id (folder → folder)        → in the body, can be NULL,
                                          must live in the SAME suite.

Every endpoint walks down the path-hierarchy:
   1. authn
   2. find org      (404)
   3. authz on org  (403)        ← owner+admin for writes, any-member for reads
   4. find project  (404)
   5. project tenant check       ← project.org_id == org_id in URL
   6. find suite    (404)
   7. suite tenant check         ← suite.project_id == project_id in URL
   8. its own work

For folder-level endpoints (GET-one / PATCH / DELETE) also:
   9. find folder   (404)
  10. folder tenant check        ← folder.suite_id == suite_id in URL

For POST with a parent_id in the body:
   *. find parent folder (404)
   *. parent.suite_id == suite_id in URL (else 404 — same-suite rule)
"""

import uuid

from fastapi import APIRouter, Depends, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from packages.core.db import get_session
from packages.core.models.folder import Folder
from packages.core.models.user import User
from packages.core.schemas.folder import FolderCreate, FolderResponse, FolderUpdate
from packages.core.security.authz import (
    load_folder_in_suite,
    load_org_and_check_membership,
    load_project_in_org,
    load_suite_in_project,
)
from packages.core.security.deps import get_current_user

router = APIRouter(prefix="/organizations", tags=["folders"])

@router.post(
    "/{org_id}/projects/{project_id}/suites/{suite_id}/folders",
    response_model=FolderResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_folder(
    org_id: uuid.UUID,
    project_id: uuid.UUID,
    suite_id: uuid.UUID,
    payload: FolderCreate,
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
        session=session, suite_id=suite_id, project_id=project.id,
    )

    # If a parent_id was supplied in the body, validate it lives in the same suite.
    # Treat any mismatch as 404 (don't leak the existence of folders in other suites).
    if payload.parent_id is not None:
        await load_folder_in_suite(
            session=session, folder_id=payload.parent_id, suite_id=suite.id,
        )

    folder = Folder(
        name=payload.name,
        suite_id=suite.id,
        parent_id=payload.parent_id,
    )
    session.add(folder)
    await session.commit()
    await session.refresh(folder)
    return folder


@router.get(
    "/{org_id}/projects/{project_id}/suites/{suite_id}/folders",
    response_model=list[FolderResponse],
)
async def list_folders(
    org_id: uuid.UUID,
    project_id: uuid.UUID,
    suite_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    org = await load_org_and_check_membership(
        session=session, org_id=org_id, user_id=current_user.id, write=False,
    )
    project = await load_project_in_org(
        session=session, project_id=project_id, org_id=org.id,
    )
    suite = await load_suite_in_project(
        session=session, suite_id=suite_id, project_id=project.id,
    )

    result = await session.execute(
        select(Folder).where(Folder.suite_id == suite.id)
    )
    return result.scalars().all()


@router.get(
    "/{org_id}/projects/{project_id}/suites/{suite_id}/folders/{id}",
    response_model=FolderResponse,
)
async def get_folder(
    org_id: uuid.UUID,
    project_id: uuid.UUID,
    suite_id: uuid.UUID,
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
    suite = await load_suite_in_project(
        session=session, suite_id=suite_id, project_id=project.id,
    )
    return await load_folder_in_suite(
        session=session, folder_id=id, suite_id=suite.id,
    )


@router.patch(
    "/{org_id}/projects/{project_id}/suites/{suite_id}/folders/{id}",
    response_model=FolderResponse,
)
async def update_folder(
    org_id: uuid.UUID,
    project_id: uuid.UUID,
    suite_id: uuid.UUID,
    id: uuid.UUID,
    payload: FolderUpdate,
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
        session=session, suite_id=suite_id, project_id=project.id,
    )
    folder = await load_folder_in_suite(
        session=session, folder_id=id, suite_id=suite.id,
    )

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(folder, field, value)

    await session.commit()
    await session.refresh(folder)
    return folder


@router.delete(
    "/{org_id}/projects/{project_id}/suites/{suite_id}/folders/{id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_folder(
    org_id: uuid.UUID,
    project_id: uuid.UUID,
    suite_id: uuid.UUID,
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
        session=session, suite_id=suite_id, project_id=project.id,
    )
    folder = await load_folder_in_suite(
        session=session, folder_id=id, suite_id=suite.id,
    )

    # No cascade configured. If the folder has children (or test_cases land
    # here later), Postgres will reject with an IntegrityError. Revisit when
    # we wire cascades for the whole tree.
    await session.delete(folder)
    await session.commit()
