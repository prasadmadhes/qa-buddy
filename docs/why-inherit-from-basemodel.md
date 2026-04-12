# Why Inherit from BaseModel?

> What inheritance gives you — validation powers.

---

## Without BaseModel — a regular class

```python
class UserCreate:
    name: str
    age: int

user = UserCreate()
user.name = 123          # No error. Python doesn't care.
user.age = "hello"       # No error. Python doesn't care.
```

Python sees `name: str` as just a **hint** — a suggestion, not a rule. It doesn't enforce anything.

## With BaseModel — validation kicks in

```python
from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    age: int

user = UserCreate(name=123, age="hello")
# ❌ ValidationError! name must be str, age must be int
```

By writing `(BaseModel)`, your class **inherits** all of Pydantic's powers:

| Power | What it does |
|-------|-------------|
| **Validation** | Checks every field's type automatically |
| **Coercion** | Converts `"25"` → `25` when it makes sense |
| **Error messages** | Tells you exactly what's wrong |
| **JSON support** | Can convert to/from JSON automatically |
| **Required fields** | Forces you to provide all fields |

All of this comes **free** just by adding `(BaseModel)`.

## The plug analogy

```
Regular class              = a device with no plug
class UserCreate:            (exists but has no power)

BaseModel class            = a device plugged into the wall
class UserCreate(BaseModel):  (now it has validation power)
```

## Same idea across our project

| You write | You get |
|-----------|---------|
| `class User(Base):` | Database powers (create tables, read/write rows) |
| `class UserCreate(BaseModel):` | Validation powers (check data, reject bad data) |

Inheriting from a parent class = plugging into its powers.
