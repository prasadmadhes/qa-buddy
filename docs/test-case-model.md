# TestCase Model

> The core of QA Buddy — an actual test case with steps, priority, and review status.

---

## Why do we need it?

This is the whole point of the app. Everything else (organizations, projects, suites, folders) exists to **organize test cases**.

```
Authentication Tests (suite)
└── Login (folder)
    └── Test Case: "User can login with valid email and password"
        ├── Priority: High
        ├── Category: Smoke
        ├── Steps: 1. Go to login page  2. Enter email  3. Click submit
        ├── Expected Result: User sees dashboard
        └── Status: approved
```

## What it looks like in the database

```
Test Cases
┌────────┬──────────────────┬──────────┬──────────┬──────────┬──────────┬────────┐
│ id  🔑 │ title            │ suite_id 🔗│folder_id🔗│ priority │ category │ status │
├────────┼──────────────────┼──────────┼──────────┼──────────┼──────────┼────────┤
│ tc1    │ Login with email │ s1       │ f2       │ high     │ smoke    │approved│
│ tc2    │ Login fails      │ s1       │ f2       │ medium   │ negative │pending │
└────────┴──────────────────┴──────────┴──────────┴──────────┴──────────┴────────┘
```

## How it connects

```
Organization → Project → Suite → Folder → Test Case
                                              ↑
                                           we are here
```

- `suite_id` 🔗 — required. Every test case belongs to a suite.
- `folder_id` 🔗 — optional. A test case can be directly in a suite without a folder.

## All the columns explained

| Column | Type | Required? | What it is |
|--------|------|-----------|------------|
| `id` | UUID | auto | Unique ID |
| `title` | String(255) | yes | Short name: "User can login with email" |
| `objective` | Text | no | What this test is trying to verify |
| `preconditions` | Text | no | What must be true before running this test |
| `steps` | Text | no | Step-by-step instructions |
| `expected_result` | Text | no | What should happen if the test passes |
| `priority` | Enum | yes | critical / high / medium / low |
| `category` | Enum | yes | smoke / functional / regression / etc. |
| `status` | Enum | yes | draft / pending_review / approved / rejected |
| `tags` | Text | no | Extra labels, comma-separated |
| `source_reference` | String(500) | no | Where it came from (GitHub file, Jira ticket) |
| `suite_id` | Foreign Key | yes | Which suite it belongs to |
| `folder_id` | Foreign Key | no | Which folder it's in (optional) |

## New concept: Enum

Some columns can only have **specific values**. An Enum is a fixed list of allowed values — like a **dropdown menu**.

```python
class Priority(str, Enum):
    critical = "critical"
    high = "high"
    medium = "medium"
    low = "low"
```

You can only pick from these options. Setting priority to `"super important"` would be rejected.

### Why `(str, Enum)`?

- `Enum` — makes it a fixed list
- `str` — the values are strings (text)

Together: "a fixed list of string values."

### The three enums in TestCase

**Priority** — how important is this test?
```
critical → app crashes without this
high     → major feature affected
medium   → normal importance
low      → nice to have
```

**Category** — what type of test?
```
smoke        → basic "does it even work?" checks
functional   → does the feature work correctly?
regression   → make sure old stuff still works after changes
edge_case    → unusual scenarios
negative     → what happens when users do wrong things?
boundary     → testing limits (max characters, 0 items, etc.)
integration  → do different parts work together?
```

**Status** — where is this test case in the review process?
```
draft          → just created, not ready
pending_review → AI generated it, human needs to check
approved       → human said "yes, this is good"
rejected       → human said "no, this is bad"
```

---

> *Part of QA Buddy learning notes. Updated: April 2026.*
