#!/usr/bin/env bash
set -euo pipefail

# The ST-1 site's verification command, as registered in projects.json. It
# runs every typescript-web lane check, ending with browser tests that drive
# the production build. CI runs this same script.
#
# Set ST1_PROOF_DIR to an absolute folder to also save proof screenshots
# there. scripts/prove-st1-site.sh does that.

root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root/apps/st1-site"

step() { printf '\n== %s\n' "$1"; }

# One dependency needs Node 22.13 or newer. Say so here, before npm prints a
# longer and less clear refusal.
if ! node -e 'const [major, minor] = process.versions.node.split(".").map(Number); process.exit(major > 22 || (major === 22 && minor >= 13) ? 0 : 1)'; then
  printf 'Node %s is too old for apps/st1-site. Use Node 22.13 or newer.\n' "$(node --version)" >&2
  exit 1
fi

if [ ! -d node_modules ]; then
  step "Install dependencies from the lockfile"
  npm ci --no-audit --no-fund --engine-strict
fi

step "Typecheck"
npm run --silent typecheck

step "Lint with type information, zero warnings"
npm run --silent lint

step "Unit and contract tests"
npm run --silent test

step "Production build"
# Next.js ends some progress lines with a space. Strip it, so a proof bundle
# that records this output passes the repository's whitespace check. pipefail
# keeps a failed build failing.
npm run --silent build 2>&1 | sed 's/[[:space:]]*$//'

step "Browser tests against the production build"
if [ -n "${ST1_PROOF_DIR:-}" ]; then
  mkdir -p "$ST1_PROOF_DIR/screenshots"
fi
npm run --silent e2e

printf '\nPASS: ST-1 site.\n'
