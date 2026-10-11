# Credential rows and "Refresh quota"

Under the cards, each provider lists its credentials. A row shows the credential's file name, its plan, every limit with a bar and reset time, and a `Refresh quota` button.

## Sub-features

- `row-limits` shows each limit's label, remaining percentage, bar and reset.
- `row-refresh` re-reads the data file and updates that one credential.
- `row-refresh-failed` reports a failed refresh on the row and keeps the old values.
- `row-refresh-gone` reports a credential that is no longer in the data.

## How to get to it (user POV)

- Open the page and scroll past the cards. Rows are grouped under a provider heading such as `Claude 5`.

## Driving it with Playwright

- **Limits.** In `[data-credential="claude-1"]`, `.limit-head` reads `7-day Fable 558%`, `5-hour limit100%` and `7-day limit79%`. The first limit contains `in 1 day · 09/13, 13:00` and the second `No reset pending`.
- **Bar width.** In `[data-limit="seven-day-model"]`, the `.bar-fill` box is 0.58 of the progress bar's box.
- **Refresh one row.** Serve the sample, then a document where `claude-1` and `claude-2` both changed. Click `Refresh quota for …` in the `claude-1` row. That row shows `Refreshed` and the new value. The `claude-2` row keeps its old value. The Claude card total changes by the `claude-1` difference only.
- **Failure.** Serve the sample, then HTTP 503. Click a row's button. The row shows an alert reading `Could not load data/quota.sample.json` and keeps its values.
- **Gone.** Serve the sample, then a document without `xai-1`. Click that row's button. Its alert reads `This credential is no longer in the data. Refresh the page.`

## Gotchas

- Row buttons are named `Refresh quota for <file name>`. The name changes with `Show emails`, so match the prefix.
- Only one request runs at a time. Every refresh button is disabled until it finishes.
- Two sample Claude credentials have the same masked name. Select rows by `data-credential`, not by text.
