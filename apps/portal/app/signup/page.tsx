// ════════════════════════════════════════════════════════════════
// ROUTE:  /signup         (public — no auth required)
// ────────────────────────────────────────────────────────────────
// PURPOSE: create a new account. (The API also auto-creates a personal
//          org for the new user — see the backend signup flow.)
//
// SECTIONS
//   • name + email + password form
//   • [ Create account ] button
//   • link → /login ("Already have an account? Sign in")
//
// DATA / ACTIONS
//   • submit → POST /auth/signup → receive JWT → store it → redirect to /
//
// 🔮 LAYOUT: bare layout (no app nav), same as /login.
// ════════════════════════════════════════════════════════════════

export default function SignupPage() {
  return (
    <main>
      <h1>Create account</h1>
      <p>Signup form goes here — see the design brief above.</p>
    </main>
  );
}
