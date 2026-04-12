# Model = Table

> What "model" actually means in our project.

---

## The short answer

**Model = Table.** That's it.

When we say "User model," we mean the "users table" in the database. SQLAlchemy uses the word "model" because it's a Python **representation** of a database table.

```
In Python code              In the database
──────────────              ──────────────
User model            →     users table
Organization model    →     organizations table
Membership model      →     memberships table
```

## Why not just call it "table"?

Because the Python class does more than just define a table. It also:

- Knows how to **create rows** → `User(name="Prasad")`
- Knows how to **read rows** → query the database
- Knows how to **update/delete rows**
- Has **relationships** to other tables

So it's a "model" of the table — a smart version that can do things, not just a static structure.

## How to think about it

Whenever you see the word "model" in our codebase:

```python
class User(Base):           # "User model" = "users table"
    __tablename__ = "users"
    id = ...
    name = ...
```

Just think: **this defines a table and how to interact with it.**
