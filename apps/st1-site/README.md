# ST-1 site

A Next.js site that presents the [ST-1 deliverables](../../ST-1/README.md): the three decks as web slides, the finance report, the fictional Greg story and the decisions record. Built for [issue #14](https://github.com/Etdev2/sweet-potato-fried-test/issues/14).

The site keeps no copy of the content. Every page is generated at build time from the files in `ST-1/`, so a change there shows up on the next build.

| Page | Built from |
| --- | --- |
| `/` | `ST-1/deck-content.json` and `ST-1/finance.json` |
| `/decks/owner`, `/decks/advertiser`, `/decks/internal` | `ST-1/deck-content.json`, with charts from `ST-1/finance.json` |
| `/report` | `ST-1/financial-report.md` and two charts from `ST-1/finance.json` |
| `/story` | `ST-1/greg-fiction.md` |
| `/decisions` | `ST-1/decisions.md` |
| `/downloads/*.pdf`, `/downloads/*.pptx` | The six exports in `ST-1/decks/` |

## Run it

Use Node 22.13 or newer. From this folder:

```sh
npm ci
npm run dev
```

`npm run build` writes the production build and `npm run start` serves it on `http://127.0.0.1:4174`.

## Check it

From the repository root:

```sh
bash scripts/verify-st1-site.sh
```

That runs the typecheck, the type-aware lint, the unit tests, the production build and the browser tests at desktop and phone sizes. CI runs the same script as the `st1-site` check.

## Rules the code follows

- `src/domain` parses the two JSON files with zod and holds the chart math. It imports no framework and reads no files, so the unit tests call it directly. A deck file that cites a missing source, names an unknown chart or has a ragged table fails the build with the reason.
- `src/data` is the only code that reads files. It is marked `server-only`, and lint stops `src/ui` importing it.
- `src/ui` and `src/app` draw what they are given.
- `scripts/sync-assets.mjs` copies the six exports into `public/downloads` before each build and refuses any file whose SHA-256 differs from `ST-1/decks/sha256.json`.
- The internal deck and the story are fiction. Every internal slide carries the `FICTIONAL SATIRE` label and both pages open with a fiction notice. A browser test fails if a slide loses the label.

## Deploy

On Vercel, set the project's root directory to `apps/st1-site`. `vercel.json` sets the install and build commands. The build reads `ST-1/` from outside the root directory, which Vercel allows by default.

The site has no server-side data, no accounts and no environment variables.
