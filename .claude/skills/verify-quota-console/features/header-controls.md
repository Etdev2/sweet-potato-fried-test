# Header controls

The header shows how many credentials the data holds and how many loaded. `Show emails` reveals the addresses in the credential file names. `Refresh` re-reads the data file.

## Sub-features

- `header-counts` shows `<n> credentials · <m> loaded` from the data.
- `emails-toggle` switches every file name between masked and full.
- `page-refresh` re-reads the file and replaces everything on the page.
- `sidebar-collapse` narrows the sidebar to its icons.

## How to get to it (user POV)

- Open the page. The counts sit under the title and the buttons on the right.

## Driving it with Playwright

- **Counts.** `getByTestId("page-meta")` reads `10 credentials · 10 loaded`. The `Auth Files` badge in the sidebar reads `10`.
- **Show.** `getByRole("button", { name: "Show emails" })` has `aria-pressed="false"`, and the first Claude row reads `claude-t•••@l•••.example.json`. Click it. The row reads `claude-tess@lumen.example.json` and the button is now `Hide emails` with `aria-pressed="true"`.
- **Hide.** Click `Hide emails`. The masked name returns and `tess` appears in no file name.
- **Refresh.** Serve the sample, then a document with other values and a later `generatedAt`. Click `getByRole("button", { name: "Refresh", exact: true })`. Counts, cards and `getByTestId("as-of")` follow the second document, and exactly two requests were made.
- **Sidebar.** Click `Collapse sidebar`. The nav labels are hidden. Click `Expand sidebar` to bring them back.

## Gotchas

- Use `exact: true` for `Refresh`, or the locator also matches every `Refresh quota for …` button.
- A credential whose account is a local label has no address. Its name is the same in both modes.
- The sidebar entries other than Quota Management are not links. They show where the page sits in the console.
