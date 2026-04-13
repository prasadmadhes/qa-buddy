# /save-notes

Save everything learned in this conversation as a polished Markdown study note in the `docs/` folder.

---

## Step 1 — Identify the topic

Look back through the entire conversation and identify:
- What was the **main topic** being learned?
- What **subtopics** were covered?
- What **analogies or explanations** clicked for the user?
- What **mistakes or confusions** came up and got resolved?

---

## Step 2 — Find the right docs folder

The `docs/` folder is structured by topic area:

```
docs/
├── 01-fundamentals/        → FastAPI basics, routes, middleware, general concepts
├── 02-database-models/     → SQLAlchemy models, how to write them
├── 03-schemas/             → Pydantic schemas, request/response types
├── 04-decisions/           → Architecture decisions, why we chose X over Y
├── 05-database-setup/      → PostgreSQL setup, connections, migrations, Alembic
```

Pick the folder that best matches the topic. If the topic spans multiple folders, pick the primary one.

---

## Step 3 — Pick the correct file number prefix

List the existing files in the chosen folder and continue the numbering sequence.

For example:
- If `05-database-setup/` has `5.1-terminal-vs-gui.md` and `5.2-postgresql-setup-and-connection.md`
- The next file should be `5.3-your-topic-here.md`

Folder prefix mapping:
- `01-fundamentals/` → prefix `1.X`
- `02-database-models/` → prefix `2.X`
- `03-schemas/` → prefix `3.X`
- `04-decisions/` → prefix `4.X`
- `05-database-setup/` → prefix `5.X`

---

## Step 4 — Write the note

Follow this exact format used across all existing notes:

```markdown
# Topic Title

> One line summary of what this note covers.

---

## Section heading

Explanation in plain English. Write like you're explaining to a complete beginner.

### Subsection (if needed)

Use analogies wherever possible — they are the most important teaching tool.

> **Analogy:** Explain it like...

---

## Code examples

Always include real code with language identifiers:

```python
# example
```

---

## Comparison tables

Use tables for side-by-side comparisons:

| Option A | Option B |
|---|---|
| ... | ... |

---

## Common confusions

If any confusion came up in the conversation, document it:

### ❌ Common misconception
Explain the wrong assumption.

### ✅ What's actually true
Explain the correct understanding.

---

> *Part of QA Buddy learning notes. Updated: [Month Year].*
```

---

## Step 5 — Quality checklist before saving

- [ ] Title clearly describes the topic
- [ ] Written in plain English a beginner can understand
- [ ] Every concept has an analogy or real-world example
- [ ] Code blocks have language identifiers (` ```python `, ` ```bash `, ` ```sql `)
- [ ] Confusions from the conversation are documented and resolved
- [ ] File is named correctly with the right number prefix
- [ ] Saved in the correct `docs/` subfolder
- [ ] Footer includes `*Part of QA Buddy learning notes. Updated: [Month Year].*`

---

## Important rules

- **Do not summarise** — write full explanations, not bullet point summaries
- **Keep the user's voice** — if they understood something via a specific analogy, use that exact analogy
- **Document the confusion** — if the user was confused about X before understanding it, include that as a "Common misconception" section — it's the most valuable part
- **One topic per file** — if multiple distinct topics were covered, create multiple files
- **No fluff** — every sentence should teach something
