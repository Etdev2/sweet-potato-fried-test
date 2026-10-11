# Sweet Potato fried test

This repo is a pop quiz for Et's bots. It is a copy of the [Sweet Potato](https://github.com/Etdev2/sweet-potato) control room at commit `7a010d5`. Et posts tasks as GitHub issues. Claude and ChatGPT complete them with the skills, concepts and goals the template defines.

The quiz material includes screenshots of a dashboard template from Theo. Et adds them with the tasks.

The goal is the same as the template's. An agent has one obvious path, invalid states fail early, and every change carries proof from the real application.

Automatic merge is out of scope. Et merges every pull request.

## What differs from the template

- The template's proof bundle is gone. It proved a Sweet Potato pull request, not anything in this repo. The first pull request here writes a new one with `scripts/write-proof.sh`.
- [projects.json](projects.json) still lists Money Machine, the template's only project. The quiz has no entry yet. The registry accepts two lanes, `rust-service` and `typescript-web`, and Et has not chosen one for the quiz.
- Sweet Potato's issues, work queue and pull requests stay in the template repo. Only the files came across.

Everything else matches the template, including the rules in [AGENTS.md](AGENTS.md) and the language in [CONTEXT.md](CONTEXT.md).

## How work moves

1. Et posts a task as an issue.
2. Et marks the ticket ready with `ready-for-agent` and names its builder.
3. The builder takes that one ticket, works on its own branch and commits a proof bundle with the change.
4. A reviewer from a different model family checks the fixed diff on two separate axes, repository standards and the originating ticket.
5. Et reads the proof and the review, then merges or sends the work back.
6. Repeated corrections become architecture, types, lint rules or CI checks through pstack's `correct` discipline.

The template names Claude as builder and Codex as reviewer. Et can name a different builder on any ticket.

## Foundation files

| File | What it controls |
| --- | --- |
| [projects.json](projects.json) | Registered projects, trust stage, language lane and production authority |
| [roster.json](roster.json) | Hired bots and the active-builder cap |
| [skills/registry.json](skills/registry.json) | Reviewed upstream skills, pinned source commits and when each skill runs |
| [docs/agent-environment.md](docs/agent-environment.md) | The complete outer-loop and inner-loop contract |
| [docs/strict-lanes.md](docs/strict-lanes.md) | Required checks for Rust and TypeScript projects |
| [docs/token-cockpit.md](docs/token-cockpit.md) | Provider-neutral usage ledger and future dashboard |
| [bots/sweet-potato.md](bots/sweet-potato.md) | Grok Bot outer-loop job description |
| [bots/potato-architect.md](bots/potato-architect.md) | Architecture, Wayfinder, spec and ticket job description |
| [bots/claude-builder.md](bots/claude-builder.md) | Builder job description |
| [bots/codex-reviewer.md](bots/codex-reviewer.md) | Two-axis reviewer job description |
| [docs/poteto-playbook.md](docs/poteto-playbook.md) | Lauren Tan's trust and verification approach |
| [AGENTS.md](AGENTS.md) | Rules every bot follows in this repo |

## Skill composition

This repo inherits Sweet Potato's skill registry. It does not install every public skill. The registry composes a smaller workflow:

- Matt Pocock skills for grilling, Wayfinder planning, specs, tickets, domain modeling and two-axis review.
- Pstack skills for architecture, verification, type discipline, blast radius, correction, decision trails and plain writing.
- Project-local skills for the commands and proof that only that project can define.

Upstream sources stay pinned until a pull request reviews a newer commit. See [ADR 0003](docs/adr/0003-pin-and-compose-upstream-skills.md).

## Correctness lanes

Every project chooses a lane before its first build:

- `rust-service` for correctness-critical services, CLIs and workers where Rust's type system can make illegal states difficult to express.
- `typescript-web` for Next.js and product UI, with strict TypeScript, typed boundaries, architecture lint and browser verification.

Rust is an option, not a rewrite mandate.

## Spending and authority

- Use each provider's official tool and Et's own account.
- Paid extras remain off.
- Record measured, estimated and unavailable usage separately. Never invent missing token or cost data.
- One builder runs at a time.
- Project production writes, migrations and paid model runs remain disabled until the project registry explicitly allows them.
- Et merges every pull request.
