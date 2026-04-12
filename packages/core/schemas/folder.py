"""
Folder schemas — controls what data comes in and goes out for folders.

FolderCreate    ← what user sends when creating a folder
FolderUpdate    ← what user sends when editing a folder
FolderResponse  ← what API sends back
"""

import uuid

from pydantic import BaseModel, Field


class FolderCreate(BaseModel):
    """
    What the user sends when creating a folder.

    Example request (top-level folder):
    {
        "name": "Login",
        "suite_id": "a1b2-..."
    }

    Example request (nested folder):
    {
        "name": "Email Login",
        "suite_id": "a1b2-...",
        "parent_id": "c3d4-..."   ← inside another folder
    }
    """
    name: str = Field(min_length=2, max_length=100)
    suite_id: uuid.UUID                     # which suite does this folder belong to?
    parent_id: uuid.UUID | None = None      # optional — None = top-level folder


class FolderUpdate(BaseModel):
    """
    What the user sends when editing a folder.
    Only name can be changed.

    Example request:
    {
        "name": "Email & Social Login"
    }
    """
    name: str | None = Field(default=None, min_length=2, max_length=100)


class FolderResponse(BaseModel):
    """
    What the API sends back.

    Example response:
    {
        "id": "e5f6-...",
        "name": "Login",
        "suite_id": "a1b2-...",
        "parent_id": null          ← null means top-level
    }
    """
    id: uuid.UUID
    name: str
    suite_id: uuid.UUID
    parent_id: uuid.UUID | None     # null = top-level, uuid = nested

    class Config:
        from_attributes = True
