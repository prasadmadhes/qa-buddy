// ════════════════════════════════════════════════════════════════
// ROUTE:  /settings
// ────────────────────────────────────────────────────────────────
// PURPOSE: your account.
//
// SECTIONS
//   • profile: name, email
//   • change password
//   • sign out
//
// DATA / ACTIONS
//   • GET /me; update profile; change password; clear JWT + redirect → /login
// ════════════════════════════════════════════════════════════════

export default function SettingsPage() {
  return (
    <main>
      <h1>Account settings</h1>
      <p>Profile · password · sign out. See the design brief above.</p>
    </main>
  );
}
