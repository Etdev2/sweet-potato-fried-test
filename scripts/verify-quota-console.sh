#!/usr/bin/env bash
set -euo pipefail

# The quota console's verification command, as registered in projects.json.
# It runs every typescript-web lane check, ending with browser tests that
# drive the production build. CI runs this same script.
#
# Set QUOTA_PROOF_DIR to an absolute folder to also save proof screenshots
# there. scripts/prove-quota-console.sh does that.

root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root/apps/quota-console"

step() { printf '\n== %s\n' "$1"; }

if [ ! -d node_modules ]; then
  step "Install dependencies from the lockfile"
  npm ci --no-audit --no-fund
fi

step "Typecheck"
npm run --silent typecheck

step "Lint with type information, zero warnings"
npm run --silent lint

step "Unit and contract tests"
npm run --silent test

step "Production build"
npm run --silent build

step "Browser tests against the production build"
npm run --silent e2e

step "Verification skill copies match"
diff -r "$root/.claude/skills/verify-quota-console" "$root/.agents/skills/verify-quota-console"

printf '\nPASS: quota console.\n'
