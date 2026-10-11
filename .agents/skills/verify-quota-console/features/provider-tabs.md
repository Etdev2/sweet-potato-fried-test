# Provider tabs

One tab for all credentials and one per provider, each with a count. Choosing a tab filters the summary cards and the credential rows.

## Sub-features

- `tabs-counts` shows the number of credentials per provider, including zero.
- `tabs-filter` limits cards and rows to the chosen provider.
- `tabs-empty` shows a message for a provider with no credentials.

## How to get to it (user POV)

- Open the page. The tabs sit under the header. `All` is selected.

## Driving it with Playwright

- **Counts.** `page.getByRole("tablist", { name: "Providers" }).getByRole("tab")` has six tabs. With the sample their counts are 10, 5, 0, 3, 1 and 1.
- **Filter.** Click `getByRole("tab", { name: /Codex/ })`. One `article` remains and `.row` has count 3. The tab has `aria-selected="true"`.
- **Empty.** Click the Antigravity tab. The text `No Antigravity credentials.` appears, with no cards and no rows.
- **Back.** Click `getByRole("tab", { name: /^All/ })`. Four cards and ten rows return.

## Gotchas

- A tab's accessible name includes its mark letter and its count, so match by regular expression.
- The `All` tab shows a card only for providers that have credentials. Antigravity has no card there.
