// ════════════════════════════════════════════════════════════════
// ROUTE:  /generate
// ────────────────────────────────────────────────────────────────
// PURPOSE: kick off AI test-case generation (Phase-1 pillar #2).
//
// SECTIONS
//   • pick a SOURCE:  GitHub repo  OR  Jira tickets
//     (connections come from /settings/integrations)
//   • pick a TARGET:  which project / suite the results land in
//   • [ Generate ]  → starts an async job (Celery + Redis)
//   • recent generation jobs + their status
//
// DATA / ACTIONS
//   • list connected sources; POST a generation job; poll the job's status
//   • generated cases land as `pending_review` → reviewed at /generate/review
// ════════════════════════════════════════════════════════════════

export default function GeneratePage() {
  return (
    <main>
      <h1>Generate test cases</h1>
      <p>Pick a source → generate. See the design brief above.</p>
    </main>
  );
}
