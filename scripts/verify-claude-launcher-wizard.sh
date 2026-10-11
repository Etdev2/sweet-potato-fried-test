#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
python3 tests/test-claude-launcher-wizard.py
bash scripts/claude-launcher-wizard.sh --plan
printf '%s\n' 'PASS: launcher wizard against stub commands. Live account setup remains INCONCLUSIVE.'
