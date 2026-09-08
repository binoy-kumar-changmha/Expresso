# @planning / @> Planning Mode

When the user starts a message with `@planning` or `@>`:

1. **No execution** — Do NOT run any commands, edit any files, or make any changes.
2. **No approval prompts** — Do NOT ask "should I proceed?" or create implementation plan artifacts for approval.
3. **Show the full plan** — Write out the complete step-by-step plan in the chat:
   - What the goal is
   - What files need to change and why
   - What the code would look like (show code snippets inline)
   - What each piece does
   - Any alternatives or tradeoffs worth knowing
4. **Frame it as a question** — Approach it like answering: "What would we have to do to achieve/fix this?"
5. **Wait** — After showing the plan, stop. Let the user decide what to do next.
