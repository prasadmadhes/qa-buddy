# Multi-Org Login: Where Does the User Land?

> Handling users who belong to multiple organizations.

---

## The question

If Prasad belongs to 2 organizations, which one does he see when he logs in?

## Two common approaches

### Approach A: Org selector after login

After login, show a screen: "Pick an organization."

```
Welcome back, Prasad!

┌─────────────────────────┐
│  Prasad's Workspace      │  ← click to enter
├─────────────────────────┤
│  Acme Corp               │  ← click to enter
└─────────────────────────┘
```

This is how **Slack** works.

### Approach B: Default org + switcher

Log in → land in your **last used org**. A dropdown lets you switch anytime.

```
┌──────────────────────────────────────────┐
│ QA Buddy          [Acme Corp ▼]    Prasad│
│                    ├─ Prasad's Workspace  │
│                    └─ Acme Corp  ✓        │
│                                          │
│  Your projects...                        │
└──────────────────────────────────────────┘
```

This is how **Notion** and **Figma** work.

## Which one for QA Buddy?

**Decision deferred.** This is a frontend/UX decision we'll make when building the portal. The database models don't need to change either way — the Membership table already supports multiple orgs per user.

Both approaches work with the same data:

```
Memberships
┌─────────┬────────┬─────────┐
│ user_id │ org_id │ role    │
├─────────┼────────┼─────────┤
│ u1      │ org1   │ owner   │  ← Prasad in Workspace
│ u1      │ org2   │ member  │  ← Prasad in Acme Corp
└─────────┴────────┴─────────┘
```

The frontend decides how to present this. The backend just provides the list of orgs a user belongs to.
