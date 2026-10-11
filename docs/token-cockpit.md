# Token cockpit

The token cockpit will show how much agent work a project consumes and what that work produces. It must not pretend every provider exposes the same data.

## Questions it answers

- Which provider, model and bot used the most measured tokens?
- Which tickets consumed the most agent runs?
- Which runs ended in a trusted pull request, rework, failure or an inconclusive result?
- How much usage is measured, estimated or unavailable?
- Is higher usage reducing Et's review time or merely creating more output?

## Canonical event

Every collector writes the provider-neutral shape in [token-usage.schema.json](../schemas/token-usage.schema.json). Raw provider exports remain outside git. The canonical event stores only the fields needed for comparison and a safe evidence pointer.

Usage standing is mandatory:

- `measured`: reported by the provider or its official client. The source is `provider-report` or `official-client`, and the event carries at least one measured token count or billed cost.
- `estimated`: calculated from an identified source and method. The source is `manual-estimate` with a `method`, the event carries at least one estimated token count or `estimatedCostUsd`, and it never carries `billedCostUsd`.
- `unavailable`: the provider or current integration did not expose it. The source is `unavailable`, and the event carries no `usage` at all.

The schema rejects any event that breaks these rules, and an empty `usage` object. A measured event may also carry `estimatedCostUsd` when tokens were measured and only the price was estimated. The two cost fields stay separate.

Missing is not zero. The interface displays unavailable fields as unavailable and keeps estimated cost separate from billed cost.

`scripts/check-usage-events.py` validates event files against the schema. CI runs it against the valid and invalid examples in `tests/fixtures/usage/`. No collector writes real events yet, so no real event has been validated.

## Collection boundary

Each provider gets a small adapter. An adapter may read only the current user's official local session records or official usage export. It never scrapes credentials, shares subscription authentication or sends raw prompts to another provider.

Collectors should append events after a run finishes. A write is idempotent by `eventId`. Reprocessing the same run updates nothing.

## Interface plan

The first interface is read-only and local or privately deployed. It has:

- filters for time, provider, model, bot, project, ticket and outcome;
- measured tokens and cost separated from estimates;
- run count, median duration, rework rate and trusted-PR conversion;
- drill-down from an aggregate to safe evidence pointers;
- a visible coverage percentage showing how much usage has measured data.

The cockpit does not rank agents by token volume alone. Its primary comparison is useful outcomes per supervised run and Et's review time.

## Privacy and retention

- Do not commit raw prompts, responses, credentials or full provider session files.
- Store hashes or safe local/GitHub pointers instead of sensitive text.
- Keep raw usage exports outside the repository.
- Treat cost estimates as estimates until reconciled with a provider statement.
- Decide retention and storage before connecting the first collector.
