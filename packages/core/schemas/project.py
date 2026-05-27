"""
Project schemas — controls what data comes in and goes out for projects.

ProjectCreate    ← what user sends when creating a project
ProjectUpdate    ← what user sends when editing a project
ProjectResponse  ← what API sends back
"""

import uuid

from pydantic import BaseModel, Field


class ProjectCreate(BaseModel):
    """
    What the user sends when creating a project.

    org_id is NOT here — it comes from the URL path
    (POST /organizations/{org_id}/projects). Path is source of truth
    for parent IDs; payload only carries the new resource's own fields.

    Example request:
    {
        "name": "Backend API",
        "description": "Test cases for the backend API"
    }
    """
    name: str = Field(min_length=2, max_length=100)
    description: str | None = None


class ProjectUpdate(BaseModel):
    """
    What the user sends when editing a project.
    Only name and description can be changed — org cannot be changed.

    Example request:
    {
        "name": "Backend API v2"
    }
    """
    name: str | None = Field(default=None, min_length=2, max_length=100)
    description: str | None = None


class ProjectResponse(BaseModel):
    """
    What the API sends back.

    Example response:
    {
        "id": "e5f6-...",
        "name": "Backend API",
        "description": "Test cases for the backend API",
        "org_id": "a1b2-..."
    }
    """
    id: uuid.UUID
    name: str
    description: str | None
    org_id: uuid.UUID

    class Config:
        from_attributes = True
