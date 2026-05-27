"""
Suite schemas — controls what data comes in and goes out for suites.

SuiteCreate    ← what user sends when creating a suite
SuiteUpdate    ← what user sends when editing a suite
SuiteResponse  ← what API sends back
"""

import uuid

from pydantic import BaseModel, Field


class SuiteCreate(BaseModel):
    """
    What the user sends when creating a suite.

    project_id is NOT here — it comes from the URL path
    (POST /organizations/{org_id}/projects/{project_id}/suites).
    Path is the source of truth for parent IDs.

    Example request:
    {
        "name": "Authentication Tests",
        "description": "All auth related test cases"
    }
    """
    name: str = Field(min_length=2, max_length=100)
    description: str | None = None


class SuiteUpdate(BaseModel):
    """
    What the user sends when editing a suite.
    Only name and description can change — project cannot be changed.

    Example request:
    {
        "name": "Auth Tests"
    }
    """
    name: str | None = Field(default=None, min_length=2, max_length=100)
    description: str | None = None


class SuiteResponse(BaseModel):
    """
    What the API sends back.

    Example response:
    {
        "id": "e5f6-...",
        "name": "Authentication Tests",
        "description": "All auth related test cases",
        "project_id": "a1b2-..."
    }
    """
    id: uuid.UUID
    name: str
    description: str | None
    project_id: uuid.UUID

    class Config:
        from_attributes = True
