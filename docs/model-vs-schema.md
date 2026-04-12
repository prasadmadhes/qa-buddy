# Model vs Schema

> Two words that mean different things in different libraries.

---

## The problem

Both SQLAlchemy and Pydantic use the word "model." This is confusing.

```python
# SQLAlchemy — calls this a "model"
class User(Base):
    __tablename__ = "users"
    id = mapped_column(UUID, primary_key=True)
    name = mapped_column(String)

# Pydantic — also calls this a "model" (BaseModel)
class UserCreate(BaseModel):
    name: str
```

Two different things, same word.

## Our rule: Model vs Schema

To avoid confusion, we use different words:

| Term | Library | What it does | Example |
|------|---------|-------------|---------|
| **Model** | SQLAlchemy | Defines a database table | `User`, `Organization` |
| **Schema** | Pydantic | Validates data shape | `UserCreate`, `UserResponse` |

## How to remember

```
Model  → talks to the DATABASE     (stores data)
Schema → talks to the OUTSIDE WORLD (checks data)
```

## In conversation

- "The User model" → the database table
- "The UserCreate schema" → the validation shape for creating a user
- "The UserResponse schema" → the shape of data we send back to the user

Even though the code says `class UserCreate(BaseModel)`, we **call it a schema** when talking about it. This keeps things clear.
