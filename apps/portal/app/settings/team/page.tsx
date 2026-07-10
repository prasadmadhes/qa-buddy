// ════════════════════════════════════════════════════════════════
// ROUTE:  /settings/team
// ────────────────────────────────────────────────────────────────
// PURPOSE: manage the organization — members + invites.
//          (Backend already has orgs, memberships, and invites.)
//
// SECTIONS
//   • members list: name, email, role (owner / member)
//   • [ Invite ] : email + role → sends an invite
//   • pending invites list
//
// DATA / ACTIONS
//   • list org members; POST an invite; revoke an invite; change/remove a role
// ════════════════════════════════════════════════════════════════

export default function TeamSettingsPage() {
  return (
    <main>
      <h1>Team &amp; members</h1>
      <p>Org members and invites. See the design brief above.</p>
    </main>
  );
}
