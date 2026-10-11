---
name: verify-quota-console
description: Verify Fried Test's Quota Management page (apps/quota-console, a browser UI) by driving its production build with Playwright. Use before claiming a change to the page, its data format or its sample data works, and to write the proof bundle for that change.
---

# Verify the quota console

The quota console is a static browser page in `apps/quota-console`. It fetches one JSON file, parses it, and renders provider tabs, summary cards and credential rows. It has no server code, no sign-in and no database. All data is committed and fake.

## Launch

For the whole check, run from the repository root:

```bash
bash scripts/verify-quota-console.sh
```

It installs dependencies if `apps/quota-console/node_modules` is missing, then runs typecheck, lint, unit tests, the production build and the browser tests. Playwright starts `vite preview` on `127.0.0.1:4173` itself and stops it when the tests end. A final `PASS: quota console.` line and exit 0 mean every check passed. It needs Node 22 and Playwright's Chromium (`npx playwright install chromium` inside `apps/quota-console`).

To drive the page by hand, start the same build yourself:

```bash
cd apps/quota-console
npm ci
npm run build
npm run preview -- --host 127.0.0.1
```

It is ready when it prints `Local: http://127.0.0.1:4173/`. Stop it with Ctrl-C in that terminal.

## Doctor

```bash
bash scripts/quota-console-doctor.sh 4173
```

It reads the page and the sample file over loopback and changes nothing. `READY` with exit 0 means the port serves this page and a version 1 quota document. Exit 2 with `INCONCLUSIVE` means nothing answered or something else owns the port. Run it before driving a preview by hand.

## Drive

Read [the feature map](features/README.md) and use the file for the feature you changed. The browser tests in `apps/quota-console/e2e/quota-page.spec.ts` cover every mapped feature. Run one group with:

```bash
cd apps/quota-console
npx playwright test -g "Refresh quota on one row"
```

Handles to use, all from the rendered page:

- Tabs: `getByRole("tab", { name: /Codex/ })` inside `getByRole("tablist", { name: "Providers" })`.
- Summary card: `getByRole("article", { name: "Claude summary" })`. Its total is `getByTestId("card-total")`.
- Credential row: `[data-credential="claude-1"]`. One limit in it: `[data-limit="seven-day-model"]`.
- Progress bar: `getByRole("progressbar")`. Read `aria-valuenow`, and compare the `.bar-fill` box width with the bar's box width.
- Header: `getByTestId("page-meta")`, and the buttons `Show emails`, `Hide emails` and `Refresh`.
- Errors: `getByRole("alert")`.

To test with other data, answer the page's request for `data/quota.sample.json` with `serveSample` from `apps/quota-console/e2e/fixtures.ts`. The page still fetches and parses the body, so the loading boundary is exercised. Do not add test-only hooks to the page.

## Evidence

After the final source edit, run from the repository root:

```bash
bash scripts/prove-quota-console.sh Etdev2/sweet-potato-fried-test#<ticket>
```

It runs `scripts/write-proof.sh` with the verification command, then lists three screenshots from the same browser run in `proof/manifest.json`:

- `proof/screenshots/quota-all.png`: the page from the sample data.
- `proof/screenshots/quota-claude-emails-shown.png`: emails shown, the Claude tab, the Claude card expanded.
- `proof/screenshots/quota-malformed-error.png`: the error for malformed data.

`proof/verification.txt` holds the command output. Open the screenshots and read them before committing `proof/`. A passing run with a wrong-looking page is not proof. Run the script again after any later edit, because the bundle is tied to the staged code.

`scripts/test-control-room.sh` and `scripts/test-proof-gate.sh` are left to the Linux `contracts` check. On macOS `mktemp` ignores `TMPDIR`, which stops the proof-gate suite early.

## Cleanup

The verification command leaves no process running. If you started a preview by hand, stop that process with Ctrl-C. Do not kill by name or by port. `apps/quota-console/dist` and `apps/quota-console/test-results` are build output, ignored by git, and safe to delete. Never delete `proof/`.

## Helpers

- `scripts/verify-quota-console.sh` runs every check. `QUOTA_PROOF_DIR=/absolute/folder` also saves the screenshots there.
- `scripts/quota-console-doctor.sh [PORT]` is the read-only readiness check.
- `scripts/prove-quota-console.sh owner/repo#N` writes the proof bundle.

Keep `.agents/skills/verify-quota-console` identical to this folder. The verification command fails when the two differ. When the page's behaviour changes, update the feature map with the pinned `maintain-verification-skill`.
