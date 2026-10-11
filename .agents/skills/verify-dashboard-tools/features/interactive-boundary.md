# Interactive boundary

Browser login belongs to the account owner. An unattended call must refuse before any browser or persistent-state action.

## Sub-features

- EOF: refuse a call with no terminal.
- OPTION: refuse an unsupported installation request.

## How to get to it (user POV)

The interactive entry point is `bash scripts/dashboard-wizard.sh`, after the separate live setup contract is approved.

## Driving it with the CLI

Preconditions: automated verification has no interactive terminal.

- Refusal: run `bash scripts/dashboard-wizard.sh </dev/null`; expect exit 2 and the interactive-terminal explanation.
- Unsupported operation: run `bash scripts/dashboard-wizard.sh --install`; expect exit 2 and usage text.
- Preservation: run `python3 tests/test-dashboard-tools.py`; it verifies the unattended call creates no files in its scratch directory.

## Gotchas

Do not pipe yes responses into the interactive stages or use test fixture credentials for a real provider. The interactive flow deliberately cannot certify product acceptance.
