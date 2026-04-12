# Project Model

> A container for test suites and test cases, belonging to an organization.

---

## Why do we need it?

An organization can have multiple products or apps to test. Each one gets its own **project**.

```
Acme Corp (organization)
├── Backend API    (project)
├── Mobile App     (project)
└── Admin Panel    (project)
```

Without projects, all test cases would be dumped together with no separation.

## What it looks like in the database

```
Projects
┌──────────┬──────────────┬─────────────────────┬──────────┐
│ id    🔑 │ name         │ description         │ org_id 🔗│
├──────────┼──────────────┼─────────────────────┼──────────┤
│ p1       │ Backend API  │ API test cases      │ org1     │
│ p2       │ Mobile App   │ Mobile test cases   │ org1     │
└──────────┴──────────────┴─────────────────────┴──────────┘

🔑 = Primary Key (this row's unique ID)
🔗 = Foreign Key (points to organizations table)
```

## How it connects to other tables

```
Organization → Project → Suite → Folder → Test Case
                 ↑
              we are here
```

A project **belongs to** one organization. This is enforced by the `org_id` foreign key — the database won't let you create a project for an organization that doesn't exist.

## The code

```python
class Project(Base):
    __tablename__ = "projects"

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,                              # 🔑 my own ID
        default=uuid.uuid4,
    )
    name: Mapped[str] = mapped_column(String(100))
    description: Mapped[str | None] = mapped_column(Text, default=None)

    org_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("organizations.id")                 # 🔗 points to organizations table
    )
```

## New concepts in this model

### `Text` vs `String(100)`

- `String(100)` — text with a **limit** (max 100 characters). Good for names, emails.
- `Text` — text with **no limit**. Good for descriptions, long content.

### `str | None`

Means this field is **optional**. A project can exist without a description.

```python
description: Mapped[str | None]    # can be text OR empty (None)
name: Mapped[str]                  # must always have a value
```

---

> *Part of QA Buddy learning notes. Updated: April 2026.*
