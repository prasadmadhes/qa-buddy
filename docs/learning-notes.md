# QA Buddy — Learning Notes

> Everything I learned while building QA Buddy, explained in simple terms.

---

## Table of Contents

- [1. Monorepo vs Microservices](#1-monorepo-vs-microservices)
- [2. Routes — The Menu of Your API](#2-routes--the-menu-of-your-api)
- [3. Middleware — The Security Guard](#3-middleware--the-security-guard)
- [4. SQLAlchemy — Talking to the Database](#4-sqlalchemy--talking-to-the-database)
- [5. Pydantic — The Data Bouncer](#5-pydantic--the-data-bouncer)
- [6. Base vs BaseModel](#6-base-vs-basemodel)
- [7. Why Three Classes for One Thing?](#7-why-three-classes-for-one-thing)
- [8. SQLModel — The Shortcut (and why we didn't use it)](#8-sqlmodel--the-shortcut-and-why-we-didnt-use-it)
- [9. Organizations & Memberships](#9-organizations--memberships)
- [10. Many-to-Many Relationships](#10-many-to-many-relationships)

---

## 1. Monorepo vs Microservices

### Monorepo

All your code lives in **one repository**, organized into folders.

```
qa-buddy/
├── apps/api/        ← Backend
├── apps/worker/     ← Background jobs
├── apps/portal/     ← Frontend
└── packages/core/   ← Shared code
```

**Pros:** Simple, fast iteration, shared code is easy.
**Best for:** Small teams, early-stage projects.

### Microservices

Each part of the app is a **separate repository** with its own deployment.

**Pros:** Teams can work independently, services scale independently.
**Best for:** Large teams, high-scale apps.

### Our choice

**Monorepo.** We get the logical separation of microservices (each app in its own folder) without the operational overhead. We can always split later if needed.

---

## 2. Routes — The Menu of Your API

Think of your API as a **restaurant**. A route is an item on the menu.

When someone visits a URL, your app needs to know: *"What should I do?"*

A **route** connects a URL to a Python function:

```python
@app.get("/health")        # ← the route: "when someone visits /health..."
def health():              # ← ...run this function
    return {"status": "ok"}
```

### Common route patterns

| URL                  | Method   | What it does            |
|----------------------|----------|-------------------------|
| `GET /projects`      | GET      | List all projects       |
| `POST /projects`     | POST     | Create a new project    |
| `GET /projects/123`  | GET      | Get project #123        |
| `PUT /projects/123`  | PUT      | Update project #123     |
| `DELETE /projects/123`| DELETE  | Delete project #123     |

### Why a `routes/` folder?

Instead of cramming everything into `main.py`, we organize routes by topic:

```
routes/
├── projects.py      ← all project routes
├── test_cases.py    ← all test case routes
└── users.py         ← all user routes
```

> **Note:** In other frameworks, routes are called "controllers" (Spring Boot) or "views" (Django). Same thing, different names.

---

## 3. Middleware — The Security Guard

Middleware runs **before every request** reaches your route.

Think of it as the **front door security guard** at the restaurant:

```
User sends request → Middleware (checks auth) → Route (does the work) → Response
```

It can:
1. **Check** something — is the user logged in?
2. **Block** the request — nope, go away (401 Unauthorized)
3. **Let it through** — looks good, carry on

### Example flow

```
GET /projects
   │
   ▼
Middleware: "Do you have a valid login token?"
   │
   ├── NO  → 401 Unauthorized (route never runs)
   │
   └── YES → Route runs → returns list of projects
```

---

## 4. SQLAlchemy — Talking to the Database

### What is a database?

Like a **spreadsheet**. Your app stores data (users, projects, test cases) in tables with rows and columns.

### What is SQLAlchemy?

A **translator** between Python and the database. Instead of writing raw SQL, you write Python.

### Key pieces

| Tool           | What it does                              | Analogy                          |
|----------------|-------------------------------------------|----------------------------------|
| **SQLAlchemy** | Talk to the database using Python         | Translator                       |
| **asyncpg**    | The driver connecting Python to PostgreSQL| USB cable between two devices    |
| **Alembic**    | Tracks database structure changes         | Git, but for your database       |

### A database model

A model defines the **shape of a table** — like designing column headers in a spreadsheet.

```python
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    email: Mapped[str] = mapped_column(String(255), unique=True)
```

This creates:

```
users table
┌──────────────────┬────────┬─────────────────┐
│ id (UUID)        │ name   │ email           │
├──────────────────┼────────┼─────────────────┤
│ a1b2-c3d4-...    │ Prasad │ prasad@mail.com │
└──────────────────┴────────┴─────────────────┘
```

### What each term means

| Term              | Meaning                                                       |
|-------------------|---------------------------------------------------------------|
| `Base`            | Parent class — tells SQLAlchemy "this is a database table"    |
| `__tablename__`   | The actual table name in PostgreSQL                           |
| `mapped_column`   | "This is a column in the table"                               |
| `primary_key`     | Uniquely identifies each row (no duplicates)                  |
| `unique=True`     | No two rows can have the same value in this column            |
| `String(100)`     | Text column, max 100 characters                               |

---

## 5. Pydantic — The Data Bouncer

Pydantic **validates data**. It checks that incoming data matches the shape you defined.

### Basic example

```python
from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    age: int
```

### Good data — works

```python
user = UserCreate(name="Prasad", age=25)
print(user.name)   # Prasad
print(user.age)    # 25
```

### Bad data — rejected automatically

```python
UserCreate(name="Prasad", age="hello")
# ❌ ValidationError: age — value is not a valid integer
```

### Missing data — caught automatically

```python
UserCreate(name="Prasad")
# ❌ ValidationError: age — field required
```

### Optional fields

```python
class UserCreate(BaseModel):
    name: str
    age: int | None = None    # optional, defaults to None

UserCreate(name="Prasad")            # ✅ age is None
UserCreate(name="Prasad", age=25)    # ✅ age is 25
```

### Automatic type conversion (coercion)

Pydantic tries to convert data to the correct type when it makes sense:

```python
data = {"name": "Prasad", "age": "25"}
user = UserCreate(**data)
print(user.age)        # 25 (converted from string to integer!)
print(type(user.age))  # <class 'int'>
```

But only when it makes sense:

```python
UserCreate(name="Prasad", age="hello")   # ❌ can't convert "hello" to int
UserCreate(name="Prasad", age="25")      # ✅ "25" → 25
UserCreate(name="Prasad", age=25.0)      # ✅ 25.0 → 25
```

### Strict mode (no auto-conversion)

```python
from pydantic import BaseModel, ConfigDict

class UserCreate(BaseModel):
    model_config = ConfigDict(strict=True)
    name: str
    age: int

UserCreate(name="Prasad", age="25")   # ❌ Rejected! "25" is not an int
UserCreate(name="Prasad", age=25)     # ✅ Only real int works
```

### How FastAPI uses Pydantic automatically

```python
@app.post("/users")
def create_user(user: UserCreate):    # FastAPI sees the Pydantic model
    return {"message": f"Created {user.name}"}
```

When someone sends `POST /users` with `{"name": "Prasad", "age": 25}`:

1. FastAPI takes the JSON
2. Passes it to Pydantic for validation
3. If valid → your function runs
4. If invalid → FastAPI returns an error automatically

**You never write validation code yourself.**

---

## 6. Base vs BaseModel

They sound similar but do completely different jobs.

### BaseModel (from Pydantic)

**Job:** Check that the data looks right. Like a bouncer checking your ID.

```python
from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
```

No database involved. Just validation.

### Base (from SQLAlchemy)

**Job:** This class is a database table. Actually stores data.

```python
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"
    id = mapped_column(UUID, primary_key=True)
    name = mapped_column(String)
```

### Side by side

| | BaseModel (Pydantic) | Base (SQLAlchemy) |
|--|---------------------|-------------------|
| **Job** | Validates data | Stores data |
| **Talks to** | The outside world (API) | The database |
| **Analogy** | Bouncer checking IDs | Filing cabinet storing records |
| **Question it answers** | "Is this data correct?" | "Save this to the database" |

### They work together

```
User sends JSON → BaseModel checks it → Base saves it to database
                  (is it valid?)         (store it permanently)
```

---

## 7. Why Three Classes for One Thing?

Same person, same data — but **different shapes at different moments**.

### Analogy: Joining a gym

**Step 1 — You fill out the form** (only your name)

```
┌─────────────────┐
│ Name: Prasad     │
└─────────────────┘
```

```python
class UserCreate(BaseModel):    # what the user sends
    name: str
```

**Step 2 — The gym saves your info** (adds ID + date automatically)

```
┌──────────────────────────────────────┐
│ Member ID:   00042                    │
│ Name:        Prasad                   │
│ Joined:      March 26, 2026          │
└──────────────────────────────────────┘
```

```python
class User(Base):               # what the database stores
    id = ...                    # auto-generated
    name = ...                  # you typed this
    created_at = ...            # computer added this
```

**Step 3 — The gym gives you a card** (just the useful info)

```
┌──────────────────────────────────────┐
│ Member ID:   00042                    │
│ Name:        Prasad                   │
└──────────────────────────────────────┘
```

```python
class UserResponse(BaseModel):  # what the API sends back
    id: UUID
    name: str
    # no created_at — internal info
```

### The full picture

```
What you give us   →   What we store    →   What we show you
─────────────────      ──────────────       ─────────────────
name                   id                   id
                       name                 name
                       created_at

UserCreate             User (model)         UserResponse
(Pydantic)             (SQLAlchemy)         (Pydantic)
```

---

## 8. SQLModel — The Shortcut (and why we didn't use it)

SQLModel combines SQLAlchemy + Pydantic into one class:

```python
# SQLModel — one class does both
class User(SQLModel, table=True):
    id: UUID = Field(primary_key=True)
    name: str
```

### Why we chose SQLAlchemy + Pydantic instead

| Concern              | SQLAlchemy + Pydantic | SQLModel         |
|----------------------|-----------------------|------------------|
| **Maturity**         | 15+ years             | Newer            |
| **Learning resources** | Tons                | Much fewer       |
| **Async support**    | Full                  | Can be finicky   |
| **Industry usage**   | Most companies        | Less common      |
| **Flexibility**      | Full control          | Some limitations |

SQLModel is simpler but doesn't scale as well for complex apps.

---

## 9. Organizations & Memberships

### The structure

```
User (individual account)
  │
  └── belongs to → Organization (via Membership)
                     │
                     └── has many → Projects
                                     └── Suites → Folders → Test Cases
```

### Three tables needed

**Users** — individual accounts

```
┌────────┬────────┬─────────────────┐
│ id     │ name   │ email           │
├────────┼────────┼─────────────────┤
│ u1     │ Prasad │ prasad@mail.com │
│ u2     │ Alice  │ alice@mail.com  │
└────────┴────────┴─────────────────┘
```

**Organizations** — teams/companies

```
┌────────┬────────────────────┐
│ id     │ name               │
├────────┼────────────────────┤
│ org1   │ Prasad's Workspace │
│ org2   │ Acme Corp          │
└────────┴────────────────────┘
```

**Memberships** — who belongs to which org, and their role

```
┌─────────┬────────┬─────────┐
│ user_id │ org_id │ role    │
├─────────┼────────┼─────────┤
│ u1      │ org1   │ owner   │  ← Prasad owns his workspace
│ u1      │ org2   │ member  │  ← Prasad also in Acme Corp
│ u2      │ org2   │ admin   │  ← Alice is admin at Acme Corp
└─────────┴────────┴─────────┘
```

### Signup flow

When someone signs up, we auto-create a personal organization for them:

```
Prasad signs up
  └── Auto-created: "Prasad's Workspace" (org)
        └── Can start creating projects right away
        └── Can invite teammates later
```

No extra "create org" step. Less friction.

---

## 10. Many-to-Many Relationships

### The problem

- One user can be in **many** organizations
- One organization can have **many** users

Where do you store this connection?

### Why not a list inside the Organization table?

```
Organizations
┌────────┬───────────┬──────────────────────┐
│ id     │ name      │ users                │
├────────┼───────────┼──────────────────────┤
│ org1   │ Acme Corp │ [Prasad, Alice, Bob] │
└────────┴───────────┴──────────────────────┘
```

This breaks because:

1. **Where does the role go?** Prasad is owner, Alice is admin, Bob is member — can't store that in a list
2. **Databases don't do lists well.** Each cell should hold one value, not an array
3. **Searching is slow.** "Find all orgs Alice belongs to" means searching inside every row's list
4. **Updating is painful.** Remove Bob? Read the whole list, remove him, save the whole list back

### The solution: a table in the middle

```
Memberships
┌─────────┬────────┬─────────┐
│ user_id │ org_id │ role    │
├─────────┼────────┼─────────┤
│ u1      │ org1   │ owner   │
│ u2      │ org1   │ admin   │
│ u3      │ org1   │ member  │
└─────────┴────────┴─────────┘
```

Now everything is easy:

| Question                       | How to find it                        |
|--------------------------------|---------------------------------------|
| All members of Acme Corp?      | Find rows where `org_id = org1`       |
| All orgs Prasad belongs to?    | Find rows where `user_id = u1`        |
| Remove Bob?                    | Delete one row                        |
| What's Alice's role?           | One lookup                            |
| Count members?                 | Count rows                            |

### Analogy: School ID cards

You wouldn't write on each classroom door: `Room 101: [Prasad, Alice, Bob, ...]`

Instead, every student has an **ID card** that says which class they're in:

```
Prasad → Room 101, Student
Alice  → Room 101, Class Rep
Bob    → Room 102, Student
```

That ID card = the **membership table**.

---

> *These notes were created while building QA Buddy. Updated: April 2026.*
