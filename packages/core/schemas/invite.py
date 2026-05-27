"""
Invite schemas — request/response shapes for invite endpoints.

InviteCreate    ← what Alice POSTs to /organizations/{id}/invites
InviteResponse  ← what we return after create/accept

Deliberately ABSENT from InviteCreate:
- org_id       (comes from the URL path, not the body)
- invited_by_user_id  (derived server-side from the JWT — never trusted from client)
- token        (server-generated random secret)
- expires_at   (server-generated: now + 7 days)
- accepted_at  (server-managed: NULL on create, timestamp on accept)

Re-uses the Role enum from membership schemas — single source of truth
for "owner | admin | member."
"""

import datetime as dt
import uuid

from pydantic import BaseModel, EmailStr

from packages.core.schemas.membership import Role


class InviteCreate(BaseModel):
    """
    What Alice POSTs to create an invite.

    Example request:
        POST /organizations/<org_id>/invites
        Authorization: Bearer <Alice's JWT>
        {
            "email": "bob@x.com",
            "role":  "member"
        }
    """
    email: EmailStr
    role: Role = Role.member       # defaults to "member" if not provided


class InviteResponse(BaseModel):
    """
    What the API returns after creating / fetching an invite.

    Includes the token — shown ONCE in the create response so Alice
    can put it into the invite URL she sends to Bob.

    Example response:
        {
            "id":                  "abc-...",
            "org_id":              "...",
            "email":               "bob@x.com",
            "role":                "member",
            "token":               "k7p2_a4f...",
            "invited_by_user_id":  "...",
            "expires_at":          "2026-06-02T19:30:00Z",
            "accepted_at":         null
        }
    """
    id: uuid.UUID
    org_id: uuid.UUID
    email: EmailStr
    role: str                       # string on the wire (JSON has no enum type)
    token: str
    invited_by_user_id: uuid.UUID
    expires_at: dt.datetime
    accepted_at: dt.datetime | None

    class Config:
        from_attributes = True
