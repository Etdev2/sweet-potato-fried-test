---
name: verify-dashboard-tools
description: Verify Fried Test's Wizard and loopback doctor through their actual CLI entry points. Use before claiming these preparation helpers work. This skill does not prove live account login or quota.
---

# Verify dashboard preparation tools

## Launch

From the repository root run `bash scripts/verify-dashboard-tools.sh`. It uses Bash and Python 3's standard library. It runs the real CLI helpers and starts disposable loopback HTTP fixtures on OS-assigned ports. It does not install or start CPAMC, open a browser, log in, write configuration or call a model. A final `PASS: preparation helpers` line and exit 0 mean this scoped check passed.

The fixtures imitate external HTTP responses solely to test the doctor. They are not provider or dashboard acceptance evidence. Live application launch remains undefined until Sweet Potato #17's setup and official-tool decisions are resolved.

## Doctor

First run `bash scripts/dashboard-wizard.sh --plan`. It must exit 0 and print three stages plus the statement that live acceptance remains INCONCLUSIVE. It creates no persistent state. If dependencies or files are missing, report INCONCLUSIVE and repair the preparation environment.

For an already approved local instance, `bash scripts/dashboard-wizard.sh --doctor 8317` performs a bounded GET to loopback `/management.html`, bypasses proxy environment settings and refuses redirects. Exit 0 with `result: READY` proves only that the expected page title was returned. It does not establish process ownership, versions, service identity, login or quota. Never infer permission to drive the instance from that result.

## Drive

Read [the feature map](features/README.md). Drive the plan with `bash scripts/dashboard-wizard.sh --plan`. Exercise noninteractive refusal with `bash scripts/dashboard-wizard.sh </dev/null`, expecting exit 2 before any browser action. `python3 tests/test-dashboard-tools.py` covers matching pinned skill packages, the unchanged Wizard library, plan state preservation, refused options, bounded page responses, unauthorized responses, redirects and invalid ports.

Do not execute the interactive stages for automated verification. Those stages require the approved live instance and account-owner browser login. Their final exit 2 deliberately avoids turning human acknowledgments into a product PASS.

## Evidence

After the final source edit run:

```bash
bash scripts/write-proof.sh --ticket Etdev2/sweet-potato-fried-test#2 \
  --fixture 'CLI preparation helpers and disposable loopback HTTP responses; no provider accounts' \
  --shows 'Real helper outputs, matching skill packages and fail-closed cases; live acceptance is INCONCLUSIVE' \
  -- 'bash scripts/verify-dashboard-tools.sh' 'bash scripts/check-control-room.sh' \
  'bash scripts/test-control-room.sh' 'bash scripts/test-proof-gate.sh' 'git diff --check'
```

The inherited fixture suites require the pinned Python environment from CI. On macOS, check that `TMPDIR` is honored by `mktemp` in the execution context before the combined run. This trial's approved execution context ignored it. The documented temporary adapter used explicit templates while leaving the shared scripts intact:

```bash
#!/usr/bin/env bash
set -euo pipefail
if [ "$#" -eq 0 ]; then
  exec /usr/bin/mktemp "${TMPDIR:-/tmp}/tmp.XXXXXXXXXX"
elif [ "$#" -eq 1 ] && [ "$1" = -d ]; then
  exec /usr/bin/mktemp -d "${TMPDIR:-/tmp}/tmp.XXXXXXXXXX"
fi
exec /usr/bin/mktemp "$@"
```

Place that executable adapter named `mktemp` in a temporary directory outside the repository and prepend its directory to PATH only in the affected context. On Linux CI, use the normal tool.  Prepend that environment's `bin` directory to PATH before this command. Commit the resulting `proof/manifest.json` and `proof/verification.txt`. Read the output and run `bash scripts/check-proof.sh .`; regenerate proof after any source edit. The proof bundle's PASS is limited to these preparation artifacts.

## Cleanup

Each HTTP fixture binds its own ephemeral loopback port, shuts down its own server and joins its own thread in `finally`. Temporary CLI fixture directories are removed by their context managers. The scripts create no production session or process. Confirm `proof/verification.txt` still exists after the run. Leave evidence intact and do not stop a process by name.

## Helpers

- `scripts/dashboard-wizard.sh --plan` prints the scoped procedure without interactions.
- `scripts/dashboard-wizard.sh --doctor [PORT]` runs the read-only candidate-page check.
- `scripts/dashboard-doctor.py [PORT]` is the doctor's direct entry point.
- `scripts/verify-dashboard-tools.sh` exercises the whole preparation feature map.

Keep the matching `.claude/skills/verify-dashboard-tools` copy in sync. Use the pinned create-verification-skill and its maintenance guidance when these helper behaviors change.
