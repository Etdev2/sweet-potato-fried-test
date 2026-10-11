# Wizard plan

The operator can inspect the intended connection, login and quota stages without starting a service or opening a browser.

## Sub-features

- PLAN: display three stages and the incomplete live-acceptance status.
- STATE: preserve existing configuration and create no files.

## How to get to it (user POV)

Run `bash scripts/dashboard-wizard.sh --plan` from the repository root.

## Driving it with the CLI

Preconditions: Bash and the script exist.

- Inspect: run `bash scripts/dashboard-wizard.sh --plan`; expect exit 0 and all three named stages.
- State: `python3 tests/test-dashboard-tools.py` runs the plan in a disposable directory with a sentinel `.env` and confirms it remains the only unchanged file.

## Gotchas

Exit 0 verifies the plan entry point only. It does not prove dashboard setup or provider data.
