# Why BaseModel, not BaseSchema?

> Pydantic's naming choice explained.

---

## Breaking down the name

- **Base** → parent class, the starting point others build on
- **Model** → a representation of something real

`BaseModel` = "the base class for all your data representations."

## Why didn't Pydantic call it BaseSchema?

Because Pydantic isn't only for APIs. People use it for many things:

```python
# API data validation (we call these "schemas")
class UserCreate(BaseModel):
    name: str

# App configuration
class AppSettings(BaseModel):
    debug: bool
    port: int

# Parsing a CSV row
class CSVRow(BaseModel):
    product: str
    price: float

# Validating environment variables
class EnvConfig(BaseModel):
    database_url: str
    secret_key: str
```

If they called it `BaseSchema`, it would imply it's only for API schemas. But Pydantic is a **general-purpose data validation tool**. The word "model" is broader — it means "a model of what the data should look like."

## The unfortunate overlap

The problem is SQLAlchemy ALSO uses the word "model":

```
Pydantic's BaseModel   → "model" = shape of data (validation)
SQLAlchemy's Base       → "model" = shape of a table (database)
```

Two libraries, same word, different meaning. That's just how it is.

## What we do about it

In our project, we call them differently to stay sane:

```
SQLAlchemy class (User, Organization)       → "model"
Pydantic class (UserCreate, UserResponse)   → "schema"
```

The code says `BaseModel`, but we say "schema" in conversation.
