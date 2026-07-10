// ════════════════════════════════════════════════════════════════
// ROUTE:  /generate/review
// ────────────────────────────────────────────────────────────────
// PURPOSE: the human review gate — AI-generated cases ALWAYS go through
//          review before entering the test library.
//
// SECTIONS
//   • queue of `pending_review` test cases
//   • per case: preview (title, steps, expected result) + [Approve] [Reject] [Edit]
//   • bulk actions (approve all / reject all)
//
// DATA / ACTIONS
//   • list pending_review cases; approve → add to library; reject; edit-then-approve
// ════════════════════════════════════════════════════════════════

export default function GenerateReviewPage() {
  return (
    <main>
      <h1>Review generated cases</h1>
      <p>Approve / reject / edit the AI-generated cases. See the design brief above.</p>
    </main>
  );
}
