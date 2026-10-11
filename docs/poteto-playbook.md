# Poteto playbook

Sweet Potato runs Et's bots using the public approach Lauren Tan, known online as poteto, has described. This file records the parts selected for Et's environment. Sweet Potato and Potato Architect apply the approach. They do not speak as Lauren.

Read this file before changing the roster, trust stages, verification requirements or the order bots unlock. Ask Et before spending money or changing merge authority.

## Sources

- [GrokBot team workshop](https://www.youtube.com/watch?v=_zWMTyKxMt4), August 2026.
- [Poteto on shipping 1,000s of PRs a month](https://www.youtube.com/watch?v=MN9dGgmLyso), October 2026.
- [Pstack](https://github.com/backnotprop/pstack), MIT licensed and pinned in `skills/registry.json`.

## Climb the trust ladder

Trust decides how many bots run and what they may do. Begin with one builder, inspect each step and convert failures into skills or hard checks. Add parallelism only after the environment proves that one builder can finish trustworthy work repeatedly. ([workshop 28:28](https://www.youtube.com/watch?v=_zWMTyKxMt4&t=1708s), [stream 1:31](https://www.youtube.com/watch?v=MN9dGgmLyso&t=91s))

## Verification comes first

The builder must run the real artifact the way a user or operator does. Each project gets a verification skill with a feature map before its first implementation ticket. The skill reports `PASS`, `FAIL` or `INCONCLUSIVE` and captures evidence. ([workshop 7:21](https://www.youtube.com/watch?v=_zWMTyKxMt4&t=441s), [stream 16:01](https://www.youtube.com/watch?v=MN9dGgmLyso&t=961s))

Without project-local verification, Et becomes the verification system and the project remains at `stage-0-unverified`.

## Hard checks beat soft rules

Architecture, types, lint and CI make bad changes fail. Prompts and style guides ask an agent to remember. When Et or a reviewer corrects the same mistake twice, use pstack's `correct` process at the highest useful level:

1. architecture;
2. types;
3. lint with a repair message;
4. behavior test;
5. documentation.

Prove the new check against the real mistake before calling it enforced. ([workshop 47:02](https://www.youtube.com/watch?v=_zWMTyKxMt4&t=2822s), [stream 31:52](https://www.youtube.com/watch?v=MN9dGgmLyso&t=1912s))

## Context, not control

Give bots enough verified context to answer routine questions. The control room provides the common language, registered authority, skill routing and trust stage. Each project provides its architecture, commands, fixtures and verification skill. ([stream 35:26](https://www.youtube.com/watch?v=MN9dGgmLyso&t=2126s), [stream 41:31](https://www.youtube.com/watch?v=MN9dGgmLyso&t=2491s))

## The executive chef and architect

Sweet Potato runs the outer loop. It groups related signals, chooses the route and proposes ready work. Et decides which ticket is ready and which builder takes it.

Potato Architect handles foggy or multi-session work. It creates the Wayfinder map, resolves decisions and sketches types and module boundaries. It does not write the application.

This separation keeps incoming work moving without turning the outer-loop bot into an unreviewed architect and implementer. The executive-chef model comes from Lauren's kitchen description. ([stream 11:20](https://www.youtube.com/watch?v=MN9dGgmLyso&t=680s), [stream 42:34](https://www.youtube.com/watch?v=MN9dGgmLyso&t=2554s))

## Code principles

Use one to three relevant principles in a ticket. State which decision each principle changed. A name with no changed decision is not evidence.

- **Build less.** Delete or reuse before adding. Make the smallest change that solves the outcome.
- **Design first.** Choose domain types and boundaries before control flow.
- **Types and boundaries.** Make illegal states difficult or impossible to construct. Parse external data once at the edge.
- **Proof.** Reproduce failures and verify fixes through the real artifact.
- **Safe changes.** Keep changes small, idempotent and reversible where possible.
- **Lessons.** Convert repeated corrections into structure.

## Buffer before fixing

One occurrence may be noise. Record repeated patterns before creating another implementation ticket. Every repeated class should point to the eventual hard-check pull request.

## Review everything before sampling

Et reviews every pull request in the current stages. Tasting merged work may reveal patterns, but it does not replace pre-merge review. Sampling and automatic merge require future evidence and a separate decision. ([stream 49:16](https://www.youtube.com/watch?v=MN9dGgmLyso&t=2956s))

## Small pull requests

Each pull request has one outcome, one originating ticket and one proof bundle. Small changes make review, reversal and learning easier. ([workshop 39:17](https://www.youtube.com/watch?v=_zWMTyKxMt4&t=2357s))

## Tokens are a budget

Spend on verification, types and checks before spending on additional bots. Token volume is not productivity. Compare useful outcomes, rework and Et's review time. ([workshop 50:39](https://www.youtube.com/watch?v=_zWMTyKxMt4&t=3039s))

## Bot order

| Bot or capability | Job | Unlock condition |
| --- | --- | --- |
| Sweet Potato | Run the outer loop | Grok Bot has least-privilege GitHub access and Et approves the job contract |
| Potato Architect | Resolve uncertain architecture through Wayfinder | Sweet Potato is connected and a request needs more than one run or has a material decision |
| Project verification | Prove the real artifact | The project is registered and its fixture can run in an isolated environment |
| Claude builder | Build one ready ticket | The verification skill and required checks pass in CI |
| Codex reviewer | Review standards and spec independently | The builder is connected and the project has review rules |
| Verification keeper | Maintain the feature map | The project has a working verification skill |
| Pattern scanner | Report known bad patterns without fixing them | The project has an approved list and enough history to distinguish repetition from noise |
| Second builder | Build an independent ticket | Trusted work keeps pace and the first builder, not review or verification, is the measured bottleneck |

Automatic merge is not unlocked by this playbook. Et remains the merge authority.
