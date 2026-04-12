"""
Organization schemas — controls what data comes in and goes out for organizations.

OrgCreate    ← what user sends when creating an org (name, slug)
OrgUpdate    ← what user sends when editing an org (name and/or slug)
OrgResponse  ← what API sends back (id, name, slug)
"""

import uuid

from pydantic import BaseModel, Field


class OrgCreate(BaseModel):
    """
    What the user sends when creating an organization.

    Example request:
    {
        "name": "Acme Corp",
        "slug": "acme-corp"
    }
    """
    name: str = Field(min_length=2, max_length=100)
    slug: str = Field(min_length=2, max_length=100)


class OrgUpdate(BaseModel):
    """
    What the user sends when editing an organization.
    Both fields are optional — only send what you want to change.

    Example request:
    {
        "name": "Acme Corporation"    ← only changing name
    }
    """
    name: str | None = Field(default=None, min_length=2, max_length=100)
    slug: str | None = Field(default=None, min_length=2, max_length=100)


class OrgResponse(BaseModel):
    """
    What the API sends back.

    Example response:
    {
        "id": "a1b2-c3d4-...",
        "name": "Acme Corp",
        "slug": "acme-corp"
    }
    """
    id: uuid.UUID
    name: str
    slug: str

    class Config:
        from_attributes = True  # allows converting SQLAlchemy model → Pydantic schema
