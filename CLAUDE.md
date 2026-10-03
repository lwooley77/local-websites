# Code words

## "banana"

When the user says "banana" (alone or in a message), install the web design plugins:

1. Load `SearchPlugins` and `SuggestPluginInstall` with ToolSearch if they aren't loaded.
2. Run `SearchPlugins` for "frontend-design", "Design" and "Sitelemetry" to get current plugin IDs.
3. Call `SuggestPluginInstall` with those three plugins:
   - `frontend-design` (Anthropic's official frontend design skill)
   - `Design` (accessibility review, design critique, design system, handoff, UX copy)
   - `Sitelemetry` (website audit, pre-launch check, fix and retest)
4. Tell the user to tap the card to enable them. Plugins can't be enabled from inside a session, so the user has to confirm.
5. On a follow-up, call `ListPlugins` to confirm what got enabled.
