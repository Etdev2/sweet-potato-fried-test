#!/usr/bin/env bash
set -euo pipefail

# Runs the control-room checks against fixtures. Every valid fixture must pass.
# Every invalid fixture must fail with the error that names its mistake, so a
# fixture that fails for an unrelated reason does not count.

cd "$(dirname "${BASH_SOURCE[0]}")/.."
fixtures=tests/fixtures
failures=0
checked=()

checker_for() {
  case "$1" in
    projects) echo "scripts/check-projects.sh" ;;
    roster) echo "scripts/check-roster.sh" ;;
    usage) echo "python3 scripts/check-usage-events.py" ;;
  esac
}

expect_pass() {
  local kind=$1 file=$2 output
  if output=$($(checker_for "$kind") "$file" 2>&1); then
    echo "ok   $file passes"
  else
    echo "FAIL $file should pass but failed:"
    echo "$output" | sed 's/^/       /'
    failures=$((failures + 1))
  fi
}

expect_fail() {
  local kind=$1 name=$2 reason=$3 file="$fixtures/$1/invalid/$2.json" output
  checked+=("$file")
  if output=$($(checker_for "$kind") "$file" 2>&1); then
    echo "FAIL $file should fail but passed"
    failures=$((failures + 1))
  elif grep -qF -- "$reason" <<< "$output"; then
    echo "ok   $file fails: $reason"
  else
    echo "FAIL $file failed without the expected reason \"$reason\":"
    echo "$output" | sed 's/^/       /'
    failures=$((failures + 1))
  fi
}

for kind in projects usage; do
  for file in "$fixtures/$kind"/valid/*.json; do
    expect_pass "$kind" "$file"
  done
done
expect_pass projects projects.json
expect_pass roster roster.json

# Project registry: required verification past stage 0, and no contradictions.
expect_fail projects stage-1-empty-checks-and-missing-verification "is stage-1-supervised but requiredChecks is empty"
expect_fail projects stage-2-empty-checks-and-missing-verification "is stage-2-proven but verification.status is not available"
expect_fail projects stage-1-empty-required-checks "is stage-1-supervised but requiredChecks is empty"
expect_fail projects stage-1-verification-missing "is stage-1-supervised but verification.status is not available"
expect_fail projects stage-1-blank-command "status is available but command is not a non-blank string"
expect_fail projects stage-1-blank-required-check "requiredChecks entries must be non-blank strings"
expect_fail projects stage-1-duplicate-required-check "requiredChecks lists a check more than once"
expect_fail projects stage-1-required-checks-not-a-list "requiredChecks must be an array"
expect_fail projects missing-status-with-command "status is missing but a command is set"
expect_fail projects available-status-without-command "status is available but command is not a non-blank string"
expect_fail projects unknown-verification-status "verification.status must be one of: missing, available"
expect_fail projects verification-not-an-object "verification must be an object"
expect_fail projects empty-file "must hold exactly one JSON document, but it holds 0"
expect_fail projects two-documents "must hold exactly one JSON document, but it holds 2"
expect_fail projects empty-projects-array "projects must be a non-empty array"

# Roster: every bot has a one-job contract that exists in bots/.
expect_fail roster bot-without-contract "bots[2] has no contract"
expect_fail roster contract-file-does-not-exist "names contract bots/codex-reviewer-v2.md, which does not exist"
expect_fail roster contract-outside-bots "Point it to a job contract file in bots/"
expect_fail roster two-bots-share-a-contract "Two bots share contract bots/claude-builder.md"
expect_fail roster contract-names-another-bot "whose first line is not \"# Sweet Potato\""
expect_fail roster empty-file "must hold exactly one JSON document, but it holds 0"
expect_fail roster two-documents "must hold exactly one JSON document, but it holds 2"

# Usage events: standing, source and values agree.
expect_fail usage measured-from-unavailable-source "allOf/0/then/properties/source/properties/kind/enum"
expect_fail usage unavailable-with-usage "(schema rule: allOf/2/then/properties)"
expect_fail usage measured-from-manual-estimate "allOf/0/then/properties/source/properties/kind/enum"
expect_fail usage estimated-with-billed-cost "allOf/1/then/properties/usage/properties"
expect_fail usage measured-with-empty-usage "properties/usage/minProperties"
expect_fail usage measured-with-only-estimated-cost "allOf/0/then/properties/usage/anyOf"
expect_fail usage estimated-without-method "'method' is a required property"
expect_fail usage estimated-without-usage "'usage' is a required property (schema rule: allOf/1/then/required)"
expect_fail usage unavailable-from-provider-report "allOf/2/then/properties/source/properties/kind/const"
expect_fail usage measured-without-usage "'usage' is a required property (schema rule: allOf/0/then/required)"
expect_fail usage estimated-from-provider-report "allOf/1/then/properties/source/properties/kind/const"
expect_fail usage estimated-with-only-duration "allOf/1/then/properties/usage/anyOf"
expect_fail usage recorded-at-not-a-date "/recordedAt: 'definitely-not-a-date' is not a 'date-time'"

# An invalid fixture with no expected reason would prove nothing.
for file in "$fixtures"/*/invalid/*.json; do
  if [[ ! " ${checked[*]} " == *" $file "* ]]; then
    echo "FAIL $file has no expect_fail case. Add one with the reason it must fail."
    failures=$((failures + 1))
  fi
done

if [ "$failures" -gt 0 ]; then
  echo "$failures control-room fixture case(s) failed."
  exit 1
fi
echo "All control-room fixture cases behave as specified."
