# Sweet Potato

Sweet Potato is Et's reusable control room for AI-assisted software projects. Grok Bot runs the outer loop, Potato Architect maps unclear work, Claude builds one ready ticket at a time, Codex reviews independently, and Et decides what merges.

The goal is not the largest bot roster. The goal is a repository where an agent has one obvious path, invalid states fail early, and every change carries proof from the real application.

Automatic merge is out of scope. Et merges every pull request until a later decision changes that authority.

## How work moves

1. Sweet Potato collects a request, bug report or code signal through the outer loop.
2. If the route is unclear or larger than one run, Potato Architect creates a Wayfinder map of decision tickets.
3. Potato Architect turns a resolved map into a spec and small, blocked tickets. Sweet Potato writes the ticket directly when the route is already clear.
4. Either bot may propose a ticket as ready. Et marks it ready and names the builder.
5. Claude takes that one ticket, works on its own branch and attaches proof.
6. Codex reviews the fixed diff on two separate axes: repository standards and the originating spec.
7. Et reads the proof and review, then merges or sends the work back.
8. Repeated corrections become architecture, types, lint rules or CI checks through pstack's `correct` discipline.

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
| [AGENTS.md](AGENTS.md) | Rules every bot follows in this control room |

## Skill composition

Sweet Potato does not install every public skill. The registry composes a smaller workflow:

- Matt Pocock skills for grilling, Wayfinder planning, specs, tickets, domain modeling and two-axis review.
- Pstack skills for architecture, verification, type discipline, blast radius, correction, decision trails and plain writing.
- Project-local skills for the commands and proof that only that project can define.

Upstream sources stay pinned until a pull request reviews a newer commit. See [ADR 0003](docs/adr/0003-pin-and-compose-upstream-skills.md).

## Correctness lanes

Every project chooses a lane before its first build:

- `rust-service` for correctness-critical services, CLIs and workers where Rust's type system can make illegal states difficult to express.
- `typescript-web` for Next.js and product UI, with strict TypeScript, typed boundaries, architecture lint and browser verification.

Rust is an option, not a rewrite mandate. Money Machine remains in its TypeScript lane unless a separate architecture decision proves that moving a bounded component to Rust reduces total risk.

## Spending and authority

- Use each provider's official tool and Et's own account.
- Paid extras remain off.
- Record measured, estimated and unavailable usage separately. Never invent missing token or cost data.
- One builder runs at a time.
- Project production writes, migrations and paid model runs remain disabled until the project registry explicitly allows them.
- Et merges every pull request.

## First pilot

Money Machine is the first candidate project. It stays at `stage-0-unverified` until it has a project-local verification skill, a feature map, a known fixture and CI that rejects a pull request without its required proof.

## Setup sequence

- [x] Create the control room.
- [x] Define the agent environment, strict lanes and pinned skill registry.
- [x] Add Potato Architect as a proposed Grok Bot.
- [ ] Resolve the open Wayfinder decisions.
- [ ] Install and test the selected skills through official provider tools.
- [ ] Create Money Machine's verification skill and proof check.
- [ ] Connect Claude and Codex to Money Machine.
- [ ] Run one reversible ticket through the complete supervised workflow.
- [ ] Measure rework, proof quality, review time and provider usage before adding a second builder.
