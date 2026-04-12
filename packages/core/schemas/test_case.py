"""
TestCase schemas — controls what data comes in and goes out for test cases.

TestCaseCreate    ← what user sends when creating a test case
TestCaseUpdate    ← what user sends when editing a test case
TestCaseResponse  ← what API sends back
"""

import uuid

from pydantic import BaseModel, Field

from packages.core.models.test_case import Category, Priority, Status


class TestCaseCreate(BaseModel):
    """
    What the user sends when creating a test case.

    Example request:
    {
        "title": "User can login with valid email",
        "steps": "1. Go to login page\n2. Enter email\n3. Click submit",
        "expected_result": "User sees dashboard",
        "priority": "high",
        "category": "smoke",
        "suite_id": "a1b2-..."
    }
    """
    title: str = Field(min_length=2, max_length=255)
    objective: str | None = None
    preconditions: str | None = None
    steps: str | None = None
    expected_result: str | None = None
    priority: Priority = Priority.medium        # defaults to "medium"
    category: Category = Category.functional    # defaults to "functional"
    tags: str | None = None
    source_reference: str | None = None
    suite_id: uuid.UUID                         # required — which suite?
    folder_id: uuid.UUID | None = None          # optional — which folder?


class TestCaseUpdate(BaseModel):
    """
    What the user sends when editing a test case.
    All fields are optional — only send what you want to change.
    """
    title: str | None = Field(default=None, min_length=2, max_length=255)
    objective: str | None = None
    preconditions: str | None = None
    steps: str | None = None
    expected_result: str | None = None
    priority: Priority | None = None
    category: Category | None = None
    tags: str | None = None
    source_reference: str | None = None


class TestCaseStatusUpdate(BaseModel):
    """
    Used specifically for the review flow — approve or reject a test case.

    Example request:
    {
        "status": "approved"
    }
    """
    status: Status


class TestCaseResponse(BaseModel):
    """
    What the API sends back.
    """
    id: uuid.UUID
    title: str
    objective: str | None
    preconditions: str | None
    steps: str | None
    expected_result: str | None
    priority: str
    category: str
    status: str
    tags: str | None
    source_reference: str | None
    suite_id: uuid.UUID
    folder_id: uuid.UUID | None

    class Config:
        from_attributes = True
