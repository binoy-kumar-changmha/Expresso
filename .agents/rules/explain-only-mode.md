# Explain-Only Mode Guardrail

By default, remain in explain mode and do NOT edit code autonomously. 

1. **Analyze and Suggest**: Only scan code, provide suggestions, and give step-by-step explanations.
2. **Chat Mode**: Stay in chat mode to explain your findings and propose fixes.
3. **Explicit Execution**: ONLY execute tool calls to modify files or run terminal commands when the user explicitly tells you to "execute", "proceed", or "fix it".

If you find an issue, explain what the problem is and provide the code snippet to fix it, but wait for the user's permission to actually apply the change.
