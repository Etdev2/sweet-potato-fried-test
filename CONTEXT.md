# Sweet Potato

Et's environment for turning outside requests into reviewed pull requests with evidence.

## Places

**Control room**
This repository. It owns the roster, registered projects, skill registry, trust rules and shared workflow.

**Project repo**
A repository where bots build an application. It owns its architecture, verification skill and hard checks.

## Bots

**Bot**
An AI worker on the roster with one primary job.

**Sweet Potato**
The Grok Bot that runs the outer loop. It collects signals, routes unclear work to Potato Architect, writes tickets for work whose route is clear, proposes them as ready and reports what needs Et.

**Potato Architect**
The Grok Bot that turns unclear or large work into a Wayfinder map, architecture sketch and explicit decisions, then writes the spec and blocked tickets once the map resolves. It does not implement application code.

**Builder**
The bot Et names on one ready ticket. It turns that ticket into a pull request with proof.

**Reviewer**
A bot from a different model family that checks the fixed diff against standards and the originating spec. Its verdicts inform Et. It does not accept or merge work.

**Roster**
The source-of-truth list of hired bots and the builder cap.

**Hire**
Adding a bot to the roster after Et approves its one-job contract.

**Cap**
The most builders allowed to run at the same time.

**Handshake**
The first confirmed two-way exchange between Et's bots through GitHub. One bot posts a request in an issue, the other answers with a comment and a draft pull request, and the first confirms receipt on that pull request. Run one whenever a new agent joins, before it receives work. It grants no authority to start work. Et named it on 2026-10-11 after the first handshake between Claude and Codex (issue #1, pull request #3).

## Work

**Outer loop**
Turning requests, bug reports, usage signals and code signals into routed work. Sweet Potato owns it.

**Wayfinder map**
The canonical GitHub issue for work whose route is unclear or larger than one run. Its child decision tickets remove uncertainty before implementation begins.

**Decision ticket**
A question that must end in a recorded decision, prototype result or cited research. It is not an implementation slice.

**Ticket**
One vertical implementation slice a builder can complete in one run.

**Readiness proposal**
A bot's comment saying a ticket meets the ready contract. It grants no authority to start work.

**Ready**
A ticket whose goal, authority, acceptance criteria, proof and blockers let a builder finish without asking a material question, and which Et has marked with `ready-for-agent` and assigned to a named builder. Only Et makes a ticket ready.

**Attempt**
One builder's run at one ready ticket, on one branch. While `cap.buildersAtOnce` is 1, at most one attempt is open across all tickets, and an attempt whose status is unknown counts as open. It ends when its execution has stopped, not when its pull request closes.

**Inner loop**
Turning one ready ticket into a reviewed pull request with proof.

## Correctness

**Language lane**
The mandatory compiler, lint, test and verification profile registered for a project.

**Proof**
Evidence produced by running the real artifact the way a user or operator does. It may include screenshots, traces, logs and terminal output.

**Proof bundle**
The `proof/` folder a pull request commits: a manifest tied to the exact code by its digest, plus the evidence files. See [ADR 0005](docs/adr/0005-commit-a-proof-bundle-with-every-pull-request.md).

**Hard check**
A machine-enforced rule that fails before a pull request is eligible to merge. A check that runs only after an unprotected direct push is not a merge gate.

**Soft rule**
A written rule that a person or bot must remember.

**Candidate trusted PR**
A merged pull request that passed every available hard check, includes required proof, cleared both review axes and required no code edit from Et.

**Trusted PR**
A candidate trusted PR that has not been reverted within seven full days.

**Scoreboard**
The weekly count of candidate and seven-day trusted pull requests, shown separately.

**Trust stage**
The registered authority level for one project:

- `stage-0-unverified`: no builder runs;
- `stage-1-supervised`: one builder runs and Et inspects every step;
- `stage-2-proven`: one builder can finish a ticket asynchronously, but Et still merges.

Automatic merge requires a future decision and is not a current trust stage.

## Usage

**Usage event**
One provider-neutral record for an agent run, linked to its project and ticket.

**Usage standing**
The confidence attached to usage data: `measured`, `estimated` or `unavailable`.

**Token cockpit**
The future interface that groups usage events by provider, model, bot, project and outcome without treating missing data as zero.
