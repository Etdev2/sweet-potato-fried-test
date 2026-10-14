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

Until a reply arrives, the Grok path remains `sent`, not `acknowledged`. Continue independent native-team work. Keep setup/authentication details out of this public handoff.
