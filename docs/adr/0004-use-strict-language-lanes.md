# Use strict language lanes

## Decision

Each project registers one baseline language lane. The initial lanes are `rust-service` and `typescript-web`.

Rust is preferred for new bounded services, workers and command-line tools when its type system and ownership model prevent a named risk. TypeScript remains the default for existing Next.js product applications, including Money Machine, with stricter compiler, lint, boundary and browser checks.

## Why

One mandatory language would confuse language strictness with system correctness. A Rust rewrite can introduce migration and integration defects. A loosely configured TypeScript project can admit errors that its compiler could catch.

The lane makes the required checks explicit while allowing the architecture decision to choose the right language for each bounded component.

## Consequences

- A project cannot enter supervised building without a lane.
- Weakening a lane requires a reviewed exception or a new ADR.
- A mixed-language project needs a versioned boundary and verification on both sides.
- Money Machine is not scheduled for a Rust rewrite by this decision.
