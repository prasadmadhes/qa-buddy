"""
Auth schemas — controls what data comes in and goes out for login.

LoginRequest    ← what the user sends (email + password)
TokenResponse   ← what we send back after a successful login
                  (OAuth2-standard shape: access_token + token_type + expires_in)
"""

from pydantic import BaseModel, EmailStr


class LoginRequest(BaseModel):
    """
    What the user sends to POST /auth/login.

    Example request:
    {
        "email": "alice@x.com",
        "password": "hunter2"
    }
    """
    email: EmailStr     # must be a valid email format
    password: str       # raw password — we'll verify against the bcrypt hash


class TokenResponse(BaseModel):
    """
    What the API sends back after a successful login.
    Follows the OAuth2 standard token-response shape.

    Example response:
    {
        "access_token": "eyJhbGc...eyJzdWIi....Wvk-w4...",
        "token_type": "bearer",
        "expires_in": 3600
    }
    """
    access_token: str
    token_type: str = "bearer"     # tells the client to use Authorization: Bearer <token>
    expires_in: int                 # seconds until the token expires
