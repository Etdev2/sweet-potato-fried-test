#!/usr/bin/env bash
set -euo pipefail

# Read-only check that a quota console is being served on a loopback port and
# is worth driving. It changes nothing.
#
#   scripts/quota-console-doctor.sh [PORT]

port="${1:-4173}"
case "$port" in
  ''|*[!0-9]*) echo "INCONCLUSIVE: supply one numeric port." >&2; exit 2 ;;
esac
base="http://127.0.0.1:$port"

page=$(curl --silent --show-error --fail --max-time 5 --noproxy '*' "$base/") || {
  echo "INCONCLUSIVE: nothing answered at $base/. Start the preview server first." >&2
  exit 2
}
case "$page" in
  *"<title>Quota Management · CPAMC</title>"*) ;;
  *) echo "INCONCLUSIVE: $base/ is not the quota console." >&2; exit 2 ;;
esac

count=$(curl --silent --show-error --fail --max-time 5 --noproxy '*' "$base/data/quota.sample.json" \
  | jq -e 'select(.schemaVersion == 1) | .credentials | length') || {
  echo "INCONCLUSIVE: $base/data/quota.sample.json is missing or is not a version 1 quota document." >&2
  exit 2
}

echo "READY: quota console at $base/ serves sample data with $count credentials."
