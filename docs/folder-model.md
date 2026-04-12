# Folder Model

> Organizes test cases within a suite. Can be nested inside other folders.

---

## Why do we need it?

A suite can have many test cases. Folders let you organize them into subgroups.

```
Authentication Tests (suite)
├── Login                 (folder)
│   ├── Email Login       (folder inside a folder!)
│   └── Google Login      (folder inside a folder!)
├── Signup                (folder)
└── Password Reset        (folder)
```

## What it looks like in the database

```
Folders
┌────────┬────────────────┬──────────┬───────────┐
│ id  🔑 │ name           │ suite_id 🔗│ parent_id 🔗│
├────────┼────────────────┼──────────┼───────────┤
│ f1     │ Login          │ s1       │ NULL      │  ← top level, no parent
│ f2     │ Email Login    │ s1       │ f1        │  ← inside "Login"
│ f3     │ Google Login   │ s1       │ f1        │  ← inside "Login"
│ f4     │ Signup         │ s1       │ NULL      │  ← top level
└────────┴────────────────┴──────────┴───────────┘
```

## How it connects

```
Organization → Project → Suite → Folder → Test Case
                                   ↑
                                we are here
```

## New concept: Self-referencing Foreign Key

So far, foreign keys always pointed to **another** table. But `parent_id` points to **the same table** (folders).

```
Folders table
┌────────┬──────────────┬───────────┐
│ id  🔑 │ name         │ parent_id 🔗│
├────────┼──────────────┼───────────┤
│ f1     │ Login        │ NULL      │
│ f2     │ Email Login  │ f1        │ ← "my parent is f1"
└────────┴──────────────┴───────────┘
        ↑                    │
        └────────────────────┘
        points back to its own table!
```

### Family tree analogy

Every person has a parent. The parent is also a person. Same table, pointing to itself.

```
NULL (no parent)
└── Login (f1)
    ├── Email Login (f2)    ← parent_id = f1
    └── Google Login (f3)   ← parent_id = f1
```

### How to read parent_id

- `parent_id = NULL` → top-level folder (no parent)
- `parent_id = f1` → this folder is **inside** folder f1

### Why `uuid.UUID | None`?

Because top-level folders have **no parent**. The `| None` means this field is optional — it can be empty (NULL).

```python
# Top-level folder — no parent
Folder(name="Login", suite_id=s1, parent_id=None)

# Nested folder — inside "Login"
Folder(name="Email Login", suite_id=s1, parent_id=f1)
```

## The code

```python
class Folder(Base):
    __tablename__ = "folders"

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,                                  # 🔑 my own ID
        default=uuid.uuid4,
    )
    name: Mapped[str] = mapped_column(String(100))

    suite_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("suites.id")                            # 🔗 belongs to a suite
    )

    parent_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("folders.id"), default=None             # 🔗 points to itself (nesting)
    )
```

---

> *Part of QA Buddy learning notes. Updated: April 2026.*
