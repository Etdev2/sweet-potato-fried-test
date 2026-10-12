# Sweet Potato Fried Test

Debriefs from the Fried Test, Et's first knowledge stress test of his bots. Each agent that took part adds its own file here as `debrief-<agent>-<call-me>.md`.

## What the test was

On 2026-10-11 Et copied this control room into [Etdev2/sweet-potato-fried-test](https://github.com/Etdev2/sweet-potato-fried-test) at commit `7a010d5`. He posted tasks there as GitHub issues and had Claude and Codex complete them with the template's rules: one named builder per ticket, a reviewer from the other model family, a proof bundle on every pull request, and Et as merge authority. The test checked whether the bots could work together through GitHub, follow the written rules under time pressure, and prove their work on real artifacts.

The agents ran in several places: Claude Code in VS Code on Et's Mac, Codex in ChatGPT on the Mac and phone, a Codex cloud task, and Codex's native GitHub reviewer.

## What happened

| Task | Builder | Result |
| --- | --- | --- |
| [#1](https://github.com/Etdev2/sweet-potato-fried-test/issues/1) Handshake | Codex, [PR #3](https://github.com/Etdev2/sweet-potato-fried-test/pull/3); Claude, [PR #4](https://github.com/Etdev2/sweet-potato-fried-test/pull/4) | Passed. The bots confirmed a two-way exchange through an issue and a draft pull request. Claude added **Handshake** to the vocabulary. |
| [#2](https://github.com/Etdev2/sweet-potato-fried-test/issues/2) Skill trial | Codex, [PR #5](https://github.com/Etdev2/sweet-potato-fried-test/pull/5) | Passed as preparation. Pinned Wizard and verification skills for dashboard setup helpers. Live dashboard login stayed INCONCLUSIVE. |
| [#6](https://github.com/Etdev2/sweet-potato-fried-test/issues/6) Quiz 1: quota page from a screenshot | Claude, [PR #7](https://github.com/Etdev2/sweet-potato-fried-test/pull/7) | Built and merged: strict TypeScript, 43 unit tests, 23 browser tests, screenshots in the proof bundle. Codex's review came after the merge: Standards FAIL on skill provenance, Spec INCONCLUSIVE, and one data bug. |
| [Sweet Potato #21](https://github.com/Etdev2/sweet-potato/issues/21) Claude launcher wizard | Claude, [PR #8](https://github.com/Etdev2/sweet-potato-fried-test/pull/8) | First head failed review: it reported success after failed steps. Repaired with 12 failure-path tests, passed re-review, merged. Live setup is still unrun. |
| [Sweet Potato #21](https://github.com/Etdev2/sweet-potato/issues/21) Automation runbook | Codex, [Sweet Potato PR #22](https://github.com/Etdev2/sweet-potato/pull/22) | Plan reviewed by Claude and merged. Nothing activated. |
| [#9](https://github.com/Etdev2/sweet-potato-fried-test/issues/9) Live account panel | Codex cloud task | BLOCKED. The candidate commit `18fdf9c` was never pushed, and the cloud session's status stayed unknown, so no other builder could start. Codex ran Matt Pocock's `retro` skill on the outcome. |

## Where to read more

- The pull requests and issues above hold every review, proof bundle and handoff.
- Codex's ranked retro is the [last comment on #9](https://github.com/Etdev2/sweet-potato-fried-test/issues/9#issuecomment-6115446419).
- [debrief-claude-spud.md](debrief-claude-spud.md) is the first debrief in this folder.
