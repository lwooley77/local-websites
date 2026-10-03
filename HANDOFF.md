# HANDOFF

Read this file first. Do not re-explore or re-search anything listed under "Done". Start at "Next".
Update the Status line of a thread when you change it, and keep this file under ~80 lines.

Repo: `lwooley77/local-websites` (default branch `main`). Contents: `README.md`, `CLAUDE.md`, `HANDOFF.md`. No website code yet.
User preference: wants fewer tokens spent. Act, don't survey. Recommend one option instead of listing many.

## Thread 1: Web design skills and plugins
Status: partly done, waiting on the user to tap install cards.
- Already enabled on the account, so don't suggest them: minimalist-ui, industrial-brutalist-ui, emil-design-eng, image-to-code, imagegen-frontend-web, mobile-native, stitch-design-taste, redesign-existing-projects, high-end-visual-design, gpt-taste, design-taste-frontend.
- Not enabled (the user must tap the card, and Claude can't enable them): `frontend-design` (plugin_011XJXyLY2skJXTKdTJcsNBn), `Design` (plugin_01BJyUTWdE5wt92pvTVz4hdN), `Sitelemetry` (plugin_01EN8Xwvtz5L8dUtWW2jkfVU).
- Optional, not offered as a card yet: Simple Host (plugin_015gfbGeRFtyYkZAw4m1jQnb), which publishes a site to its own address.
- Not in the catalog (external tools): Relume MCP, Storybook MCP, daisyUI, Forever Components. daisyUI: `npx skills add saadeghi/daisyui --agent claude-code --yes` (untested).
- Next: `ListPlugins` to see what the user enabled. Don't re-run the searches.

## Thread 2: "banana" code word
Status: done and merged (PR #1). See `CLAUDE.md`.
- Saying "banana" in a session on this repo makes Claude run `SearchPlugins`, then show the `SuggestPluginInstall` card for the three plugins above.
- Works only in sessions on this repo. For regular claude.ai chats, the instruction would have to go into account preferences or Project instructions (not done).

## Thread 3: Build the user's websites
Status: not started. The repo has no site code.
- Next: ask what the first site is (purpose, audience, stack). Default to plain HTML/CSS/JS unless the user says otherwise.
- Once `frontend-design` is enabled, use it for the visual direction. Use `mobile-native` for phone polish.

## Thread 4: Handoff process
Status: this file.
- When the user says "handoff", update this file: move finished items to Done, rewrite Next, then commit.

## Environment notes
- Plugins can't be installed from inside a session. Only a card plus a user tap works.
- Git: don't commit to `main`. Use a branch and open a draft PR.
- GitHub tools are MCP only (no `gh` CLI). Load them with ToolSearch.
