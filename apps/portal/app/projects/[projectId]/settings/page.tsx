// ════════════════════════════════════════════════════════════════
// ROUTE:  /projects/[projectId]/settings
// ────────────────────────────────────────────────────────────────
// PURPOSE: manage a single project.
//
// SECTIONS
//   • rename project (name field + [ Save ])
//   • danger zone: [ Delete project ]
//
// DATA / ACTIONS: PATCH the project name; DELETE the project
// ════════════════════════════════════════════════════════════════

export default async function ProjectSettingsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  return (
    <main>
      <h1>Project settings</h1>
      <p>Rename / delete project {projectId} — see the design brief above.</p>
    </main>
  );
}
