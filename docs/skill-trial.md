# Wizard and verification skill trial

Scope: [Fried Test #2](https://github.com/Etdev2/sweet-potato-fried-test/issues/2). This prepares repeatable helpers for the dashboard trial in [Sweet Potato #17](https://github.com/Etdev2/sweet-potato/issues/17). It does not install or run that dashboard.

## Skills applied

Codex read and applied these exact upstream skills:

- [Wizard](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/engineering/wizard/SKILL.md): scoped the human-only procedure, checked upstream UI labels, copied the unchanged library, authored three stages and statically traced the values. The account owner enters the management key and completes provider login in the browser. The wizard captures no secrets and writes no environment values.
- [Create verification skill](https://github.com/backnotprop/pstack/blob/3a604672c46cd8187d2b19980eae0a34f9f91138/skills/create-verification-skill/SKILL.md): inspected the actual helper entry points, created a local verification skill and three-feature map, exercised the real plan/refusal/doctor entry points, captured evidence and verified cleanup.

The two upstream skill packages, their support files and MIT licenses have matching copies under `.agents/skills` and `.claude/skills`. `skills/trial-sources.json` records their source commits and SHA-256 file hashes. Tests reject package drift and Wizard library edits. The shared registry pins remain unchanged. Wizard is selected by Elliott's explicit trial instruction; this PR does not add it to every workflow phase.

Matching package files prove delivery bytes only. Codex's execution is recorded by this trial; fresh-session discovery and Claude's actual use of these skills remain unverified. This PR does not certify permanent skill installation in another cloud environment.

## Reproduce the preparation check

Run `bash scripts/verify-dashboard-tools.sh` from the repository root with Bash and Python 3. It checks the real helpers, matching skill files and failure paths. HTTP fixtures use ephemeral loopback ports and no provider credentials. Listener permission is required; denied network access is INCONCLUSIVE until the same checks can run in an approved environment.

The generated verification skill at `.agents/skills/verify-dashboard-tools/SKILL.md`, mirrored for Claude, explains the full proof command, feature map, cleanup and limits. The inherited control-room suites use CI's pinned `jsonschema==4.26.0` and `rfc3339-validator==0.1.4` environment.

## Wizard stages and values

Inspect `bash scripts/dashboard-wizard.sh --plan` before a live trial.

| Stage | Operator action | Captured value and destination |
| --- | --- | --- |
| Console connection | Open the approved loopback instance and enter its management key in the console. | Secret stays in the browser; nothing is captured by this script. |
| One provider login | Select OAuth Login and complete the approved provider-hosted flow for one account. | Provider credentials stay in the provider flow and approved service; none enter this script or repo. |
| Quota inspection | Open Quota Management, refresh and capture masked action/result evidence. | Evidence is reviewed under #17; it is not automatically committed. |

For an already approved instance, `bash scripts/dashboard-wizard.sh --doctor 8317` checks the public page without credentials. It refuses redirects, ignores proxy environment settings, bounds response size and prints no response body. READY means candidate HTML is reachable only. Versions, process ownership and provider data are still unverified.

The live interactive command is `bash scripts/dashboard-wizard.sh`. Set the public `CPAMC_PORT` value only if the approved instance uses another port. It refuses noninteractive calls before opening a browser. After its manual stages it deliberately exits 2 because acknowledgments do not satisfy independent live acceptance.

Upstream references checked on October 11, 2026: [CLIProxyAPI v8.0.23](https://github.com/router-for-me/CLIProxyAPI/releases/tag/v8.0.23), [CPAMC v1.26.1](https://github.com/router-for-me/Cli-Proxy-API-Management-Center/blob/v1.26.1/README.md), its HTML title and English OAuth Login label. These are reference versions for authoring, not verified installed versions or proof that Theo's fork is identical.

## Outcomes and remaining work

Preparation can pass independently of live product acceptance. A PASS proof bundle on this PR applies to the preparation helpers and repository checks only.

- Dashboard installation, provider login, quota/reset data and authenticated model discovery remain INCONCLUSIVE.
- The real `--doctor 8317` probe returned INCONCLUSIVE with exit 2; the expected local page was not available to this check. Bash syntax passed. Shellcheck was unavailable in the preparation environment.
- The exact upstream/fork selection, installation/rollback contract and official-tool/account decision remain under #17. The wizard launches no service or model request.
- Claude independently reviews this preparation PR before Elliott decides whether to merge. No automatic or concurrent builder execution is enabled.
- Usage is unavailable. No token or cost measurement was exposed.

The first combined run also failed the inherited TMPDIR safeguard test in the approved macOS execution context. An unchanged full proof suite passed in the sandboxed context. An isolated trace showed that `/usr/bin/mktemp` ignored the test's assigned TMPDIR in the approved context, although the variable reached the shell. The combined rerun uses a temporary PATH adapter outside the repository that passes the requested directory as an explicit template to `/usr/bin/mktemp`. It preserves the test's inside-repository directory so the safeguard is still exercised. The shared proof scripts are unchanged; Linux CI uses its normal tools.

The separate [handshake PR #3](https://github.com/Etdev2/sweet-potato-fried-test/pull/3) received Claude's reply, confirming issue/PR communication. It does not prove automatic dispatch. The first handshake status comment was premature after a denied Desktop write; Codex corrected it, retried from a writable temporary clone and then posted the verified result. The preparation trial also encountered denied loopback listeners before rerunning with the required access. These are observed setup failures, not passing first attempts.
