# Quota console

A Quota Management page for a CLI proxy console, built from a screenshot for [Quiz 1](https://github.com/Etdev2/sweet-potato-fried-test/issues/6). It shows how much quota each provider credential has left and when each limit resets.

The page is static. It fetches one JSON file and renders it. It has no proxy, no sign-in and no credential handling, and every credential in the repo is fake.

## Run it

Node 22 or newer.

```bash
cd apps/quota-console
npm ci
npm run dev
```

Open the address Vite prints. `?source=malformed` loads a deliberately broken file to show the error state.

## Check it

From the repository root:

```bash
bash scripts/verify-quota-console.sh
```

It runs the typecheck, the type-aware lint with zero warnings, the unit tests, the production build and the browser tests against that build. The browser tests need Playwright's Chromium, which `npx playwright install chromium` installs. CI runs the same script in the `quota-console` job.

## Data

The page reads `public/data/quota.sample.json`. `src/domain/quota-document.ts` parses it and is the only place JSON becomes domain types. A document that does not match is refused with the path of each fault.

```json
{
  "schemaVersion": 1,
  "generatedAt": "2026-09-11T20:00:00Z",
  "credentials": [
    {
      "id": "claude-1",
      "provider": "claude",
      "account": { "kind": "email", "email": "tess@lumen.example" },
      "plan": "Max",
      "state": "loaded",
      "limits": [
        {
          "id": "seven-day-model",
          "label": "7-day Fable 5",
          "remaining": { "status": "measured", "percent": 58 },
          "reset": { "status": "scheduled", "at": "2026-09-13T13:00:00Z" }
        }
      ]
    }
  ]
}
```

- `provider` is one of `claude`, `antigravity`, `codex`, `xai` or `kimi`.
- `account` is an email address, or `{ "kind": "local", "label": "…" }` for a credential with no address.
- `remaining` is a measured percentage from 0 to 100, or `{ "status": "unavailable" }`. The page shows an unavailable value as `--` and never as zero.
- `reset` is `scheduled` with a time, `none` for no pending reset, or `unavailable`.
- Reset labels such as "in 1 day" count from `generatedAt`, so one file always renders the same way.

A provider card adds up the first limit across that provider's credentials, which is why Claude reads "409% of 500%" for five credentials. Each bar segment is one credential.

Addresses in committed data use the reserved `.example` domain. `tests/sample-data.test.ts` fails if one does not, or if another file appears in `public/data`.

## Layout

| Path | Holds |
| --- | --- |
| `src/domain` | Parsing, summaries, masking and reset labels. Lint stops it importing React, the loader or browser globals. |
| `src/data` | The fetch boundary and its error descriptions. |
| `src/ui` | React components and the stylesheet. |
| `tests` | Unit and contract tests for `src/domain` and `src/data`. |
| `e2e` | Playwright tests that drive the built page. |

## Not built

- The collector that reads real usage from Codex and Claude Code session logs. It was extra credit on the ticket.
- The other sidebar pages. Their entries show where this page sits in the console and go nowhere.
- The "Ledger" menu at the right of the tabs in the screenshot. The ticket does not describe it.
