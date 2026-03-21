# CLAUDE.md — AI QA Platform

## Project overview

AI-powered QA platform (SaaS) that autonomously detects test failures and runtime errors, analyzes root causes using AI, and generates fix pull requests. Teams connect their repos and CI — the platform watches, diagnoses, and heals.

Think Tembo-style background coding agent, but focused specifically on QA and test failure resolution.

## Architecture

```
External signals (GitHub webhooks, Sentry, Slack, CI systems)
    │
    ▼
FastAPI — webhook ingestion + REST API (auth, routing, rate limiting)
    │
    ▼
Task queue (Celery + Redis) — async job processing
    │
    ▼
Worker pipeline:
    Context builder → AI analyzer (Claude API) → Healer/fixer (generates PRs)
    │
    ▼
Storage + Output:
    PostgreSQL (runs, failures, fixes) │ Dashboard (Next.js) │ Notifications (Slack, GitHub, email)
    │
    ▼
Feedback loop — PR review comments trigger re-analysis
```

## Tech stack

| Layer              | Technology                | Notes                                         |
|--------------------|---------------------------|-----------------------------------------------|
| Language (backend) | Python 3.12+              | Type hints everywhere, strict mypy             |
| API framework      | FastAPI                   | Async, OpenAPI spec auto-generated             |
| Task queue         | Celery + Redis            | Async workers, retry/backoff built-in          |
| AI                 | Anthropic API (Claude)    | Structured tool use for code analysis/edits    |
| Database           | PostgreSQL                | Via SQLAlchemy 2.0 + Alembic migrations        |
| Frontend           | Next.js 14+ (App Router)  | TypeScript, Tailwind CSS, shadcn/ui            |
| Auth               | NextAuth.js               | GitHub OAuth (primary), session-based          |
| Primary integration| GitHub App                | Repo access, PR creation, webhook events       |
| Notifications      | Slack Bot + GitHub comments| SSE for real-time portal updates               |
| Package management | uv (Python workspaces)    | Fast, handles monorepo Python deps             |
| Deployment         | Docker Compose → Fly.io   | Simple to start, scale later                   |
| CI/CD              | GitHub Actions             | Lint, test, build, deploy                      |

## Monorepo structure

```
ai-qa-platform/
├── apps/
│   ├── api/                            # FastAPI backend
│   │   ├── webhooks/
│   │   │   ├── github.py               # GitHub App webhook handler (workflow_run, check_run, PR events)
│   │   │   ├── sentry.py               # Sentry issue/error webhook handler
│   │   │   └── slack.py                # Slack slash commands and event handler
│   │   ├── routes/
│   │   │   ├── auth.py                 # Login, GitHub OAuth flow, session management
│   │   │   ├── orgs.py                 # Org CRUD, member management, roles
│   │   │   ├── repos.py               # Repo config, signal toggles, per-repo settings
│   │   │   ├── events.py              # Activity feed, failure list, event detail
│   │   │   ├── analytics.py           # Stats, charts data, trends
│   │   │   ├── integrations.py        # Sentry/Slack connect endpoints
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
│   │   │   ├── analyze.py              # Build context → call Claude API → store diagnosis
│   │   │   ├── heal.py                 # Generate fix → create branch → open PR
│   │   │   ├── notify.py              # Slack message, GitHub comment, email
│   │   │   └── feedback.py            # Handle PR review comments → re-analyze if needed
│   │   ├── celery_app.py              # Celery config, broker/backend settings
│   │   └── config.py                   # Worker-specific settings (retry limits, timeouts)
│   │
│   └── portal/                         # Next.js admin portal + marketing site
│       ├── src/
│       │   ├── app/
│       │   │   ├── (auth)/             # Login, signup, GitHub OAuth callback
│       │   │   │   ├── login/
│       │   │   │   └── callback/
│       │   │   ├── (dashboard)/        # Customer-facing portal (requires auth)
│       │   │   │   ├── layout.tsx      # Sidebar nav, org context provider
│       │   │   │   ├── overview/       # Activity feed + summary stats
│       │   │   │   ├── repos/          # Repo list + per-repo config page
│       │   │   │   ├── events/         # Failure list + event detail view (diagnosis, diff, PR link)
│       │   │   │   ├── analytics/      # Charts: fix rate, MTTR, failure patterns
│       │   │   │   ├── integrations/   # Connect Sentry, Slack, future: Jira/Linear
│       │   │   │   └── settings/       # Org settings, members, billing, API keys
│       │   │   ├── (marketing)/        # Public pages (no auth)
│       │   │   │   ├── page.tsx        # Landing page
│       │   │   │   ├── pricing/
│       │   │   │   └── docs/
│       │   │   └── (internal)/         # Super admin panel (platform_admin only, build later)
│       │   │       ├── customers/      # All orgs list, detail, usage
│       │   │       ├── health/         # System health, queue depth, error rates
│       │   │       └── billing/        # Revenue, cost per org, Stripe overview
│       │   ├── components/
│       │   │   ├── ui/                 # shadcn/ui base components
│       │   │   ├── layout/             # Sidebar, topbar, breadcrumbs
│       │   │   ├── events/             # EventCard, EventDetail, DiffViewer
│       │   │   ├── repos/              # RepoCard, SignalToggle, ConfigForm
│       │   │   └── charts/             # FixRateChart, MTTRChart, FailurePatterns
│       │   ├── lib/
│       │   │   ├── api-client.ts       # Typed API client (generated from OpenAPI spec)
│       │   │   ├── auth.ts             # NextAuth config, GitHub provider
│       │   │   └── hooks/              # useEvents, useRepos, useAnalytics, useSSE
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
│   │   │   ├── repo.py                 # Repo: org_id, github_repo_id, full_name, config (JSON)
│   │   │   ├── event.py                # FailureEvent: repo_id, signal_type, status, raw_payload
│   │   │   ├── analysis.py             # Analysis: event_id, diagnosis, root_cause, suggested_fix
│   │   │   ├── fix.py                  # Fix: analysis_id, branch_name, pr_url, pr_status, merged_at
│   │   │   └── integration.py          # Integration: org_id, type (sentry/slack), credentials (encrypted)
│   │   ├── parsers/                    # Test result parsers → unified model
│   │   │   ├── base.py                 # TestFailure dataclass (universal failure model)
│   │   │   ├── junit_xml.py            # JUnit XML parser (pytest, JUnit, Mocha, Go, etc.)
│   │   │   ├── json_report.py          # JSON report parser (Cypress, Playwright, custom)
│   │   │   ├── tap.py                  # TAP (Test Anything Protocol) parser
│   │   │   └── log_parser.py           # Raw log/stdout fallback parser
│   │   ├── context_builder.py          # Fetch relevant source files, git diffs, CI logs via GitHub API
│   │   ├── prompts/                    # Prompt templates for AI analysis and fix generation
│   │   │   ├── analyze.py              # Failure diagnosis prompt
│   │   │   ├── fix.py                  # Code fix generation prompt
│   │   │   └── feedback.py             # PR review response prompt
│   │   ├── github_client.py            # GitHub App API wrapper (repos, files, PRs, comments, logs)
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
│   ├── seed.py                         # Seed dev data (test org, repo, sample events)
│   ├── create_github_app.py            # Helper to register GitHub App
│   └── generate_api_client.py          # Generate TypeScript client from OpenAPI spec
│
├── tests/
│   ├── api/                            # API route tests
│   ├── worker/                         # Worker task tests
│   ├── core/                           # Parser, context builder, prompt tests
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

### Signal types

Signals are the events that trigger analysis. Each repo can enable/disable signals independently:

- `ci_failure` — GitHub Actions workflow_run or check_run failure. Fetches CI logs via GitHub API.
- `sentry_error` — Sentry issue webhook. Includes stack trace, breadcrumbs, context.
- `slack_trigger` — Team member tags the bot in Slack with a repo + description.
- `manual` — Created via dashboard or API.

### Event lifecycle

```
signal_received → queued → context_building → analyzing → diagnosed → fixing → pr_opened → (merged | rejected | stale)
```

Each FailureEvent tracks its status through this lifecycle. The feedback loop: if a PR is rejected or receives review comments, the event can re-enter `analyzing` state.

### Context building

The most critical piece. For a given failure, the context builder:

1. Parses the test result into a unified `TestFailure` model
2. Extracts relevant file paths from stack traces
3. Fetches those source files from the repo via GitHub API
4. Fetches the test file itself
5. Gets recent git diffs on the affected files (last 5 commits)
6. Pulls CI logs (for CI failures)
7. Bundles everything into a structured prompt for Claude

### Guardrails

- Max 3 retry attempts per failure event before marking as `needs_human`
- AI-generated fixes always go on a separate branch, never direct to main/default
- PRs include full diagnosis in the description so reviewers have context
- Per-org rate limiting on analysis jobs (prevent runaway costs)
- Cost tracking: log token usage per analysis, track cost per org

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
DATABASE_URL=postgresql+asyncpg://user:pass@localhost:5432/aiqaplatform

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

# Sentry (optional)
SENTRY_WEBHOOK_SECRET=xxx

# Slack (optional)
SLACK_BOT_TOKEN=xoxb-...
SLACK_SIGNING_SECRET=xxx

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

### Phase 1 — Core analysis (weeks 1-2)

- `packages/core`: parsers (JUnit XML first), TestFailure model, context builder, prompts
- `apps/api`: GitHub App webhook handler for `workflow_run` failure events
- `apps/worker`: analyze task — fetch logs, build context, call Claude API
- Output: post a GitHub commit comment with the AI diagnosis
- No portal yet, no PR generation

### Phase 2 — Auto-fix PRs (weeks 3-4)

- `apps/worker`: heal task — generate fix, create branch, open PR via GitHub API
- Feedback loop: listen for PR review comments, re-analyze if requested
- Add retry logic and guardrails (max attempts, cost tracking)

### Phase 3 — Portal + onboarding (weeks 5-7)

- `apps/portal`: auth (GitHub OAuth), onboarding flow (install GitHub App, select repos)
- Dashboard: activity feed, event detail view (diagnosis + diff preview + PR link)
- Repo config page: signal toggles, auto-fix on/off, retry limits
- SSE for real-time updates

### Phase 4 — Expand (weeks 8+)

- Sentry integration (runtime error signals)
- Slack bot (trigger analysis, receive notifications)
- Analytics page (fix rate, MTTR, failure patterns)
- Org settings (members, billing via Stripe)
- Super admin panel (customer management, health monitoring)
- Multi-repo support, Jira/Linear integration

## Important notes

- The GitHub App is the #1 integration — everything flows through it. Build this first and build it well.
- Context builder quality determines everything. The better the context sent to Claude, the better the diagnosis and fix. Invest time here.
- Start with GitHub Actions only for CI. Add other CI adapters (GitLab, Jenkins) only after validating the core loop.
- Every AI analysis should log full token usage for cost tracking. This becomes the basis for billing.
- The super admin panel (`(internal)` route group) is deferred. Use direct DB queries and protected API routes until you have 10+ customers.