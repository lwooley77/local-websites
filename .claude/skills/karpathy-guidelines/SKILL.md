---
name: karpathy-guidelines
description: Coding discipline to avoid over-building and drive-by edits. Use when editing a demo's src files, the shared kit, or any code in this repo.
---

# Karpathy guidelines (adapted)

Source: github.com/multica-ai/andrej-karpathy-skills (MIT). Adapted for autonomous runs: where the original says "ask", log the assumption in the site's DECISIONS.md and continue.

1. **Think before coding.** State assumptions. If several readings exist, pick the most likely one and log it. If a simpler approach exists, use it.
2. **Simplicity first.** Minimum code that solves the task. No speculative features, no single-use abstractions, no configurability nobody asked for. If 200 lines could be 50, rewrite.
3. **Surgical changes.** Touch only what the task needs. Match existing style. Don't refactor or "improve" adjacent code. Remove only the orphans your own change created.
4. **Goal-driven execution.** Turn the task into a check, e.g. "`python sites\_kit\qa.py sites\<slug>` exits 0 and the screenshots show X". Loop until it's verified.
