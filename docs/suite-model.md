# Suite Model

> A group of related test cases inside a project.

---

## Why do we need it?

A project can have hundreds of test cases. Without suites, they'd all be in one big list. Suites let you **group related tests together**.

```
Backend API (project)
├── Authentication Tests    (suite)
├── Payment Tests           (suite)
└── User Management Tests   (suite)
```

## What it looks like in the database

```
Suites
┌──────────┬─────────────────────┬──────────────┐
│ id    🔑 │ name                │ project_id 🔗│
├──────────┼─────────────────────┼──────────────┤
│ s1       │ Authentication Tests│ p1           │
│ s2       │ Payment Tests       │ p1           │
└──────────┴─────────────────────┴──────────────┘

🔑 = Primary Key
🔗 = Foreign Key (points to projects table)
```

## How it connects

```
Organization → Project → Suite → Folder → Test Case
                           ↑
                        we are here
```

A suite **belongs to** one project, just like a project belongs to one organization. Same pattern, same concept — a foreign key connecting child to parent.

## The code

```python
class Suite(Base):
    __tablename__ = "suites"

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,
    )
    name: Mapped[str] = mapped_column(String(100))
    description: Mapped[str | None] = mapped_column(Text, default=None)

    project_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("projects.id")                  # 🔗 belongs to a project
    )
```

## No new concepts

Same pattern as the Project model — name, optional description, and a foreign key pointing to its parent.

---

> *Part of QA Buddy learning notes. Updated: April 2026.*
