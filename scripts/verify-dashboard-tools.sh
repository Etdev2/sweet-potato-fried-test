#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
python3 tests/test-dashboard-tools.py
bash scripts/dashboard-wizard.sh --plan
printf '%s\n' 'PASS: preparation helpers. Live dashboard acceptance remains INCONCLUSIVE.'
