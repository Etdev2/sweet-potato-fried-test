# Sweet Potato control room

This repo defines the environment in which Et's bots work. Application code lives in registered project repos.

Before changing the control room:

- Use the language in [CONTEXT.md](CONTEXT.md).
- Read [docs/agent-environment.md](docs/agent-environment.md).
- Read the ADRs before changing tools, authentication, language lanes or skill sources.
- Treat [projects.json](projects.json), [roster.json](roster.json) and [skills/registry.json](skills/registry.json) as sources of truth.
- Read [docs/poteto-playbook.md](docs/poteto-playbook.md) before changing the trust ladder or bot order.

## Rules

| Rule | Enforcement |
| --- | --- |
| A builder receives work only after the project has a verification command and required checks. | Configuration check: `scripts/check-projects.sh` in CI rejects a project past stage 0 without them. It does not stop a dispatch or prove the checks run; that remains a soft rule plus each project repo's CI |
| Only Et marks a ticket ready and names its builder. Bots may propose readiness. | Soft rule: [ADR 0006](docs/adr/0006-et-authorizes-ready-work.md) and each bot's job contract. Bot tokens can add labels |
| Work larger than one agent run or with unresolved architecture begins with a Wayfinder map. | Review rule and Potato Architect's job contract |
| One ticket has one builder, one branch, one active attempt and one acceptance contract. | Soft rule: review and the builder and reviewer contracts |
| One builder session runs at a time across all tickets. Et starts the next only after confirming the last one stopped. A session whose status is unknown occupies the slot. | Soft rule: Et launches builders by hand; builder and reviewer contracts. `scripts/check-roster.sh` checks only the roster's `active` count, not running sessions |
| A different model family reviews the builder's pull request. | Soft rule: roster and pull-request review |
| Reviews separate standards compliance from spec compliance. | Soft rule: pull-request template and [Codex reviewer contract](bots/codex-reviewer.md) |
| Every roster bot has a one-job contract in `bots/`. | `scripts/check-roster.sh` in CI |
| Every agent and subagent clocks in on an [Agent Resources](agent-resources/README.md) time card before work and clocks out after, with its outcome and token standing. | Soft rule: review. A card with no clock-out marks the session's status as unknown |
| Repeated corrections become hard checks at the highest useful level. | Pstack `correct`; rule table updated in the affected project |
| Active builders do not exceed `cap.buildersAtOnce`. | `scripts/check-roster.sh` in CI |
| Upstream skills use reviewed, pinned commits. | `skills/registry.json` and `scripts/check-control-room.sh` |
| Usage reporting labels data as measured, estimated or unavailable, and never contradicts its label. | Token event schema, tested against valid and invalid fixtures in CI. No collector exists yet, so real events are checked by review only |
| Tokens, keys and webhook URLs never enter a commit. | Review; secrets live in provider or GitHub secret stores |
| Et is the only merge authority. | Soft rule until the GitHub plan can enforce branch protection |
| Prose follows the selected `unslop` skill. | Review |

## Required pull-request evidence

Every implementation pull request links its ticket or spec and contains:

- the fixed comparison point;
- the smallest useful before-and-after explanation;
- commands run and their exit results;
- proof from the real application when behavior changed;
- unresolved risks or `none`;
- a blast-radius statement;
- measured usage when available, otherwise `unavailable`.

Green unit tests are not proof of a user-visible change by themselves.

## Language rules

The registered project lane owns the mandatory checks. Do not weaken a lane to make generated code pass. Fix the code or make a reviewed ADR explaining the exception.

Rust projects forbid unsafe code by default and fail CI on compiler or Clippy warnings. TypeScript projects use strict compiler flags, typed boundary parsing, type-aware lint and browser verification. See [docs/strict-lanes.md](docs/strict-lanes.md).

## Skill rules

- Use the skill registry as routing, not as a reason to load every skill.
- A project-local verification skill overrides generic verification advice because it knows the real application.
- Do not silently update upstream skills. Update a pin in a pull request and state what changed.
- Keep upstream attribution and licenses.

## Code review rules

### Standards axis

- Check these rules, the selected lane and the project's own `AGENTS.md`.
- Flag weakened types, suppressed lint, unparsed external data, missing proof and unrelated changes.

### Spec axis

- Check the originating ticket or spec independently of the standards review.
- Flag missing acceptance criteria, invented scope and behavior not supported by proof.

### Control-room data

- `projects.json`, `roster.json`, `skills/registry.json` and JSON schemas remain valid.
- A new role requires an updated roster check and a one-job bot contract. The roster check fails when a bot's `contract` file is missing, shared with another bot, or headed with another bot's name.
- A new ADR uses the next number in `docs/adr/`.
