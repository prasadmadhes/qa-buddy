# Primary Key & Foreign Key

> How database tables identify themselves and connect to each other.

---

## Table of Contents

- [1. The Problem — Tables Need to Talk](#1-the-problem--tables-need-to-talk)
- [2. What is a Key?](#2-what-is-a-key)
- [3. What is a Primary Key?](#3-what-is-a-primary-key)
- [4. What is a Foreign Key?](#4-what-is-a-foreign-key)
- [5. Why is it Called "Foreign"?](#5-why-is-it-called-foreign)
- [6. Rules — How Many Keys Can a Table Have?](#6-rules--how-many-keys-can-a-table-have)
- [7. How to Tell the Database Which is Which](#7-how-to-tell-the-database-which-is-which)
- [8. What Does the Database Do With Foreign Keys?](#8-what-does-the-database-do-with-foreign-keys)

---

## 1. The Problem — Tables Need to Talk

We have separate tables that know nothing about each other:

```
Users                    Organizations
┌────────┬────────┐      ┌────────┬───────────┐
│ id     │ name   │      │ id     │ name      │
├────────┼────────┤      ├────────┼───────────┤
│ u1     │ Prasad │      │ org1   │ Acme Corp │
│ u2     │ Alice  │      │ org2   │ StartupX  │
└────────┴────────┘      └────────┴───────────┘
```

We need to say: **"Prasad belongs to Acme Corp."** How do we connect them?

That's where keys come in.

---

## 2. What is a Key?

A key is a column that has a **special job** — either identifying a row or connecting to another table.

Not every column is a key. `name`, `email`, `role` — those are just regular columns that store data. A key column has extra responsibilities.

---

## 3. What is a Primary Key?

Every table has an `id` column. This is the **Primary Key** — a unique ID for each row.

```
Users
┌────────┬────────┐
│ id  🔑 │ name   │    ← "id" is the Primary Key
├────────┼────────┤
│ u1     │ Prasad │    ← u1 is Prasad's unique ID
│ u2     │ Alice  │    ← u2 is Alice's unique ID
└────────┴────────┘
```

### Rules for Primary Key

- **One per table** — every table has exactly one
- **Unique** — no two rows can have the same value
- **Never empty** — every row must have one
- **Never changes** — once assigned, it stays forever

### Analogy

Think of it like your **Aadhaar number** or **passport number**. No two people have the same one. It identifies YOU specifically.

---

## 4. What is a Foreign Key?

In the Memberships table, we want to say "this membership belongs to Prasad." We do that by storing **Prasad's ID (u1)** in a column:

```
Memberships
┌─────────┬────────┐
│ user_id │ org_id │
├─────────┼────────┤
│ u1      │ org1   │
└─────────┴────────┘
```

**`user_id` is a Foreign Key.** It means:

> "This value is NOT my own ID. It's someone else's ID. It comes from the `users` table."

```
Primary Key = MY own ID              (I am u1)
Foreign Key = SOMEONE ELSE's ID      (I'm referencing u1 from another table)
```

---

## 5. Why is it Called "Foreign"?

Because the value is **foreign** — it belongs to another table, not this one.

```
Memberships table
┌─────────┬────────┐
│ user_id │ org_id │
├─────────┼────────┤
│ u1      │ org1   │
└─────────┴────────┘
  │          │
  │          └── "org1" is foreign — it lives in the Organizations table
  │
  └── "u1" is foreign — it lives in the Users table
```

The Memberships table doesn't own u1 or org1. It's **borrowing** those IDs from other tables.

---

## 6. Rules — How Many Keys Can a Table Have?

### Primary Keys: ONE per table

```
Users
┌────────┬────────┬─────────────────┐
│ id  🔑 │ name   │ email           │
└────────┴────────┴─────────────────┘

🔑 = Primary Key (only one)
```

Like your name badge at work — you only get one badge.

### Foreign Keys: AS MANY as you need

Each one points to a different table.

```
Memberships
┌────────┬───────────┬───────────┬─────────┐
│ id  🔑 │ user_id 🔗│ org_id  🔗│ role    │
└────────┴───────────┴───────────┴─────────┘

🔑 = Primary Key (one — this row's own ID)
🔗 = Foreign Key (two — pointing to other tables)
```

### Summary

| | Primary Key | Foreign Key |
|--|------------|-------------|
| **How many per table?** | One | As many as needed |
| **What it means** | "This is MY unique ID" | "This points to ANOTHER table's ID" |
| **Analogy** | Your passport number | Someone else's passport number written on a form |

---

## 7. How to Tell the Database Which is Which

The database doesn't guess. You have to be explicit in your code.

### Primary Key — say `primary_key=True`

```python
id: Mapped[uuid.UUID] = mapped_column(
    primary_key=True,       # ← "This is MY unique ID"
)
```

### Foreign Key — say `ForeignKey("table.column")`

```python
user_id: Mapped[uuid.UUID] = mapped_column(
    ForeignKey("users.id")          # ← "This points to the users table's id column"
)

org_id: Mapped[uuid.UUID] = mapped_column(
    ForeignKey("organizations.id")  # ← "This points to the organizations table's id column"
)
```

You specify exactly **which table** and **which column** you're pointing to.

### Full example — our Membership model

```python
class Membership(Base):
    __tablename__ = "memberships"

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,                          # 🔑 my own ID
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id")                     # 🔗 points to users table
    )
    org_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("organizations.id")             # 🔗 points to organizations table
    )
    role: Mapped[str] = mapped_column(String(20))  # just a normal column
```

---

## 8. What Does the Database Do With Foreign Keys?

It **protects** you from mistakes.

### The school register analogy

**Students list** (like Users table):
```
┌────────────┬─────────┐
│ Roll No 🔑 │ Name    │
├────────────┼─────────┤
│ 101        │ Prasad  │
│ 102        │ Alice   │
└────────────┴─────────┘
```

**Enrollment register** (like Memberships table):
```
┌──────────────┬──────────┐
│ Roll No   🔗 │ Class ID │
├──────────────┼──────────┤
│ 101          │ A        │   ← Prasad in Science ✅ (101 exists)
│ 102          │ A        │   ← Alice in Science ✅ (102 exists)
│ 999          │ B        │   ← ❌ REJECTED! 999 doesn't exist
└──────────────┴──────────┘
```

The database says: **"You can't reference a student that doesn't exist."**

This prevents broken connections. You can't say "Prasad belongs to org99" if org99 doesn't exist in the organizations table.

---

> *Part of QA Buddy learning notes. Updated: April 2026.*
