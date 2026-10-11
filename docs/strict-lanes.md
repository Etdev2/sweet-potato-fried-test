# Strict project lanes

Every registered project chooses one baseline lane. The lane is a minimum, not a full stack prescription.

## Rust service lane

Use `rust-service` for a bounded service, worker or CLI when memory safety, exhaustive state handling and explicit error paths materially reduce risk.

Required repository settings:

```rust
#![forbid(unsafe_code)]
#![deny(clippy::all)]
#![deny(clippy::pedantic)]
#![deny(clippy::unwrap_used)]
#![deny(clippy::expect_used)]
```

Project-specific exceptions must sit next to the exception and explain why the safer representation cannot work. Do not enable every Clippy restriction lint as a group because some conflict. Choose restrictions that match the project.

Required CI:

```text
cargo fmt --check
CARGO_BUILD_WARNINGS=deny cargo clippy --all-targets --all-features
cargo test --all-features
cargo test --doc
```

Required design rules:

- Use newtypes for semantic identifiers.
- Model state with enums carrying the data valid for each state.
- Parse all external input at the boundary.
- Keep domain logic independent from transport and storage frameworks.
- Prefer exhaustive `match` expressions.
- Return typed errors from libraries. Do not use `unwrap`, `expect` or panic for expected failure.
- Enable overflow checks in release profiles when arithmetic correctness matters.
- Put an HTTP service behind typed extractors and a small interface. Axum is the default candidate, not a requirement.
- Derive database and protocol types from an authoritative schema where the toolchain supports it.

Before adding a dependency, record why the standard library or an existing dependency cannot do the job. Security and license checks become required after the dependency-policy decision ticket is resolved.

## TypeScript web lane

Use `typescript-web` for Next.js, browser UI and product work where one language across UI and server keeps the feedback loop short.

Minimum compiler settings:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true,
    "useUnknownInCatchVariables": true,
    "noEmit": true
  }
}
```

Required design rules:

- Parse external data into domain types at API, environment, storage and webhook boundaries.
- Use discriminated unions for lifecycle state. Do not combine booleans and optional timestamps to describe the same transition.
- Brand identifiers that share a primitive representation but have different meaning.
- Ban `any` and unsafe type assertions outside reviewed boundary adapters.
- Require exhaustive handling of union variants.
- Keep server-only modules out of client bundles through an enforceable import boundary.
- Keep domain logic behind narrow modules that tests can call without the framework.
- Run behavior tests and browser verification for changed user flows.

Minimum CI:

```text
frozen dependency install
typecheck
type-aware lint with zero warnings
unit and contract tests
production build
project-local verification for affected flows
```

## Choosing between lanes

Choose Rust because it prevents a named class of failure in a bounded component, not because stricter sounds better. Keep TypeScript when the main risk is product behavior, UI integration or iteration speed and strict boundaries can contain its weaker runtime type model.

A mixed project documents the boundary as a versioned protocol and verifies both sides. It does not share database tables as an undocumented API.
