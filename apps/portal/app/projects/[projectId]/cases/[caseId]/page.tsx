// ════════════════════════════════════════════════════════════════
// ROUTE:  /projects/[projectId]/cases/[caseId]
// ────────────────────────────────────────────────────────────────
// PURPOSE: view / edit a single test case.
//   (Alternative design: show this as a SIDE PANEL inside the workspace
//    instead of a full route — a choice to make later.)
//
// SECTIONS (the test-case model)
//   • title, objective, preconditions
//   • steps (ordered list), expected result
//   • priority (critical/high/medium/low), category (smoke/functional/…)
//   • tags, status, source reference
//   • [ Save ]  [ Delete ]  + status controls
//
// DATA / ACTIONS
//   • load the test case by id; save edits (PATCH); delete
// ════════════════════════════════════════════════════════════════

export default async function TestCasePage({
  params,
}: {
  params: Promise<{ projectId: string; caseId: string }>;
}) {
  const { projectId, caseId } = await params;

  return (
    <main>
      <h1>Test case {caseId}</h1>
      <p>In project {projectId}. Edit form goes here — see the design brief above.</p>
    </main>
  );
}
