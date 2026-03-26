# CLAUDE.md — QA Buddy

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
