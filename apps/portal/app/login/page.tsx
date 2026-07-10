// ════════════════════════════════════════════════════════════════
// ROUTE:  /login          (public — no auth required)
// ────────────────────────────────────────────────────────────────
// PURPOSE: sign an existing user in.
//
// SECTIONS
//   • email + password form
//   • [ Sign in ] button
//   • inline error area ("wrong email or password")
//   • link → /signup ("New here? Create an account")
//
// DATA / ACTIONS
//   • submit → POST /auth/login → receive JWT → store it → redirect to /
//
// 🔮 LAYOUT: /login and /signup should NOT show the app nav (Home | Projects).
//    Later: give the auth pages their own bare layout (a nested layout, 5.05/04).
// ════════════════════════════════════════════════════════════════

export default function LoginPage() {
  return (
    <main>
      <h1>Sign in</h1>
      <p>Login form goes here — see the design brief above.</p>
    </main>
  );
}
