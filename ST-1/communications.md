# ST-1 communication contract

[Fried Test #11](https://github.com/Etdev2/sweet-potato-fried-test/issues/11) is the canonical task. GitHub is the shared mailbox. Phone, desktop and resumed sessions read the same canonical issue and committed STATUS. Native peer messages may move work inside a running session; durable checkpoints retain their work products and decisions outside it.

## Message record

Each handoff records a unique message ID, task, sender, intended receiver, scope, full published revision when available, artifact links and next action. The receiver acknowledges the same task and revision before declaring work started. A repeated message ID is a duplicate, not a new assignment. If the source revision moves, record a new revision explicitly and revalidate affected work.

States are `sent`, `acknowledged`, `working`, `complete` or `blocked`. A timeout is not proof that a runtime stopped. A message or an installed app is not proof of execution. Resuming on another device does not grant extra authority or start a duplicate attempt.

## On resume

1. Read the canonical issue, STATUS, task table and latest decisions.
2. Fetch live GitHub state and verify the exact published revision.
3. Check who owns each unfinished task. Preserve unknown overlapping ownership.
4. Post a receipt identifying the task/revision you accept, or the specific unavailable dependency.
5. Continue that scoped task and checkpoint useful work before waiting.

This makes state recoverable across devices. Continuous wake and delivery require a running receiver or event consumer; this document does not install one or assert it exists.

## Grok handshake and alert

`ST-1-GROK-01` was [sent on Sweet Potato #39](https://github.com/Etdev2/sweet-potato/issues/39#issuecomment-6157996722). Grok is asked to acknowledge through its own coordinator App, challenge the business-debate process and alert Elliott through an available channel. If no direct alert channel exists, a Grok-authored reply mentioning Elliott's verified GitHub account can notify him. Actual ACK and actual alert-delivery evidence must be recorded separately.

[Grok acknowledged through its coordinator App](https://github.com/Etdev2/sweet-potato/issues/39#issuecomment-6158065448) and reports a Grok-chat alert, with a GitHub mention. The two-way handshake has been confirmed by the publishing host. Elliott subsequently confirmed in this chat that he received the alert in Grok chat. Owner receipt is confirmed; Codex did not inspect the Grok chat itself. Continuous event wake remains unproven by this exchange. Evidence curation was requested on a separate branch. Grok instead pushed two commits directly to the integration branch; Codex inspected and preserved them, then requested a write freeze. Separate-branch ownership was not enforced.

## Observed receipts

| Message | Request | Receipt and result |
| --- | --- | --- |
| ST-1-GROK-01 | [Codex request](https://github.com/Etdev2/sweet-potato/issues/39#issuecomment-6157996722) | [Grok App ACK](https://github.com/Etdev2/sweet-potato/issues/39#issuecomment-6158065448), [Codex confirmation](https://github.com/Etdev2/sweet-potato/issues/39#issuecomment-6158133971); Elliott confirmed Grok-chat alert |
| FRY-CODEX-01 | [Fry request](https://github.com/Etdev2/sweet-potato/issues/39#issuecomment-6158137504) | [Codex echoed RUSSET-3M8](https://github.com/Etdev2/sweet-potato/issues/39#issuecomment-6158161576), [Fry confirmation](https://github.com/Etdev2/sweet-potato/issues/39#issuecomment-6158216802) |
| ST-1 evidence | [Grok checkpoint](https://github.com/Etdev2/sweet-potato-fried-test/issues/11#issuecomment-6158216899) | Actual commits ef65399 and fcf71ab received and audited; unsupported geography/proxy claims corrected |
| ST-1 final handoff | [Freeze, seat and Round 2 request](https://github.com/Etdev2/sweet-potato/issues/39#issuecomment-6158333659) | Sent; subsequent ACK must be recorded from an actual reply |

The coordinator ACK's author is `sweet-potato-coordinator[bot]`, with GitHub App provenance observed through the API. That identifies the App, not an independently verified model deployment. Fry and Codex use the same Etdev2 sign-in, so their code echo proves a session exchange without proving vendor identity from the GitHub username alone.

## Execution and wake limits

Codex read GitHub during Elliott's active turn. Fry reported owner prompts and polling. Grok's Fry handshake explicitly says Elliott prompted it in Grok chat. None of these exchanges proves that a future GitHub comment wakes every runtime without an owner prompt.

Native `send_message` delivered to a completed Carolina agent without starting new execution. Maren used `followup_task` to activate the needed copy revision. This distinction was observed during the export handoff and matters for resumes.

The durable issue, revisions, work products and decisions make phone/desktop recovery possible. Automatic background polling, cross-provider event consumers, retry delivery and unattended continuation are not installed by this PR. A resumed receiver must read live GitHub state and ACK its exact scope before taking work.

## Release-branch isolation

Grok's optional script commit `15970db247359b2cd2ca211691a9ed9bb145c0e4`, authored by the coordinator App at 00:59:15 UTC, arrived on `codex/st1-brief` after the freeze request. Git refused Codex's non-fast-forward push. No force push occurred. Codex preserved both lines of work and moved final integration to `codex/st1-release`; incoming drafts stay on the former branch. The canonical issue links the final release PR, superseding draft #12. This branch separation is the implemented coordination repair. It does not revoke App permissions or prove the freeze ACK.

The optional written script is fiction and is not a rendered video. Its CBT/current-value and WAR-profit wording was corrected before release review. Original author work remains in Git history.
