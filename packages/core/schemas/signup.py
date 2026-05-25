"""
Signup schemas — controls the user-only entry point.

SignupRequest   ← user fields only (name, email, password)
                  No org fields — we auto-create a personal workspace.
SignupResponse  ← OAuth2 token + the user + the auto-created personal org
                  (so the frontend can land directly in the personal workspace
                   without a second round trip)
"""

from pydantic import BaseModel, EmailStr, Field

from packages.core.schemas.organization import OrgResponse
from packages.core.schemas.user import UserResponse


class SignupRequest(BaseModel):
    """
    What the user sends to POST /auth/signup.

    Creates THREE rows atomically:
      1. User account (with bcrypt-hashed password)
      2. A personal Organization named "<Name>'s Workspace" (is_personal=True)
      3. An owner Membership linking them

    All in one transaction — if any step fails, all three roll back.
    The user is auto-logged-in (JWT returned in the response).

    Example request:
    {
        "name": "Alice",
        "email": "alice@x.com",
        "password": "hunter2"
    }
    """
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    password: str       # raw — we hash it server-side


class SignupResponse(BaseModel):
    """
    What the API sends back after a successful signup.

    Bundles three things in one payload:
      1. OAuth2 token (auto-login — no need to call /auth/login)
      2. The new user
      3. The auto-created personal organization

    Frontend uses (2) and (3) to navigate straight into the personal workspace.

    Example response:
    {
        "access_token": "eyJhbGc...",
        "token_type": "bearer",
        "expires_in": 3600,
        "user": { "id": "...", "name": "Alice", "email": "alice@x.com" },
        "organization": {
            "id": "...",
            "name": "Alice's Workspace",
            "slug": "alice-7k3p2a4f"
        }
    }
    """
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    user: UserResponse
    organization: OrgResponse
