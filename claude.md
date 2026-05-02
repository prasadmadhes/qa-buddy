# CLAUDE.md — QA Buddy

## Teaching mode (this project is a learning project)

The user is a complete beginner using QA Buddy to learn FastAPI / Python / auth / SQLAlchemy. **Pedagogy comes first.** Code quality matters but if a session is between "ship faster" and "user understands it deeply" → choose understanding.

### Rules

- **Explain BEFORE doing.** Don't run shell commands or write code until the concept is explained and the user has confirmed understanding. Especially for one-shot commands like `createdb`, `poetry add X`, migrations, `alembic upgrade`. State what the command does → what changes after → wait for confirmation. (The `createdb` incident is the canonical "should have explained first" example.)
- **Direct mechanical explanations for "how does X work?" questions.** Analogies are OK when *first introducing* a concept (the wristband analogy worked when introducing JWT). Once the user asks "how does the math work?" or "how does X produce Y?" — **drop the analogy, go to math/code/byte-level diagrams.** (The chef + secret-ingredient analogy was rejected; "just tell me mechanically" is the failure signal.)
- **One concept per turn.** Don't dump multiple new ideas at once. Pause for confirmation between steps.
- **Use the 6-step pattern:** show (with diagram) → explain ONE new thing → write code → verify → progress recap → notes (in `docs/`, only after the concept is understood).
- **Default to visual diagrams** (ASCII flow diagrams, file-structure trees, comparison tables). Don't ask permission, just include them when the topic involves architecture, flow, file structure, or comparison.
- **Max effort for decisions.** When deciding what library to install or how to structure something, use max-effort reasoning. The passlib install (later ditched) is the canonical "should have used max effort" failure.
- **Notes go in `docs/`.** Numbered by section (`07-crud-routes/`, `08-security-and-auth/`, etc.). Write them in Step 6, after the concept has been built and understood — not as upfront documentation.
- **Doubt-driven notes (hybrid format).** When writing notes, embed the user's actual session doubts as inline 🤔 callouts at the natural spot in each section, PLUS a `## Doubts that came up — quick index` section near the bottom. The user re-reads with the same doubts, wants recognition + answer in context. (Full format spec: `feedback_doubt_driven_notes.md` in memory.)

### Anti-patterns to avoid

- ❌ Dumping a wall of text instead of a tight focused explanation.
- ❌ Adding analogies when the user has explicitly asked "how does X work mechanically?"
- ❌ Running `poetry add <library>` without first explaining what it adds and whether it's needed.
- ❌ Writing notes before building (premature documentation).
- ❌ Using `random.*` instead of `secrets.*` for security values.
- ❌ Hardcoding secrets (always env vars + `.env`).

## Project overview

Open-source, all-in-one QA platform with a built-in test case management (TCM) tool and AI-powered test case generation. Teams manage test cases in projects/suites/folders, and use AI to generate new test cases from GitHub repos or Jira tickets. Generated test cases go through human review before being added to the test library.

Long-term vision: single platform for the entire QA lifecycle — test case management, test runs, AI generation, AI-powered test execution (like GitHub Actions), self-healing tests, and GitHub/Jira/CI integrations.

## Architecture

```
Portal (Next.js) → FastAPI REST API → PostgreSQL
                                     → Celery + Redis (async AI generation jobs)
```

- `apps/api` — FastAPI backend (routes, middleware, config)
- `apps/worker` — Celery tasks (AI generation)
- `apps/portal` — Next.js dashboard
- `packages/core` — shared Python lib (models, code analyzer, prompts, integrations, db)

## Tech stack

**Backend:** Python 3.12+, FastAPI, Celery + Redis, SQLAlchemy 2.0, Alembic, Pydantic v2
**Frontend:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, shadcn/ui
**AI:** Anthropic Claude API | **DB:** PostgreSQL | **Auth:** NextAuth.js
**Integrations:** GitHub App, Jira | **Package mgmt:** Poetry + pyenv
**Deployment:** Docker Compose → Fly.io | **CI:** GitHub Actions

## Key concepts

### Test case organization (built-in TCM)

Project → Suite → Folder (nested) → Test Case. Replaces external tools like TestRail/Xray.

### Test case model

Title, objective, preconditions, steps, expected result, priority (critical/high/medium/low), category (smoke/functional/regression/edge case/negative/boundary/integration), tags, source reference, status.

### AI generation flow

Source (GitHub repo or Jira tickets) → fetch code/tickets → analyze → Claude generates test cases → `pending_review` → user approves/rejects/edits → added to test library.

## Coding conventions

### Non-obvious rules (obvious stuff is in config files)

- SQLAlchemy 2.0 style (`mapped_column`, not `Column`)
- Async everywhere in API layer; Celery tasks are sync
- UUID primary keys, all timestamps UTC
- Server components by default in Next.js, client only when needed
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `test:`
- Squash merge to main

## Phase 1 scope (current)

1. **Built-in TCM** — projects, suites, folders, test case CRUD with priorities/tags/categories
2. **AI test case generation** — connect GitHub/Jira, analyze code/tickets, generate via Claude, human review flow
3. **Auth** — basic login/signup

## Future phases

- **Phase 2:** Test runs + execution tracking (pass/fail/skip per case per run)
- **Phase 3:** Smarter AI (better prompts, duplicate detection, bulk actions, auto-generate on commits)
- **Phase 4:** Run test cases inside QA Buddy using AI-powered execution + self-healing
- **Phase 5:** Analytics, teams/orgs, billing, notifications, CI/CD integration, public API

## Important notes

- Built-in TCM is the foundation — get CRUD solid before layering AI.
- Code analyzer quality determines AI generation quality. Must be language-agnostic from day one.
- AI-generated test cases ALWAYS go through human review.
- Log full token usage per generation for cost tracking/billing.
- GitHub/Jira are inputs for AI generation, not sync targets. QA Buddy IS the TCM.
