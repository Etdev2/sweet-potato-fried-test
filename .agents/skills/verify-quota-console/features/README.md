# Quota console verification map

The maintained list of what a user can do on the Quota Management page. Read this index, then use the matching file as the recipe.

| Feature | File |
| --- | --- |
| Provider tabs | [provider-tabs.md](provider-tabs.md) |
| Provider summary cards | [summary-cards.md](summary-cards.md) |
| Credential rows and "Refresh quota" | [credential-rows.md](credential-rows.md) |
| Header controls: "Show emails" and "Refresh" | [header-controls.md](header-controls.md) |
| Bad data and missing data | [bad-data.md](bad-data.md) |

## Baseline

- The page is the production build served at `http://127.0.0.1:4173/`.
- Data is `public/data/quota.sample.json`: ten fake credentials generated at `2026-09-11T20:00:00Z`. Five are Claude, three Codex, one xAI, one Kimi and none Antigravity.
- Browser tests run in the UTC time zone, so clock times in assertions are UTC.
- Reset labels count from the document's `generatedAt`, not from the wall clock. The same file always renders the same labels.

## Proof rules

- Drive the page through its buttons and tabs. Do not call component functions.
- Capture the action and the state it produced.
- A value shown on the page must trace to a value in the JSON. Prove it by serving different JSON and watching the page change.
- Committed data stays fake. Addresses use the reserved `.example` domain, and `tests/sample-data.test.ts` fails otherwise.
