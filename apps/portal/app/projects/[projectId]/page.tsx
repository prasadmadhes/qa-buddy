// ════════════════════════════════════════════════════════════════
// ROUTE:  /projects/[projectId]        e.g. /projects/42
// ────────────────────────────────────────────────────────────────
// PURPOSE: THE test-case workspace for one project. The heart of the TCM.
//
// LAYOUT IDEA (one screen: tree + content — like TestRail / Xray):
//   ┌───────────────┬──────────────────────────────────────────┐
//   │  TREE sidebar │  test cases in the selected folder         │
//   │  suites  →    │  ────────────────────────────────────────  │
//   │   folders →   │  [ + New Case ]                             │
//   │    (nested)   │  ▸ TC-1  Login with valid creds   · P1      │
//   │               │  ▸ TC-2  Empty password           · P2      │
//   └───────────────┴──────────────────────────────────────────┘
//
// SECTIONS
//   • breadcrumb:  Project ▸ Suite ▸ Folder
//   • left:  suites → nested folders tree (the Project→Suite→Folder model)
//   • right: test-case list for the selected folder
//   • toolbar: [ + New Suite ]  [ + New Folder ]  [ + New Case ]
//
// DATA
//   • the project, its suites, its (nested) folders, and the test cases in
//     the selected folder — from your projects / suites / folders / cases API
//
// NOTE: the deep Project→Suite→Folder→Case nesting lives in the UI (this one
//       screen), NOT as a route per level — routes stay shallow on purpose.
// ════════════════════════════════════════════════════════════════

export default async function ProjectWorkspacePage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params; // 4.02/03 — Next 16 async params

  return (
    <main>
      <h1>Project {projectId}</h1>
      <p>Workspace: suites/folders tree ↔ test cases. See the design brief above.</p>
    </main>
  );
}
