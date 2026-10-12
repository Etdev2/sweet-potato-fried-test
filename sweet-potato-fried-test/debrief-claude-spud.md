# Debrief: Claude (Spud), cloud session

| | |
| --- | --- |
| Author | Claude, Opus 5.5, Claude Code cloud session `session_01CHreuwNWy6p391tkqf1EGi` |
| Written | 2026-10-12 |
| Sources | Fried Test issues #1, #6 and #9; PRs #3, #4, #5, #7 and #8; Sweet Potato #21 and PR #22 |

I did not take part in the test. Other Claude sessions on Et's Mac did the Claude work. This session read the GitHub record afterwards, so this debrief reviews that record and has no memory of the work. Where I write "Claude", I mean those sessions.

## What worked

- **The handshake.** Two model families coordinated through issues and draft pull requests without a launcher. GitHub works as the shared desk.
- **Codex's reviews.** PR #8's review is the model to copy: exact base and head, separate Standards and Spec verdicts, and a runnable reproducer that showed each false "Setup complete". The re-review ran the same reproducer against the fix.
- **Honest limits.** Agents wrote INCONCLUSIVE when they could not prove something: live login, visual fidelity, Claude quota telemetry. Claude left the usage collector unbuilt rather than ship it unverified.
- **Respect for the one-builder rule.** Claude declined to fix the #7 data bug while Codex held #9, which covers the same files. Both Mac agents treated the unknown cloud session as holding the slot.
- **Privacy.** Claude did not commit the reference screenshot, because it showed a person's face.

## What Claude could have done differently

1. **Waited for the two-axis review before merging #7.** Claude merged on Codex's native review ("no major issues"), which looks for serious bugs and does not check standards or spec. The two-axis review that followed found a skill provenance failure and a real data bug. Merge on the review the rules require, not the first green signal.
2. **Checked skill provenance before invoking a skill.** Claude Code's Skill tool loaded the installed `tdd` and Wizard plugins, not the registry's pinned commits. Only skills vendored under `.claude/skills` arrive at the pin. Check where a skill loads from before you use it, and diff it against the pin when it matters.
3. **Tested the failure paths of anything that reports success.** The first launcher wizard printed "Setup complete" after failed uploads, a failed sign-in and an empty token. A success message is a claim. Each path that can fail needs a test that shows it does not report success.
4. **Classified the proof honestly.** The same pull request marked a new operator-facing script as `behaviorChanged: false`. A new executable is new behavior.
5. **Applied "missing is not zero" to the page.** The quota card showed "50% of 200%" when half its credentials had no reading. The token cockpit's rule applies to any total built from partial data: say it is partial, or show it as unavailable.

## What the other agents could improve

1. **Publish before handing off.** The Codex cloud task handed off commit `18fdf9c`, which was never pushed. Nobody could review it, and its unknown status blocked every other builder. Push first, read back the remote branch and full SHA, and only then announce the handoff.
2. **Leave a runtime ID and a stop receipt.** Without them, nobody can confirm a session stopped, and the builder slot stays held. The time card in `agent-resources/` is a first step: a card with no clock-out shows the slot is still in use.
3. **Check before claiming done.** On the handshake, Codex first reported completion while its file write had been denied. It corrected itself quickly, but the claim should come after the check.
4. **Shorter status comments.** Issue #6 and #9 comments often ran several hundred words and repeated earlier approvals. Each re-read costs the next agent tokens. One short checkpoint that the agent edits in place would serve better than a new long comment each time.
5. **Read every review channel.** Findings came as PR reviews, review threads and issue comments. An agent that reads only one of them misses blocking work.

## For the workflow

- **Authority lived in chats.** Et's "auto merge" and "activation approved" were given in VS Code, ChatGPT and phone chats, then relayed by the bots. `AGENTS.md` still says Et is the only merge authority. If delegated merges are wanted in the test repo, write that into its rules. Otherwise agents end up quoting each other's reports of what Et said.
- **Measured usage is available in cloud sessions.** Every report in the test said usage was unavailable. A Claude Code cloud session can read its own token counts from `get_session`, so cloud builders should report `measured`. The count can lag behind the current turn, so a clock-out read mid-turn is partial and should say so.
- **The Mac differs from CI.** Bash 3.2, Node 22.11, low disk space, `claude` missing from `PATH`, and permission refusals on local session logs all surfaced on the Mac and not on Linux CI. A short host check before verification would surface these at the start of a run.
- **Rushing showed in merge timing, not in code quality.** The code that broke had been checked against its happy path only. The fixes that worked came from a reviewer who ran the failure cases.

## Usage

This debrief and the time card were written in the session named above. Its measured token count is on its time card in `agent-resources/timecards/`.
