# Why Do We Need Pydantic Schemas?

> Schemas control what data comes IN and what data goes OUT of your API.

---

## The problem without schemas

Imagine you have no schemas. Someone calls your API to create a user:

### Request 1 — normal user
```json
{ "name": "Prasad", "email": "prasad@mail.com", "password": "secret123" }
```

### Request 2 — someone being silly
```json
{ "name": 12345, "email": "not-an-email", "password": "" }
```

### Request 3 — someone trying to hack
```json
{ "name": "Prasad", "email": "prasad@mail.com", "password": "secret", "is_admin": true }
```

Without schemas, **all 3 requests reach your database**. Now you have:
- A user with a number as a name
- An invalid email stored
- Someone who made themselves admin

---

## With schemas — protection at the door

The schema sits at the door and checks every request before it touches the database:

```
Request comes in
      │
      ▼
Schema checks:
  ✅ Is name a string?
  ✅ Is email a valid email format?
  ✅ Is password at least 8 characters?
  ❌ Is there an is_admin field? → REJECTED (we don't accept this field)
      │
      ▼
Only clean, valid data reaches your database
```

---

## The 3 specific reasons

### Reason 1: Validation

```python
class UserCreate(BaseModel):
    name: str
    email: EmailStr        # must be a valid email format — "not-an-email" rejected
    password: str          # must be a string — 12345 rejected
```

Pydantic checks every field automatically. You write zero validation logic yourself.

### Reason 2: Control what comes IN

```python
class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    # is_admin is NOT here
    # even if someone sends is_admin=true, it gets ignored completely
```

Any field not listed in the schema is **silently ignored**. Attackers can't inject extra fields.

### Reason 3: Control what goes OUT

```python
class UserResponse(BaseModel):
    id: UUID
    name: str
    email: str
    # password_hash is NOT here — so it NEVER gets sent back
```

Your database has a `password_hash` column. Without `UserResponse`, you might accidentally send it back:

```json
{
  "id": "a1b2...",
  "name": "Prasad",
  "email": "prasad@mail.com",
  "password_hash": "$2b$12$..."    ← SECURITY RISK!
}
```

With `UserResponse`, only what you explicitly list gets sent back. Nothing else leaks out.

---

## The 3 schemas for every model

For every database model, we create 3 schemas:

```
UserCreate    ← what the user sends (signup form)
UserUpdate    ← what the user sends when editing
UserResponse  ← what the API sends back (no sensitive fields)
```

| Schema | Direction | Controls |
|--------|-----------|---------|
| `UserCreate` | Incoming | What we accept when creating |
| `UserUpdate` | Incoming | What we accept when editing |
| `UserResponse` | Outgoing | What we send back to the user |

---

## One line summary

```
Schemas = control what data comes IN and what goes OUT
          protect your database     protect your users
```

---

> *Part of QA Buddy learning notes. Updated: April 2026.*
