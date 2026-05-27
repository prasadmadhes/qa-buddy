"""
Authorization helpers — the "walk down the hierarchy" steps reused by
every nested-resource route (projects, suites, folders, test cases).

Each helper does ONE thing:
   load X and confirm it actually belongs where the URL says it does.

If anything is off, it raises an HTTPException so the route just bails out.
404 (not 403) is used for "wrong parent" mismatches — we don't want to
reveal the existence of resources living in other tenants.

   load_org_and_check_membership   → org exists + caller has the right role
   load_project_in_org             → project exists + lives in this org
   load_suite_in_project           → suite exists + lives in this project
   load_folder_in_suite            → folder exists + lives in this suite
   load_test_case_in_suite         → test case exists + lives in this suite
"""

import uuid

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from packages.core.models.folder import Folder
from packages.core.models.membership import Membership
from packages.core.models.organization import Organization
from packages.core.models.project import Project
from packages.core.models.suite import Suite
from packages.core.models.test_case import TestCase


async def load_org_and_check_membership(
    *,
    session: AsyncSession,
    org_id: uuid.UUID,
    user_id: uuid.UUID,
    write: bool,
) -> Organization:
    """
    Load the org and verify the caller's membership.
    - write=True  → caller must be owner or admin.
    - write=False → caller must be a member of any role.
    """
    org = await session.get(Organization, org_id)
    if org is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Organization not found")

    where_clauses = [
        Membership.user_id == user_id,
        Membership.org_id == org.id,
    ]
    if write:
        where_clauses.append(Membership.role.in_(["owner", "admin"]))

    membership = await session.scalar(select(Membership).where(*where_clauses))
    if membership is None:
        if write:
            raise HTTPException(
                status.HTTP_403_FORBIDDEN,
                detail="Only owners or admins can do this",
            )
        raise HTTPException(
            status.HTTP_403_FORBIDDEN,
            detail="You are not a member of this organization",
        )
    return org


async def load_project_in_org(
    *,
    session: AsyncSession,
    project_id: uuid.UUID,
    org_id: uuid.UUID,
) -> Project:
    """Find the project and confirm it belongs to the org in the URL (else 404)."""
    project = await session.get(Project, project_id)
    if project is None or project.org_id != org_id:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Project not found")
    return project


async def load_suite_in_project(
    *,
    session: AsyncSession,
    suite_id: uuid.UUID,
    project_id: uuid.UUID,
) -> Suite:
    """Find the suite and confirm it belongs to the project in the URL (else 404)."""
    suite = await session.get(Suite, suite_id)
    if suite is None or suite.project_id != project_id:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Suite not found")
    return suite


async def load_folder_in_suite(
    *,
    session: AsyncSession,
    folder_id: uuid.UUID,
    suite_id: uuid.UUID,
) -> Folder:
    """Find the folder and confirm it belongs to the suite in the URL (else 404)."""
    folder = await session.get(Folder, folder_id)
    if folder is None or folder.suite_id != suite_id:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Folder not found")
    return folder


async def load_test_case_in_suite(
    *,
    session: AsyncSession,
    test_case_id: uuid.UUID,
    suite_id: uuid.UUID,
) -> TestCase:
    """Find the test case and confirm it belongs to the suite in the URL (else 404)."""
    test_case = await session.get(TestCase, test_case_id)
    if test_case is None or test_case.suite_id != suite_id:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Test case not found")
    return test_case
