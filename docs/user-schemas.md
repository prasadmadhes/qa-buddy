# User Schemas

> Controls what data comes in and goes out for users.

---

## The 3 schemas

```
Signup form                Database stores           API sends back
───────────                ───────────────           ──────────────
name                       id                        id
email           →          name              →       name
password                   email                     email
                           password_hash             (no password!)
                           created_at
                           updated_at

UserCreate                 User (model)              UserResponse
```

---

## UserCreate — signup form

```python
class UserCreate(BaseModel):
    name: str
    email: EmailStr     # must be a valid email format
    password: str       # raw password — we hash it before saving
```

**Example request:**
```json
{ "name": "Prasad", "email": "prasad@mail.com", "password": "secret123" }
```

**What EmailStr does:**
```
"prasad@mail.com"  ✅ accepted
"not-an-email"     ❌ rejected automatically
"missing@"         ❌ rejected automatically
```

---

## UserUpdate — edit profile

```python
class UserUpdate(BaseModel):
    name: str | None = None     # optional — only update if provided
```

All fields are optional. User only sends what they want to change.

**Example request:**
```json
{ "name": "Prasad M" }    ← only changing the name
```

---

## UserResponse — what the API sends back

```python
class UserResponse(BaseModel):
    id: uuid.UUID
    name: str
    email: str
    # NO password_hash — never expose this!

    class Config:
        from_attributes = True
```

**Example response:**
```json
{ "id": "a1b2-c3d4-...", "name": "Prasad", "email": "prasad@mail.com" }
```

---

## New concept: `from_attributes = True`

Your database gives back a **SQLAlchemy model object**. But `UserResponse` is a **Pydantic schema**. They're different things.

```
Database returns:   User(id=..., name="Prasad", email="prasad@mail.com", password_hash="$2b$...")
We want to return:  UserResponse(id=..., name="Prasad", email="prasad@mail.com")
```

`from_attributes = True` tells Pydantic: "You can read data directly from a SQLAlchemy object's attributes."

Without it:
```python
UserResponse(user)    # ❌ Error — Pydantic doesn't know how to read SQLAlchemy objects
```

With it:
```python
UserResponse.model_validate(user)    # ✅ Reads id, name, email from the User object
```

---

## New concept: `EmailStr`

A special Pydantic type that validates email format automatically.

```python
from pydantic import EmailStr

email: EmailStr    # validates it's a real email
```

Requires the `email-validator` package:
```bash
pip install email-validator
```

---

> *Part of QA Buddy learning notes. Updated: April 2026.*
