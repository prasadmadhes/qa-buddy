# CLAUDE.md — QA Buddy

## Project overview

AI-powered QA platform (SaaS) that analyzes codebases and automatically generates functional/manual test cases. Teams connect their GitHub repos, AI analyzes the code, and generates structured test cases for human review. Approved test cases are pushed to the team's test case management (TCM) tool of choice.

Think AI QA engineer that reads your code and writes your test plans — with human review before anything ships.

## Architecture

```
GitHub repo connection (GitHub App)
    │
    ▼
FastAPI — REST API (auth, repo management, test case CRUD, TCM sync)
    │
    ▼
Task queue (Celery + Redis) — async job processing
    │
    ▼
Worker pipeline:
    Code fetcher → Code analyzer → AI test case generator (Claude API)
    │
    ▼
Storage:
    PostgreSQL (repos, test cases, review status, sync history)
    │
    ▼
Dashboard (Next.js) — review, approve/reject/edit test cases
    │
    ▼
TCM sync — push approved test cases to:
    TestRail │ Xray (Jira) │ Zephyr │ qTest │ Azure Test Plans │ others
```

## Tech stack

| Layer              | Technology                | Notes                                         |
|--------------------|---------------------------|-----------------------------------------------|
| Language (backend) | Python 3.12+              | Type hints everywhere, strict mypy             |
| API framework      | FastAPI                   | Async, OpenAPI spec auto-generated             |
| Task queue         | Celery + Redis            | Async workers, retry/backoff built-in          |
| AI                 | Anthropic API (Claude)    | Structured tool use for code analysis          |
| Database           | PostgreSQL                | Via SQLAlchemy 2.0 + Alembic migrations        |
| Frontend           | Next.js 14+ (App Router)  | TypeScript, Tailwind CSS, shadcn/ui            |
| Auth               | NextAuth.js               | GitHub OAuth (primary), session-based          |
| Primary integration| GitHub App                | Repo access, code fetching                     |
| TCM integrations   | TestRail, Xray, Zephyr, qTest, Azure Test Plans | Push approved test cases   |
| Package management | uv (Python workspaces)    | Fast, handles monorepo Python deps             |
| Deployment         | Docker Compose → Fly.io   | Simple to start, scale later                   |
| CI/CD              | GitHub Actions             | Lint, test, build, deploy                      |

## Monorepo structure

```
qa-buddy/
├── apps/
│   ├── api/                            # FastAPI backend
│   │   ├── routes/
│   │   │   ├── auth.py                 # Login, GitHub OAuth flow, session management
│   │   │   ├── orgs.py                 # Org CRUD, member management, roles
│   │   │   ├── repos.py               # Repo management, file browsing, scan triggers
│   │   │   ├── test_cases.py           # Test case CRUD, review (approve/reject/edit), bulk actions
│   │   │   ├── generations.py          # Generation job status, history, re-generate
│   │   │   ├── integrations.py         # TCM platform connect/disconnect/sync endpoints
│   │   │   ├── analytics.py            # Coverage stats, generation history, approval rates
│   │   │   └── admin.py               # Super admin routes (platform_admin only)
│   │   ├── middleware/
│   │   │   ├── auth.py                 # JWT/session validation
│   │   │   └── rate_limit.py           # Per-org rate limiting
│   │   ├── dependencies.py             # FastAPI dependency injection (db session, current user, etc.)
│   │   ├── config.py                   # Settings via pydantic-settings (env vars)
│   │   └── main.py                     # App factory, router mounting, lifespan events
│   │
│   ├── worker/                         # Celery async task workers
│   │   ├── tasks/
│   │   │   ├── generate.py             # Fetch code → analyze → call Claude API → store test cases
│   │   │   ├── sync_tcm.py            # Push approved test cases to TCM platforms
│   │   │   └── notify.py              # Slack/email notifications on generation complete
│   │   ├── celery_app.py              # Celery config, broker/backend settings
│   │   └── config.py                   # Worker-specific settings (retry limits, timeouts)
│   │
│   └── portal/                         # Next.js dashboard + marketing site
│       ├── src/
│       │   ├── app/
│       │   │   ├── (auth)/             # Login, signup, GitHub OAuth callback
│       │   │   │   ├── login/
│       │   │   │   └── callback/
│       │   │   ├── (dashboard)/        # Customer-facing portal (requires auth)
│       │   │   │   ├── layout.tsx      # Sidebar nav, org context provider
│       │   │   │   ├── overview/       # Summary stats, recent generations
│       │   │   │   ├── repos/          # Repo list, select files/modules to scan
│       │   │   │   ├── test-cases/     # Test case review queue: approve, reject, edit
│       │   │   │   ├── generations/    # Generation job history and status
│       │   │   │   ├── integrations/   # Connect TCM tools (TestRail, Xray, Zephyr, qTest, etc.)
│       │   │   │   ├── analytics/      # Coverage, approval rates, generation trends
│       │   │   │   └── settings/       # Org settings, members, billing, API keys
│       │   │   ├── (marketing)/        # Public pages (no auth)
│       │   │   │   ├── page.tsx        # Landing page
│       │   │   │   ├── pricing/
│       │   │   │   └── docs/
│       │   │   └── (internal)/         # Super admin panel (platform_admin only, build later)
│       │   │       ├── customers/
│       │   │       ├── health/
│       │   │       └── billing/
│       │   ├── components/
│       │   │   ├── ui/                 # shadcn/ui base components
│       │   │   ├── layout/             # Sidebar, topbar, breadcrumbs
│       │   │   ├── test-cases/         # TestCaseCard, TestCaseDetail, ReviewActions, BulkActions
│       │   │   ├── repos/              # RepoCard, FileBrowser, ScanConfig
│       │   │   └── charts/             # CoverageChart, ApprovalRateChart, GenerationTrends
│       │   ├── lib/
│       │   │   ├── api-client.ts       # Typed API client (generated from OpenAPI spec)
│       │   │   ├── auth.ts             # NextAuth config, GitHub provider
│       │   │   └── hooks/              # useTestCases, useRepos, useGenerations, useSSE
│       │   └── types/                  # Shared TypeScript types
│       ├── tailwind.config.ts
│       ├── next.config.ts
│       └── package.json
│
├── packages/
│   ├── core/                           # Shared Python library (used by api + worker)
│   │   ├── models/                     # SQLAlchemy 2.0 models
│   │   │   ├── org.py                  # Organization: name, slug, plan, stripe_customer_id
│   │   │   ├── user.py                 # User: github_id, email, is_platform_admin
│   │   │   ├── membership.py           # OrgMembership: user_id, org_id, role (admin/member)
│   │   │   ├── repo.py                 # Repo: org_id, github_repo_id, full_name, default_branch
│   │   │   ├── test_case.py            # TestCase: repo_id, title, objective, preconditions, steps, expected_result, priority, category, status (pending/approved/rejected), tags
│   │   │   ├── generation.py           # Generation: repo_id, scope (files/module/repo), status, token_usage, test_case_count
│   │   │   └── integration.py          # Integration: org_id, type (testrail/xray/zephyr/qtest/azure), credentials (encrypted), project_mapping
│   │   ├── code_analyzer/              # Code analysis for test case generation
│   │   │   ├── base.py                 # CodeModule dataclass (functions, classes, endpoints, dependencies)
│   │   │   ├── python_analyzer.py      # Python AST analysis (functions, classes, decorators, type hints)
│   │   │   ├── javascript_analyzer.py  # JS/TS analysis (exports, React components, API routes)
│   │   │   └── generic_analyzer.py     # Fallback: regex-based extraction for other languages
│   │   ├── prompts/                    # Prompt templates for AI test case generation
│   │   │   ├── generate_tests.py       # Main test case generation prompt
│   │   │   ├── refine_tests.py         # Prompt for editing/improving rejected test cases
│   │   │   └── categorize.py           # Auto-categorize generated test cases (smoke, regression, edge case, etc.)
│   │   ├── tcm/                        # Test case management tool adapters
│   │   │   ├── base.py                 # Abstract TCM adapter interface
│   │   │   ├── testrail.py             # TestRail API adapter
│   │   │   ├── xray.py                 # Xray (Jira) adapter
│   │   │   ├── zephyr.py              # Zephyr Scale/Squad adapter
│   │   │   ├── qtest.py               # qTest adapter
│   │   │   └── azure_test_plans.py    # Azure Test Plans adapter
│   │   ├── github_client.py            # GitHub App API wrapper (repos, files, tree browsing)
│   │   ├── db.py                       # Database engine, session factory
│   │   └── config.py                   # Shared config (DB URL, Redis URL, API keys)
│   │
│   └── sdk/                            # (future) TypeScript SDK for API consumers
│       └── README.md
│
├── migrations/                         # Alembic migrations
│   ├── alembic.ini
│   ├── env.py
│   └── versions/
│
├── infra/
│   ├── docker-compose.yml              # Local dev: api + worker + redis + postgres + portal
│   ├── docker-compose.prod.yml         # Production overrides
│   ├── Dockerfile.api                  # FastAPI container
│   ├── Dockerfile.worker               # Celery worker container
│   └── fly.toml                        # Fly.io deploy config (or Railway/Render)
│
├── scripts/
│   ├── seed.py                         # Seed dev data (test org, repo, sample test cases)
│   ├── create_github_app.py            # Helper to register GitHub App
│   └── generate_api_client.py          # Generate TypeScript client from OpenAPI spec
│
├── tests/
│   ├── api/                            # API route tests
│   ├── worker/                         # Worker task tests
│   ├── core/                           # Code analyzer, prompt, TCM adapter tests
│   └── conftest.py                     # Shared fixtures (test db, mock GitHub, mock Claude API)
│
├── .github/
│   └── workflows/
│       ├── ci.yml                      # Lint (ruff) + type check (mypy) + test (pytest) + build portal
│       └── deploy.yml                  # Deploy on merge to main
│
├── pyproject.toml                      # Root — uv workspace config, shared deps, ruff/mypy config
├── .env.example                        # All required env vars documented
├── CLAUDE.md                           # This file
└── README.md
```

## Key concepts

### Test case model

Each generated test case is a structured, functional/manual test case:

- **Title** — concise description of what is being tested
- **Objective** — what this test validates and why it matters
- **Preconditions** — setup required before executing the test
- **Steps** — ordered list of actions the tester performs
- **Expected result** — what should happen if the feature works correctly
- **Priority** — critical, high, medium, low
- **Category** — smoke, functional, regression, edge case, negative, boundary, integration
- **Tags** — free-form labels (e.g., module name, feature area, API endpoint)
- **Source reference** — file path + function/class that this test case covers

### Generation flow

```
user selects repo/files → queued → code_fetching → analyzing → generating → pending_review → (approved | rejected | edited) → synced_to_tcm
```

1. User selects a repo and optionally narrows scope to specific files, modules, or directories
2. Worker fetches code from GitHub via the GitHub App
3. Code analyzer extracts structure: functions, classes, endpoints, dependencies
4. AI (Claude) generates functional test cases based on the code analysis
5. Test cases land in `pending_review` status in the dashboard
6. User reviews each test case: approve, reject, or edit
7. Approved test cases are pushed to the connected TCM tool

### Code analysis

The quality of generated test cases depends on how well we understand the code. The code analyzer:

1. Parses source files and extracts structure (functions, classes, methods, endpoints)
2. Identifies dependencies and relationships between modules
3. Detects patterns: API endpoints, database operations, auth checks, input validation
4. Extracts docstrings, type hints, and comments for additional context
5. Bundles everything into a structured prompt for Claude

Language-specific analyzers (Python AST, JS/TS) provide richer extraction. A generic regex-based fallback handles other languages.

### TCM integrations

Approved test cases are pushed to the team's test case management tool. Each adapter implements a common interface:

- **TestRail** — create test cases in suites/sections, map priorities and categories
- **Xray (Jira)** — create test issues with steps, link to Jira projects
- **Zephyr Scale/Squad** — create test cases in Zephyr within Jira
- **qTest** — create test cases in qTest modules
- **Azure Test Plans** — create test cases in Azure DevOps test plans

Each integration stores: API credentials (encrypted), project/suite mapping, field mapping (how QA Buddy categories map to the tool's fields).

### Guardrails

- Per-org rate limiting on generation jobs (prevent runaway AI costs)
- Cost tracking: log token usage per generation, track cost per org
- Max file size limits for code analysis (skip minified/generated files)
- Test cases always go through human review — never auto-pushed to TCM
- Duplicate detection: flag if a generated test case is similar to an existing one in the TCM

## Coding conventions

### Python (api, worker, core)

- Python 3.12+, strict type hints on all functions
- Linting: ruff (replaces flake8 + isort + black)
- Type checking: mypy --strict
- Testing: pytest with async support (anyio)
- SQLAlchemy 2.0 style (mapped_column, not Column)
- Pydantic v2 for request/response schemas
- Async everywhere in API layer (async def endpoints)
- Celery tasks are sync (Celery doesn't support async natively)
- Use dependency injection via FastAPI Depends() for db sessions, current user, etc.
- Environment config via pydantic-settings (BaseSettings)

### TypeScript (portal)

- Next.js 14+ App Router, TypeScript strict mode
- Tailwind CSS + shadcn/ui for components
- Server components by default, client components only when needed (interactivity)
- API client auto-generated from FastAPI's OpenAPI spec
- SSE (EventSource) for real-time activity feed updates
- Zod for client-side validation

### Database

- PostgreSQL 15+
- Alembic for migrations, autogenerate from SQLAlchemy models
- UUID primary keys everywhere
- All timestamps as UTC (timezone-aware)
- JSON columns for flexible config (repo settings, integration credentials)
- Encrypted storage for secrets (integration tokens) via pgcrypto or application-level encryption

### Git conventions

- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `test:`
- Branch naming: `feat/xyz`, `fix/xyz`, `chore/xyz`
- PRs require passing CI before merge
- Squash merge to main

## Environment variables

```bash
# Database
DATABASE_URL=postgresql+asyncpg://user:pass@localhost:5432/qabuddy

# Redis
REDIS_URL=redis://localhost:6379/0

# Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# GitHub App
GITHUB_APP_ID=123456
GITHUB_APP_PRIVATE_KEY=-----BEGIN RSA PRIVATE KEY-----...
GITHUB_APP_WEBHOOK_SECRET=whsec_...
GITHUB_CLIENT_ID=Iv1.xxx
GITHUB_CLIENT_SECRET=xxx

# TCM integrations (per-org, stored encrypted in DB — these are defaults for dev)
TESTRAIL_BASE_URL=https://yourinstance.testrail.io
TESTRAIL_API_KEY=xxx

# Stripe (future)
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App
APP_URL=http://localhost:3000
API_URL=http://localhost:8000
SECRET_KEY=xxx
ENVIRONMENT=development
```

## Development setup

```bash
# Prerequisites: Python 3.12+, Node 20+, Docker, uv

# Clone and setup
git clone <repo-url> && cd ai-qa-platform

# Start infrastructure
docker compose up -d postgres redis

# Install Python deps
uv sync

# Run migrations
uv run alembic upgrade head

# Seed dev data
uv run python scripts/seed.py

# Start API server
uv run uvicorn apps.api.main:app --reload --port 8000

# Start Celery worker (separate terminal)
uv run celery -A apps.worker.celery_app worker --loglevel=info

# Start portal (separate terminal)
cd apps/portal && npm install && npm run dev
```

## MVP roadmap

### Phase 1 — AI test case generation + review (weeks 1-3)

- `packages/core`: language-agnostic code analyzer (Python, JS/TS, Java, Go, etc.), test case model, generation prompts
- `apps/api`: GitHub App integration (connect repo, fetch code), test case CRUD, generation trigger
- `apps/worker`: generate task — fetch code, analyze, call Claude API, store test cases
- `apps/portal`: minimal dashboard — connect repo, trigger generation, review test cases (approve/reject/edit)
- Output: generated functional test cases visible in dashboard for human review
- No TCM sync yet — just generate and review

### Phase 2 — TCM integrations (weeks 4-5)

- `packages/core/tcm`: adapter interface + TestRail adapter (first integration)
- `apps/api`: integration CRUD endpoints, sync trigger, field mapping config
- `apps/worker`: sync task — push approved test cases to connected TCM
- `apps/portal`: integrations page — connect TCM, configure project/suite mapping
- Add Xray and Zephyr adapters

### Phase 3 — Smarter generation + polish (weeks 6-7)

- Improved prompts: better edge case coverage, negative testing, boundary conditions
- Duplicate detection: flag test cases similar to existing ones in TCM
- Bulk actions: approve/reject multiple test cases at once
- Re-generate: user can request regeneration for rejected test cases with feedback
- qTest and Azure Test Plans adapters

### Phase 4 — Scale + expand (weeks 8+)

- Analytics: generation coverage, approval rates, trends over time
- Auto-generate on new commits (optional per-repo setting)
- Org settings: members, billing via Stripe
- Super admin panel (customer management, health monitoring)
- Slack notifications on generation complete
- API for programmatic test case generation (CI/CD integration)

## Important notes

- The GitHub App is the primary integration for code access. Build this first and build it well.
- Code analyzer quality determines everything. The better the code understanding sent to Claude, the better the test cases. Invest time here.
- Code analysis must be language-agnostic from day one. Use language-specific analyzers (Python AST, JS/TS parser) where possible, with a generic fallback for other languages. Claude itself is good at understanding any language, so even the generic analyzer produces useful test cases.
- Test cases ALWAYS go through human review. Never auto-push to TCM without approval.
- Every AI generation should log full token usage for cost tracking. This becomes the basis for billing.
- TCM adapter pattern: build the abstract interface first, then implement TestRail. Other adapters follow the same pattern.
- The super admin panel (`(internal)` route group) is deferred. Use direct DB queries and protected API routes until you have 10+ customers.