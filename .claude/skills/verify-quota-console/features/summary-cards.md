# Provider summary cards

One card per provider. It adds up the remaining percentage of the provider's first limit across its credentials and draws one bar segment per credential.

## Sub-features

- `card-total` shows the sum and the capacity, for example `409% of 500%`.
- `card-segments` draws one segment per credential, filled to that credential's percentage.
- `card-reset` shows the earliest reset among the credentials.
- `card-unavailable` shows `--` when no credential has a measurement.
- `card-expand` lists the provider's other limits behind `Show`.

## How to get to it (user POV)

- Open the page. The cards sit under the tabs.

## Driving it with Playwright

- **Total.** In `getByRole("article", { name: "Claude summary" })`, `getByTestId("card-total")` reads `409%` and the card contains `of 500%`.
- **Segments.** `getByRole("group", { name: "Claude 7-day Fable 5 by credential" }).getByRole("progressbar")` has five bars with `aria-valuenow` 58, 100, 100, 51 and 100. Each `.bar-fill` is that share of its bar's width.
- **Reset.** The Claude card contains `in 1 day · 09/12, 23:00`.
- **Unavailable.** The xAI card total reads `--` with the label `unavailable`. Its bar has `aria-valuetext="unavailable"`, no `aria-valuenow` and no `.bar-fill`.
- **Expand.** Click `Show` on the Claude card. Fifteen progress bars are present and the button reads `Hide`.
- **Data-driven.** Serve a document with different values through `serveSample` and reload. Totals, capacities, segment counts and widths follow it.

## Gotchas

- A total is a sum across credentials, so it can exceed 100%.
- A credential with no measurement adds to the capacity but not to the total. Missing is not zero.
- The Codex, xAI and Kimi sample credentials have one limit each, so their cards have no `Show` button.
