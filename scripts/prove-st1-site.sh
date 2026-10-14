#!/usr/bin/env bash
set -euo pipefail

# Writes the proof bundle for an ST-1 site change. It wraps
# scripts/write-proof.sh, which records the command output, then lists the
# screenshots the browser run saved as extra evidence.
#
#   scripts/prove-st1-site.sh owner/repo#123

ticket="${1:?Usage: scripts/prove-st1-site.sh owner/repo#123}"
cd "$(git rev-parse --show-toplevel)"

bash scripts/write-proof.sh \
  --ticket "$ticket" \
  --verification 'ST1_PROOF_DIR="$PWD/proof" bash scripts/verify-st1-site.sh' \
  --fixture 'The real ST-1 files on this branch: deck-content.json, finance.json, the three Markdown files and the six deck exports. The production build served by next start on 127.0.0.1.' \
  --shows 'Typecheck, lint, unit tests, the production build and every browser test against that build, at desktop and phone sizes, exit 0.' \
  -- \
  'ST1_PROOF_DIR="$PWD/proof" bash scripts/verify-st1-site.sh' \
  'bash scripts/check-control-room.sh' \
  'git diff --cached --check origin/main'

manifest=$(mktemp)
trap 'rm -f "$manifest"' EXIT
jq '.evidence += [
  {path: "proof/screenshots/home-desktop.png", kind: "screenshot",
   shows: "The home page: the four contract figures read from finance.json, the three deck cards with PDF and PowerPoint links, and the fiction tag on the Greg versus Fred card."},
  {path: "proof/screenshots/home-phone.png", kind: "screenshot",
   shows: "The same home page at a 390 pixel phone width, with nothing cut off."},
  {path: "proof/screenshots/owner-chart-desktop.png", kind: "screenshot",
   shows: "Owner deck slide 5 after hovering the 2034 bar: the payment chart with its tooltip reading 2034 and $68m, and the slide numbered 5 / 10."},
  {path: "proof/screenshots/owner-chart-phone.png", kind: "screenshot",
   shows: "The same slide at phone width after tapping the 2034 bar. The chart scrolls inside its own box."},
  {path: "proof/screenshots/internal-deck-desktop.png", kind: "screenshot",
   shows: "The Greg versus Fred deck: the fiction notice above the slides and the FICTIONAL SATIRE label in the first slide footer."},
  {path: "proof/screenshots/internal-deck-phone.png", kind: "screenshot",
   shows: "The same deck at phone width, with the fiction notice above the first slide."},
  {path: "proof/screenshots/report-desktop.png", kind: "screenshot",
   shows: "The finance report rendered from financial-report.md."},
  {path: "proof/screenshots/report-phone.png", kind: "screenshot",
   shows: "The finance report at phone width."}
]' proof/manifest.json > "$manifest"
cat "$manifest" > proof/manifest.json

git add -- proof
bash scripts/check-proof.sh .
