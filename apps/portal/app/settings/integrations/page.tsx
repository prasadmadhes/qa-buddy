// ════════════════════════════════════════════════════════════════
// ROUTE:  /settings/integrations
// ────────────────────────────────────────────────────────────────
// PURPOSE: connect the SOURCES the AI generation reads from.
//          (Inputs for /generate — NOT sync targets; QA Buddy IS the TCM.)
//
// SECTIONS
//   • GitHub App: connection status + [ Connect ] / [ Disconnect ]
//   • Jira:       connection status + [ Connect ]
//
// DATA / ACTIONS
//   • OAuth / app-install flows; store the connection; list connected sources
// ════════════════════════════════════════════════════════════════

export default function IntegrationsSettingsPage() {
  return (
    <main>
      <h1>Integrations</h1>
      <p>Connect GitHub / Jira as AI-generation sources. See the design brief above.</p>
    </main>
  );
}
