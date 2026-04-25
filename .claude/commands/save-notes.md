# /save-notes

Save everything learned in this conversation as one or more comprehensive Markdown study notes in the `docs/` folder.

**The cardinal rule:** every saved note must be a **superset** of what was taught in chat — never a summary. Every analogy, diagram, table, example, walkthrough, edge case, and clarification that came up in the conversation must appear in the note. If you taught it in chat, it goes in the note. **If you summarize, you have failed this command.**

---

## Step 0 — Detect topic scope and CONFIRM with the user

This is the first and most important step. **Do not write anything yet.**

A long conversation may cover many topics. The command must:

### 0a. Scroll the ENTIRE conversation, not just recent messages

Never default to "the most recent thing discussed." Earlier teaching is just as important — and easier to lose. Scan from the start of the conversation forward.

### 0b. List every distinct topic covered

Identify each substantive topic that was taught. Examples of distinct topics:

- "PATCH endpoint partial-update mechanics"
- "validation vs coercion in Pydantic"
- "Path parameter coercion via type annotations"
- "HTTPException vs other exceptions"

A topic is "substantive" if at least one back-and-forth exchange went deep on it (multiple paragraphs of teaching, examples, or analogies). Trivial side-comments don't count as topics.

### 0c. Cross-reference with existing docs

For each detected topic, check `docs/README.md` and the relevant subfolder. Is this topic already documented? Examples:

- Topic: "validation vs coercion" → already saved as `3.13-validation-vs-coercion.md` → skip (or propose extending if new ground was covered)
- Topic: "commands vs skills decision" → not yet documented → propose new note

### 0d. Honor user-specified scope

Check how the user invoked the command:

- `/save-notes` (no args) → consider all detected topics
- `/save-notes <topic hint>` → focus on just that topic; ignore others
  - Examples: `/save-notes commands vs skills`, `/save-notes patch endpoint`

If the user gave a hint, save only that topic. If no hint, propose all candidates and let the user choose.

### 0e. Same concept across multiple chats → ONE merged note

If the user had 3 different exchanges about the same concept (e.g., kept asking follow-up questions about PATCH over the course of the conversation), **merge them into one comprehensive note**. Don't fragment by chat boundary.

### 0f. Different concepts → SEPARATE notes

If multiple distinct concepts were taught (e.g., PATCH semantics + status codes + path params), create **one note per concept**. Cross-link them in each note's "Related notes" section.

### 0g. Show the user a plan and confirm

Before writing anything, present a clear plan:

```
Detected N topics in this conversation:
1. Topic A — [already saved at X | new — propose: docs/SECTION/X.Y-name.md]
2. Topic B — [already saved at X | new — propose: docs/SECTION/X.Y-name.md]
3. Topic C — [...]

I plan to save: [list]
I plan to skip: [list with reason]

Proceed? Or refine scope?
```

**Wait for the user's confirmation before writing.** They may say "yes," "only #2 and #3," "skip #1, it's already saved," "extend the existing #1 note instead," etc.

This single confirmation step prevents three failure modes:

1. **Lost earlier teaching** — by listing everything detected, you surface topics the user might have forgotten about
2. **Duplicate notes** — by checking existing docs first, you avoid re-saving
3. **Bundled unrelated topics** — by separating into distinct notes, each topic gets its own focused file

---

## Step 1 — Identify the topic and inventory the teaching

Before writing anything, scroll back through the entire conversation and **list out**:

- What was the **main topic** being learned?
- What **subtopics** were covered?
- Every **analogy** used (paper form, postal address, recipe book, airline clerk, cookie cutter, etc.)
- Every **diagram or ASCII art** drawn in chat
- Every **comparison table** shown
- Every **code example** written
- Every **walkthrough or scenario** traced (e.g., "what happens when the client sends X")
- Every **edge case** discussed
- Every **mistake or confusion** the user expressed and how it was resolved
- Every **tangent that helped** explain (e.g., "this is also how Django works")
- Any **commands or experiments** the user can run themselves

This list is your **content inventory**. The note must include every item on it.

If you can't recall an item, scroll the transcript again. **Don't trim for length** — length is a feature, not a bug.

---

## Step 2 — Find the right docs folder

The `docs/` folder is structured by topic area. Current mapping:

```
docs/
├── 01-fundamentals/        → backend basics, routes, middleware, general concepts
├── 02-database-models/     → SQLAlchemy models, how to write them
├── 03-schemas/             → Pydantic schemas, request/response types, validation/coercion
├── 04-decisions/           → architecture decisions, why we chose X over Y
├── 05-database-setup/      → PostgreSQL setup, connections, migrations, Alembic
├── 06-python-tooling/      → Poetry, virtual environments, dependency management
├── 07-crud-routes/         → FastAPI route construction, request/response flow, status codes
```

Pick the folder that best matches the topic. If a topic is conceptually multi-section (e.g., a Pydantic concept that comes up while building CRUD), put it in the section where it's the **canonical** topic — even if the conversation happened in a different section. Cross-link from the originating section.

When new sections are added to `docs/`, update this mapping in the command file.

---

## Step 3 — Pick the correct file number prefix

List the existing files in the chosen folder and continue the numbering sequence.

For example:
- If `07-crud-routes/` has notes through `7.14-...md`
- The next file is `7.15-your-topic-here.md`

Folder prefix mapping:
- `01-fundamentals/` → prefix `1.X`
- `02-database-models/` → prefix `2.X`
- `03-schemas/` → prefix `3.X`
- `04-decisions/` → prefix `4.X`
- `05-database-setup/` → prefix `5.X`
- `06-python-tooling/` → prefix `6.X`
- `07-crud-routes/` → prefix `7.X`

---

## Step 4 — Write the note (the structure)

Use this canonical structure. **Every numbered section is required.** Do not skip sections to save space.

```markdown
# Topic Title

> One-sentence summary that frames what this note covers and why it matters.

---

## The question this note answers

Capture the user's **exact question** in their own words (or a faithful paraphrase if quoted).
Then state the short answer in 2-3 sentences.

This is the framing — readers who land here cold need to know "what triggered this note?"

---

## Section: detailed body

Explain the topic from scratch. Use plain English. Build up complexity gradually.

### Subsections as needed

Use `###` for deeper structure. Never skip heading levels.

> **Analogy:** Use the SAME analogies that worked in chat. If the user understood something via a "paper form" or "postal address" or "airline clerk" — use those exact analogies, not paraphrased ones.

---

## Concrete examples

Always include real, runnable code with language identifiers:

```python
# example
```

If the user can run something to verify the concept (e.g., a Python REPL experiment), include the exact commands.

---

## Diagrams and visualizations

When relationships or flows are involved, draw ASCII diagrams. Examples that have worked:

- Request flow (8-step trace from client to server and back)
- Decision trees (if/else logic FastAPI uses internally)
- Before/after states
- Component relationships (boxes with arrows)
- Timelines (T=0ms, T=1ms, ...)

If you drew any in chat, include them in the note unchanged.

---

## Comparison tables

Use tables for side-by-side comparisons:

| Option A | Option B |
|---|---|
| ... | ... |

If you used a table in chat, copy it into the note.

---

## Common confusions

**Minimum 8 entries. Aim for 10+.** These are often the most valuable section — they capture mistakes a future reader will make.

Format each as:

### ❌ "Common phrasing of the misconception"

Explain the wrong assumption, then the correct understanding. Pull from:
- Confusions the user actually expressed
- Confusions you anticipated and addressed
- Edge cases that came up
- "What if..." questions you discussed

---

## Mental model / one-line summary

End with a clear one-sentence (or one-paragraph) takeaway that captures the entire concept. The reader should be able to skim everything else and read this last paragraph as a complete recap.

---

## Related notes

Always end with cross-links to related notes:

- [Note 1](path/to/note.md) — brief relationship
- [Note 2](path/to/note.md) — brief relationship

Also: if this note covers a topic referenced from other notes, **add a back-link in those notes' Related sections** as part of saving.

---

> *Part of QA Buddy learning notes. Updated: [Month Year].*
```

---

## Step 5 — Update the docs index

After saving the note:

1. Open `docs/README.md`
2. Find the right section (matching the folder)
3. Add the new note to that section's table:
   ```markdown
   | 7.16 | [Title](07-crud-routes/7.16-your-topic.md) | One-line description |
   ```
4. Confirm the table renders correctly

The index is the table of contents for everything saved. It must stay current.

---

## Step 6 — Quality checklist before considering done

Before finishing, verify ALL of these:

- [ ] Title clearly describes the topic
- [ ] User's exact question is captured at the top
- [ ] Short answer follows the question
- [ ] Every analogy from chat is present in the note
- [ ] Every ASCII diagram from chat is present
- [ ] Every comparison table from chat is present
- [ ] Every code example from chat is present
- [ ] Every walkthrough/scenario from chat is present
- [ ] All confusions from the conversation are documented
- [ ] At least 8 common confusions total (anticipated + actual)
- [ ] One-line summary at the end
- [ ] Related notes section with cross-links
- [ ] File is named with the right number prefix
- [ ] Saved in the correct `docs/` subfolder
- [ ] `docs/README.md` updated with new entry
- [ ] Footer includes `*Part of QA Buddy learning notes. Updated: [Month Year].*`

---

## Important rules — read these before writing

### The depth baseline

The reference note for "this is the right depth" is `docs/05-database-setup/5.10-alembic-version-tracking.md` (~400 lines, multiple analogies, full scenario walkthroughs, common-confusion section, mental model). **Aim for that as the floor, not the ceiling.** Many notes legitimately need 500-700 lines.

If a topic is genuinely small (rare for substantive concepts), the note can be shorter — but if you're saving a note that follows multiple chat exchanges, it almost certainly justifies 400+ lines.

### Never summarize

The cardinal sin of this command is shipping a 200-line summary when the conversation covered enough for 500. **Length is a feature.** A reader returning to this note in 6 months should find the full mental model, not a bullet-point recap.

If you're tempted to write "rather than reproduce all the detail, see the conversation," you've failed. The note IS the persistent record. The conversation is gone.

### Capture the user's voice

If the user understood something via a specific phrasing, analogy, or example — preserve that exact phrasing. Their mental model = the right mental model. Don't replace their language with what you think is "more correct."

### Document confusions verbatim

If the user said "I'm confused about X" or "this doesn't make sense" — that EXACT confusion goes in the "common confusions" section, with the resolution that worked. This is the most valuable kind of note content because it captures **why** something needed explanation, not just what was explained.

### One topic per file

If multiple distinct topics were covered in the conversation, **create multiple files** — one per topic. Don't bundle. Cross-link them from each other.

### Scope detection is non-negotiable

Step 0 (scope detection + confirmation) is mandatory. You do not start writing notes based on an assumption of what the user wants. You always:

1. Scan the entire conversation
2. List every detected topic
3. Cross-reference with existing docs
4. Show the plan to the user
5. Wait for confirmation

This prevents losing earlier teachings (which the user may have forgotten about) and prevents bundling unrelated concepts. The cost is one extra confirmation message — well worth it for getting the scope right.

### No fluff

Every sentence should teach something. Don't pad. Don't repeat. But also don't trim — find the right depth where every sentence earns its place.

### Match the inventory

After writing, look at your inventory list from Step 1. Cross every item. **Did each one make it into the note?** If any item is missing, the note isn't done.

### Keep folder mapping current

If a new section is added to `docs/` (e.g., `08-something/`), update Step 2 of this command file so future invocations know about it.

---

## Important: the reader is future-you

In 6 months, the user will come back to this note and need to relearn the concept. They'll have lost the chat. The note is the only record.

Write for that reader. Include enough that they can rebuild the full mental model from the note alone — analogies, diagrams, tables, examples, confusions, all of it.

If you save a note thinking "I'll fill in the details later" — you won't. Future-you will be confused by the same thing, again, and have to ask the same questions. The note is your insurance against that.
