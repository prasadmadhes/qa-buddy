"""
Membership schemas — controls what data comes in and goes out for memberships.

MembershipCreate    ← invite a user to an org (user_id, org_id, role)
MembershipUpdate    ← change a user's role
MembershipResponse  ← what API sends back (id, user_id, org_id, role)
"""

import uuid
from enum import Enum

from pydantic import BaseModel


class Role(str, Enum):
    """Allowed roles for a membership."""
    owner = "owner"
    admin = "admin"
    member = "member"


class MembershipCreate(BaseModel):
    """
    What is sent when adding a user to an organization.

    Example request:
    {
        "user_id": "a1b2-...",
        "org_id": "c3d4-...",
        "role": "member"
    }
    """
    user_id: uuid.UUID
    org_id: uuid.UUID
    role: Role = Role.member        # defaults to "member" if not provided


class MembershipUpdate(BaseModel):
    """
    What is sent when changing a user's role.
    Only role can be changed — you can't change which user or org.

    Example request:
    {
        "role": "admin"
    }
    """
    role: Role


class MembershipResponse(BaseModel):
    """
    What the API sends back.

    Example response:
    {
        "id": "e5f6-...",
        "user_id": "a1b2-...",
        "org_id": "c3d4-...",
        "role": "member"
    }
    """
    id: uuid.UUID
    user_id: uuid.UUID
    org_id: uuid.UUID
    role: str

    class Config:
        from_attributes = True
