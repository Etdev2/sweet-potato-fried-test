# Bad data and missing data

The page parses the JSON it fetches before using any of it. Data that does not match the format, a file that is not JSON, and a failed request each stop with an error that names the file and the fault. No quota values render from bad data.

## Sub-features

- `bad-shape` lists every fault in a document of the wrong shape, each with its path.
- `bad-json` reports a body that is not JSON.
- `bad-http` reports the HTTP status of a failed request.
- `bad-source` refuses a `?source=` name the page does not know, without a request.
- `bad-retry` recovers with `Try again` once the data is good.

## How to get to it (user POV)

- Open `/?source=malformed` to load the committed malformed fixture, `public/data/quota.malformed.json`.
- Any other failure appears on its own when the data file is broken or missing.

## Driving it with Playwright

- **Wrong shape.** Go to `/?source=malformed`. `getByRole("alert")` has the heading `data/quota.malformed.json does not match the quota format` and five list items. They start with `generatedAt:`, `credentials[0].limits[0].remaining.percent:`, `credentials[1].provider:`, `credentials[1].limits[0].remaining.percent:` and `credentials[1].limits[0].reset:`. No tablist and no cards render, and `Show emails` is disabled.
- **Not JSON.** Serve the sample, then the text `{ this is not json`, then the sample. Click `Refresh`. The alert heading is `data/quota.sample.json is not valid JSON` and no rows remain.
- **Retry.** Click `Try again` in the alert. The alert goes and ten rows return.
- **HTTP status.** Serve status 404. The alert contains `The server answered with HTTP status 404.`
- **Unknown source.** Go to `/?source=https://evil.example/quota.json`. The alert heading is `Unknown data source "https://evil.example/quota.json"`, and no request for a data file is made.

## Gotchas

- The build runs Vite with `appType: "mpa"`, so a missing file answers 404. With the default setting it would answer `index.html`, and the error would read "not valid JSON".
- `?source=` takes a name from a fixed list, never a URL.
