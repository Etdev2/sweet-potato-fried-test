#!/usr/bin/env bash
set -euo pipefail

# Writes the proof bundle for a quota console change. It wraps
# scripts/write-proof.sh, which records the command output, then lists the
# screenshots the browser run saved as extra evidence.
#
#   scripts/prove-quota-console.sh owner/repo#123

ticket="${1:?Usage: scripts/prove-quota-console.sh owner/repo#123}"
cd "$(git rev-parse --show-toplevel)"

bash scripts/write-proof.sh \
  --ticket "$ticket" \
  --fixture 'apps/quota-console/public/data: quota.sample.json (ten fake credentials with .example addresses) and quota.malformed.json' \
  --shows 'Typecheck, lint, unit tests, the production build and every browser test against that build exit 0.' \
  -- \
  'QUOTA_PROOF_DIR="$PWD/proof" bash scripts/verify-quota-console.sh' \
  'bash scripts/check-control-room.sh' \
  'bash scripts/verify-dashboard-tools.sh' \
  'git diff --cached --check origin/main'

manifest=$(mktemp)
trap 'rm -f "$manifest"' EXIT
jq '.evidence += [
  {path: "proof/screenshots/quota-all.png", kind: "screenshot",
   shows: "The running page from the sample data: sidebar, header counts, provider tabs, four summary cards and all ten credential rows with masked addresses."},
  {path: "proof/screenshots/quota-claude-emails-shown.png", kind: "screenshot",
   shows: "After clicking Show emails, the Claude tab and Show on the Claude card: fake addresses in full, five Claude rows, and the card listing its other two limits."},
  {path: "proof/screenshots/quota-malformed-error.png", kind: "screenshot",
   shows: "The page opened with ?source=malformed: an error panel that names the file and each of its five faults, and no quota values."}
]' proof/manifest.json > "$manifest"
cat "$manifest" > proof/manifest.json

git add -- proof
bash scripts/check-proof.sh .
