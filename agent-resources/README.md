# Agent Resources

The bots' HR office. Its main record is the **time card**: every agent and subagent that works on an Et repo clocks in before work and clocks out after. Et uses it to see who is working, who stopped, and what each session cost.

## Clocking in

Do this before any other change.

1. Copy [TEMPLATE.md](TEMPLATE.md) to `timecards/<YYYY-MM-DD>-<HHMM>-<call-me>.md`. Use the clock-in time in UTC, for example `timecards/2026-10-12-1257-spud.md`.
2. Fill in the **Clock in** table.
3. Commit the card alone on your working branch and push it right away. The pushed branch is how Et sees you are working.

Write the card in the repo you work in. When a session works in more than one repo, it writes one card in the repo its first pull request targets and lists the other repos in the card.

## Clocking out

Do this as your last commit, including when you stop early.

1. Fill in the **Clock out** table on the same card.
2. Pick one outcome:
   - `finished/passed`: the work is done and its checks pass;
   - `finished/handoff`: the work continues with someone else. Name them in **Handoff to**, and say what is left in **Note**;
   - `finished/failed`: the work stopped without a usable result. Say why in **Note**.
3. Report tokens with a standing, the same way [the token cockpit](../docs/token-cockpit.md) does:
   - `measured`: the provider or its official client reported it. A Claude Code cloud session can read its own `usage` from the `get_session` tool. That figure updates only when a turn ends, so it leaves out the turn you clock out in. Write `measured, partial` and say which turns it covers in **Note**;
   - `estimated`: you calculated it. Name the method in **Note**;
   - `unavailable`: nothing exposed it. Leave **Tokens** blank. Missing is not zero.
4. In a repo whose CI checks a proof bundle, the clock-out changes the code the bundle's digest covers. Clock out, then regenerate the proof bundle and push both together.

## Fields

| Field | What to write |
| --- | --- |
| Name | The product name: Claude, Codex, Grok |
| Call me | The name you want to be called at work. Pick one and keep it for the session |
| Model | The model the session runs on, with its ID when you can read it |
| Effort | The effort or reasoning level, or `unavailable` |
| Role | Your job from [roster.json](../roster.json) or [bots/](../bots/), such as Builder or Reviewer. Subagents write `Subagent of <parent's call-me>` and their job |
| Task | One line |
| Ticket | `owner/repo#n` for the issue or pull request. With none, write `none` and rely on the clock-in time |
| Repo and branch | Where your commits go |
| Launched by | Et, or the parent agent's call-me name for a subagent |
| Session | Session link or ID, so Et can open the transcript |
| Clock in, Clock out | UTC, `YYYY-MM-DD HH:MM` |
| Pull requests | The pull requests the session opened or updated |
| Handoff to | Who picks up the work, or `none` |
| Note | Anything Et needs to know, in a sentence or two |

## Rules

- **One card per session.** Never edit another agent's card. Separate files keep two agents who clock in together from causing a merge conflict.
- **Subagents clock in too.** A subagent that can write files adds its own card to its parent's branch. Otherwise the parent writes it from what the subagent reports, and says so in **Note**.
- **A missing clock-out means the session's status is unknown.** Under [AGENTS.md](../AGENTS.md), a builder session with unknown status still holds the builder slot.
- **No secrets.** No tokens, keys, account emails or raw transcripts on a card. Session IDs and links are fine.

## Known limit

A card reaches `main` only when its pull request merges. Until then it lives on the agent's pushed branch. To see who is clocked in right now, look at open branches and pull requests for cards with no clock-out time.
