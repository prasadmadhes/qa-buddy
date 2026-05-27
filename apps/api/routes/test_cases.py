"""
Test case routes — test cases live inside a suite, optionally inside a
folder within that suite. Same shape as folders, with one extra body
field (folder_id, optional) that follows the same "must live in this
suite" rule as folder.parent_id.

URL pattern:
   /organizations/{org_id}/projects/{project_id}/suites/{suite_id}/test-cases[/{id}]

Body design:
   - suite_id      → path (the owning unit, source of truth)
   - folder_id     → body, optional (None = test case at top of suite,
                     else a folder uuid that MUST live in this same suite)
   - status        → defaults to "draft"; the review flow (approve/reject)
                     will live on a dedicated PATCH /…/{id}/status endpoint
                     once AI generation lands. Not implemented yet.

Authz tiers:
   - POST / PATCH / DELETE → owner + admin
   - GET list / GET one    → any member
"""

import uuid

from fastapi import APIRouter, Depends, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from packages.core.db import get_session
from packages.core.models.test_case import TestCase
from packages.core.models.user import User
from packages.core.schemas.test_case import (
    TestCaseCreate,
    TestCaseResponse,
    TestCaseUpdate,
)
from packages.core.security.authz import (
    load_folder_in_suite,
    load_org_and_check_membership,
    load_project_in_org,
    load_suite_in_project,
    load_test_case_in_suite,
)
from packages.core.security.deps import get_current_user

router = APIRouter(prefix="/organizations", tags=["test-cases"])


@router.post(
    "/{org_id}/projects/{project_id}/suites/{suite_id}/test-cases",
    response_model=TestCaseResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_test_case(
    org_id: uuid.UUID,
    project_id: uuid.UUID,
    suite_id: uuid.UUID,
    payload: TestCaseCreate,
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

    # If folder_id was supplied, it must live in THIS suite. Same rule
    # as folder.parent_id — we don't allow cross-suite pointers.
    if payload.folder_id is not None:
        await load_folder_in_suite(
            session=session, folder_id=payload.folder_id, suite_id=suite.id,
        )

    # Pydantic enums (Priority/Category) need .value to land as the
    # plain string the DB column expects.
    test_case = TestCase(
        title=payload.title,
        objective=payload.objective,
        preconditions=payload.preconditions,
        steps=payload.steps,
        expected_result=payload.expected_result,
        priority=payload.priority.value,
        category=payload.category.value,
        tags=payload.tags,
        source_reference=payload.source_reference,
        suite_id=suite.id,
        folder_id=payload.folder_id,
    )
    session.add(test_case)
    await session.commit()
    await session.refresh(test_case)
    return test_case


@router.get(
    "/{org_id}/projects/{project_id}/suites/{suite_id}/test-cases",
    response_model=list[TestCaseResponse],
)
async def list_test_cases(
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
        select(TestCase).where(TestCase.suite_id == suite.id)
    )
    return result.scalars().all()


@router.get(
    "/{org_id}/projects/{project_id}/suites/{suite_id}/test-cases/{id}",
    response_model=TestCaseResponse,
)
async def get_test_case(
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
    return await load_test_case_in_suite(
        session=session, test_case_id=id, suite_id=suite.id,
    )


@router.patch(
    "/{org_id}/projects/{project_id}/suites/{suite_id}/test-cases/{id}",
    response_model=TestCaseResponse,
)
async def update_test_case(
    org_id: uuid.UUID,
    project_id: uuid.UUID,
    suite_id: uuid.UUID,
    id: uuid.UUID,
    payload: TestCaseUpdate,
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
    test_case = await load_test_case_in_suite(
        session=session, test_case_id=id, suite_id=suite.id,
    )

    # exclude_unset=True → only touch the fields the caller actually sent.
    # Enum fields come in as Priority/Category instances; convert to .value
    # before assigning so the DB column gets a plain string.
    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        if field in ("priority", "category") and value is not None:
            value = value.value if hasattr(value, "value") else value
        setattr(test_case, field, value)

    await session.commit()
    await session.refresh(test_case)
    return test_case


@router.delete(
    "/{org_id}/projects/{project_id}/suites/{suite_id}/test-cases/{id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_test_case(
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
    test_case = await load_test_case_in_suite(
        session=session, test_case_id=id, suite_id=suite.id,
    )

    await session.delete(test_case)
    await session.commit()
