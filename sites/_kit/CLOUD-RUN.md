# Unattended cloud run (laptop closed)

Use this when a Claude Code cloud session or routine runs on this repo with nobody watching.

1. Setup (once per run):
   `pip install pillow playwright`, then `python -m playwright install --with-deps chromium`
   Paths in the brief use Windows separators. On Linux, use `/`.
2. Take the top 2 leads from `sites/_kit/QUEUE.md`. Build each one per `sites/_kit/AGENT-BRIEF.md`, using a subagent with model `sonnet`, at most 2 at a time. No photo downloads in unattended runs; photos are added in attended sessions.
3. A demo counts as done only when `python sites/_kit/qa.py sites/<slug>` exits 0 and STATUS.md exists. A lead with its own website gets `SKIP.md`.
4. Remove the finished or skipped lines from QUEUE.md.
5. `python sites/_kit/portfolio.py` (output is gitignored, so this is just a check that it runs).
6. Commit with the message "Demo: <name> (<city>)" and push to the branch `demos/<date>`. Never push to main and never deploy. mk reviews and merges.
7. Never send messages, never publish or deploy, never create accounts, never spend money.
8. End with a report of 300 words or fewer: built, skipped, QA results, the pitch hook for each.
