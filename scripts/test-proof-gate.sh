#!/usr/bin/env bash
set -euo pipefail

# Proves scripts/check-proof.sh against the cases in issue #5: a passing bundle
# from the real artifact, missing proof and stale proof, plus the ways a bundle
# can lie about its result or evidence.
root="$(cd "$(dirname "$0")/.." && pwd)"
work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT
failures=0

# A throwaway copy of the control room, standing in for a project repo whose
# real artifact is scripts/check-control-room.sh.
new_repo() {
  local repo="$work/$1"
  mkdir -p "$repo"
  git -C "$root" ls-files -co --exclude-standard -z \
    | grep -zv '^proof/' \
    | tar -C "$root" --null -T - -cf - \
    | tar -C "$repo" -xf -
  git -C "$repo" init -q
  git -C "$repo" add -A
  git -C "$repo" -c user.name=test -c user.email=test@example.com commit -qm base
  echo "$repo"
}

commit() {
  git -C "$1" add -A
  git -C "$1" -c user.name=test -c user.email=test@example.com commit -qm "$2"
}

# What a builder does: change code, stage it, run the real artifact, write the bundle.
prove() {
  local repo="$1" result="${2:-PASS}"
  mkdir -p "$repo/proof"
  local code=0
  (cd "$repo" && bash scripts/check-control-room.sh) > "$repo/proof/control-room-check.txt" 2>&1 || code=$?
  git -C "$repo" add -A -- ':!proof'
  jq -n \
    --arg digest "$("$repo/scripts/proof-digest.sh" "$repo")" \
    --arg at "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
    --arg result "$result" \
    --argjson code "$code" '{
      schemaVersion: 1,
      ticket: "Etdev2/sweet-potato#5",
      sourceDigest: $digest,
      capturedAt: $at,
      result: $result,
      verification: {command: "bash scripts/check-control-room.sh", fixture: "projects.json as committed"},
      commands: [{command: "bash scripts/check-control-room.sh", exitCode: $code}],
      behaviorChanged: true,
      evidence: [{
        path: "proof/control-room-check.txt",
        kind: "terminal",
        shows: "The control-room check accepts the roster with a second paused builder."
      }]
    }' > "$repo/proof/manifest.json"
  commit "$repo" "Add proof"
}

expect() {
  local name="$1" want="$2" repo="$3" pattern="${4:-}"
  local out code=0
  out=$(bash "$repo/scripts/check-proof.sh" "$repo" 2>&1) || code=$?
  if [ "$want" = pass ] && [ "$code" -eq 0 ]; then
    echo "ok   $name"
  elif [ "$want" = fail ] && [ "$code" -ne 0 ] && grep -q -- "$pattern" <<< "$out"; then
    echo "ok   $name"
  else
    echo "FAIL $name (exit $code)"
    sed 's/^/     /' <<< "$out"
    failures=$((failures + 1))
  fi
}

change_roster() {
  # The roster check requires each bot to have its own contract headed with its name.
  printf '# Spare builder\n' > "$1/bots/spare-builder.md"
  jq '.bots += [{name: "Spare builder", role: "builder", runsOn: "test", job: "Builds nothing.", status: "paused", contract: "bots/spare-builder.md"}]' \
    "$1/roster.json" > "$1/roster.tmp" && mv "$1/roster.tmp" "$1/roster.json"
}

repo=$(new_repo passing)
change_roster "$repo"
prove "$repo"
expect "passing bundle from the real artifact" pass "$repo"
echo "     evidence captured:"
sed 's/^/       /' "$repo/proof/control-room-check.txt"

repo=$(new_repo missing)
change_roster "$repo"
commit "$repo" "Change without proof"
expect "missing proof fails" fail "$repo" "No proof bundle"

repo=$(new_repo stale)
change_roster "$repo"
prove "$repo"
jq '.cap.buildersAtOnce = 2' "$repo/roster.json" > "$repo/roster.tmp" && mv "$repo/roster.tmp" "$repo/roster.json"
commit "$repo" "Change after proof"
expect "code changed after proof fails as stale" fail "$repo" "Proof is stale"

repo=$(new_repo inconclusive)
change_roster "$repo"
prove "$repo" INCONCLUSIVE
expect "INCONCLUSIVE result fails" fail "$repo" "Verification reported INCONCLUSIVE"

repo=$(new_repo broken)
jq '.cap.buildersAtOnce = -1' "$repo/roster.json" > "$repo/roster.tmp" && mv "$repo/roster.tmp" "$repo/roster.json"
prove "$repo"
expect "PASS claimed while a check exited non-zero fails" fail "$repo" "exited 1"

repo=$(new_repo uncommitted)
change_roster "$repo"
prove "$repo"
rm "$repo/proof/control-room-check.txt"
commit "$repo" "Drop evidence"
expect "evidence missing from the commit fails" fail "$repo" "is not committed"

repo=$(new_repo escape)
change_roster "$repo"
prove "$repo"
jq '.evidence[0].path = "proof/../roster.json"' "$repo/proof/manifest.json" > "$repo/m.tmp" && mv "$repo/m.tmp" "$repo/proof/manifest.json"
commit "$repo" "Point evidence outside proof"
expect "evidence outside proof/ fails" fail "$repo" "must sit inside proof/"

repo=$(new_repo oversized)
change_roster "$repo"
prove "$repo"
head -c 6000000 /dev/zero > "$repo/proof/recording.bin"
commit "$repo" "Add a large file to proof"
expect "proof over 5 MB fails" fail "$repo" "over the 5 MB cap"

repo=$(new_repo symlink)
change_roster "$repo"
prove "$repo"
echo "evidence that lives outside the repository" > "$work/outside.log"
rm "$repo/proof/control-room-check.txt"
ln -s "$work/outside.log" "$repo/proof/control-room-check.txt"
commit "$repo" "Replace evidence with a symlink"
expect "symlinked evidence fails" fail "$repo" "is not a regular file"

repo=$(new_repo pattern)
change_roster "$repo"
prove "$repo"
jq '.evidence[0].path = "proof/*.txt"' "$repo/proof/manifest.json" > "$repo/m.tmp" && mv "$repo/m.tmp" "$repo/proof/manifest.json"
commit "$repo" "Name evidence by pattern"
expect "evidence named by a pattern fails" fail "$repo" "is not committed"

repo=$(new_repo directory)
change_roster "$repo"
prove "$repo"
jq '.evidence[0].path = "proof/"' "$repo/proof/manifest.json" > "$repo/m.tmp" && mv "$repo/m.tmp" "$repo/proof/manifest.json"
commit "$repo" "Name a directory as evidence"
expect "evidence naming a directory fails" fail "$repo" "is not committed"

repo=$(new_repo traversal)
change_roster "$repo"
prove "$repo"
ln -s .. "$repo/proof/up"
jq '.evidence[0].path = "proof/up/roster.json"' "$repo/proof/manifest.json" > "$repo/m.tmp" && mv "$repo/m.tmp" "$repo/proof/manifest.json"
commit "$repo" "Reach evidence through a symlinked directory"
expect "evidence through a symlinked directory fails" fail "$repo" "is not committed"

repo=$(new_repo spaced)
change_roster "$repo"
prove "$repo"
git -C "$repo" mv proof/control-room-check.txt "proof/control room check.txt"
jq '.evidence[0].path = "proof/control room check.txt"' "$repo/proof/manifest.json" > "$repo/m.tmp" && mv "$repo/m.tmp" "$repo/proof/manifest.json"
commit "$repo" "Use a filename with a space"
expect "evidence filename with a space passes" pass "$repo"

repo=$(new_repo untracked-manifest)
change_roster "$repo"
prove "$repo"
# Commit the removal directly: commit() would add the manifest back.
git -C "$repo" rm -q --cached proof/manifest.json
git -C "$repo" -c user.name=test -c user.email=test@example.com commit -qm "Stop tracking the manifest"
expect "uncommitted manifest fails" fail "$repo" "manifest.json is not committed"

repo=$(new_repo symlinked-manifest)
change_roster "$repo"
prove "$repo"
cp "$repo/proof/manifest.json" "$work/outside-manifest.json"
rm "$repo/proof/manifest.json"
ln -s "$work/outside-manifest.json" "$repo/proof/manifest.json"
commit "$repo" "Replace the manifest with a symlink"
expect "symlinked manifest fails" fail "$repo" "manifest.json is not a regular file"

repo=$(new_repo edited-manifest)
change_roster "$repo"
prove "$repo" INCONCLUSIVE
# Leave a PASS manifest in the working tree only; the committed one must win.
jq '.result = "PASS"' "$repo/proof/manifest.json" > "$repo/m.tmp" && mv "$repo/m.tmp" "$repo/proof/manifest.json"
expect "uncommitted manifest edits are ignored" fail "$repo" "Verification reported INCONCLUSIVE"

repo=$(new_repo newline-path)
change_roster "$repo"
prove "$repo"
cp "$repo/proof/control-room-check.txt" "$repo/proof/second.txt"
jq '.evidence[0].path = "proof/control-room-check.txt\nproof/second.txt"' "$repo/proof/manifest.json" > "$repo/m.tmp" && mv "$repo/m.tmp" "$repo/proof/manifest.json"
commit "$repo" "Join two evidence paths with a newline"
expect "evidence path with a newline fails" fail "$repo" "must not contain a newline"

repo=$(new_repo non-ascii)
change_roster "$repo"
prove "$repo"
git -C "$repo" mv proof/control-room-check.txt "proof/"$'caf\303\251.txt'
jq --arg p "proof/"$'caf\303\251.txt' '.evidence[0].path = $p' "$repo/proof/manifest.json" > "$repo/m.tmp" && mv "$repo/m.tmp" "$repo/proof/manifest.json"
commit "$repo" "Use a non-ASCII evidence filename"
expect "non-ASCII evidence filename passes" pass "$repo"

# scripts/write-proof.sh writes the bundle a builder commits.
helper() {
  bash "$1/scripts/write-proof.sh" --repo "$1" --ticket "Etdev2/sweet-potato#5" \
    --fixture "projects.json as committed" --shows "The control-room check output." \
    -- "${@:2}"
}

repo=$(new_repo helper-pass)
change_roster "$repo"
helper "$repo" "bash scripts/check-control-room.sh" > /dev/null
commit "$repo" "Write proof with the helper"
expect "helper-written bundle passes" pass "$repo"

repo=$(new_repo helper-fail)
jq '.cap.buildersAtOnce = -1' "$repo/roster.json" > "$repo/roster.tmp" && mv "$repo/roster.tmp" "$repo/roster.json"
code=0
helper "$repo" "bash scripts/check-control-room.sh" > /dev/null 2>&1 || code=$?
commit "$repo" "Write proof for a failing check"
if [ "$code" -ne 0 ] && [ "$(jq -r .result "$repo/proof/manifest.json")" = FAIL ]; then
  echo "ok   helper records a failing command as FAIL"
else
  echo "FAIL helper records a failing command as FAIL (exit $code)"
  failures=$((failures + 1))
fi
expect "helper's FAIL bundle is rejected" fail "$repo" "Verification reported FAIL"

repo=$(new_repo helper-replace)
change_roster "$repo"
prove "$repo"
helper "$repo" "bash scripts/check-control-room.sh" > /dev/null
commit "$repo" "Replace the old bundle"
if [ ! -e "$repo/proof/control-room-check.txt" ] \
  && [ -z "$(git -C "$repo" ls-files -- proof/control-room-check.txt)" ]; then
  echo "ok   helper replaces the previous bundle"
else
  echo "FAIL helper replaces the previous bundle"
  failures=$((failures + 1))
fi
expect "replaced bundle passes" pass "$repo"

repo=$(new_repo helper-no-behavior)
printf '\nA documentation-only note.\n' >> "$repo/README.md"
bash "$repo/scripts/write-proof.sh" --repo "$repo" --ticket "Etdev2/sweet-potato#5" \
  --fixture "the repository as committed" --shows "The control-room check output." \
  --no-behavior-change "Documentation only; no user-visible behavior changed." \
  -- "bash scripts/check-control-room.sh" > /dev/null
commit "$repo" "Write proof for a documentation change"
if [ "$(jq -r '.behaviorChanged' "$repo/proof/manifest.json")" = false ]; then
  expect "helper bundle for a no-behavior change passes" pass "$repo"
else
  echo "FAIL helper bundle for a no-behavior change passes (behaviorChanged not false)"
  failures=$((failures + 1))
fi

repo=$(new_repo helper-drift)
change_roster "$repo"
out=$(helper "$repo" "bash scripts/check-control-room.sh" "echo drift > drift.txt" 2>&1) && code=0 || code=$?
if [ "$code" -ne 0 ] && grep -q "changed files outside proof/" <<< "$out"; then
  echo "ok   helper refuses when verification changes the code"
else
  echo "FAIL helper refuses when verification changes the code (exit $code)"
  sed 's/^/     /' <<< "$out"
  failures=$((failures + 1))
fi

repo=$(new_repo helper-tamper)
change_roster "$repo"
# The command swaps proof-digest.sh for one that prints the original digest.
tamper='d=$(bash scripts/proof-digest.sh .); printf "#!/usr/bin/env bash\necho %s\n" "$d" > scripts/proof-digest.sh'
out=$(helper "$repo" "bash scripts/check-control-room.sh" "$tamper" 2>&1) && code=0 || code=$?
if [ "$code" -ne 0 ] && grep -q "changed files outside proof/" <<< "$out" \
  && [ "$(jq -r '.result? // empty' "$repo/proof/manifest.json" 2>/dev/null)" != PASS ]; then
  echo "ok   helper refuses when a command replaces proof-digest.sh"
else
  echo "FAIL helper refuses when a command replaces proof-digest.sh (exit $code)"
  sed 's/^/     /' <<< "$out"
  failures=$((failures + 1))
fi

repo=$(new_repo helper-symlinked-proof)
change_roster "$repo"
mkdir -p "$work/outside-proof"
echo "untouched" > "$work/outside-proof/sentinel.txt"
ln -s "$work/outside-proof" "$repo/proof"
commit "$repo" "Make proof a symlink"
out=$(helper "$repo" "bash scripts/check-control-room.sh" 2>&1) && code=0 || code=$?
if [ "$code" -ne 0 ] && grep -q "proof is a symlink" <<< "$out" \
  && [ "$(ls "$work/outside-proof")" = sentinel.txt ]; then
  echo "ok   helper refuses a symlinked proof/ and writes nothing outside"
else
  echo "FAIL helper refuses a symlinked proof/ and writes nothing outside (exit $code)"
  sed 's/^/     /' <<< "$out"
  failures=$((failures + 1))
fi

git init -q "$work/submodule-source"
echo v1 > "$work/submodule-source/lib.txt"
git -C "$work/submodule-source" add -A
git -C "$work/submodule-source" -c user.name=test -c user.email=test@example.com commit -qm source
repo=$(new_repo helper-submodule)
change_roster "$repo"
git -C "$repo" -c protocol.file.allow=always submodule -q add "$work/submodule-source" vendor/sub
commit "$repo" "Add a submodule"
out=$(helper "$repo" "bash scripts/check-control-room.sh" "echo changed > vendor/sub/lib.txt" 2>&1) && code=0 || code=$?
if [ "$code" -ne 0 ] && grep -q "submodule has uncommitted changes" <<< "$out"; then
  echo "ok   helper refuses when a command dirties a submodule"
else
  echo "FAIL helper refuses when a command dirties a submodule (exit $code)"
  sed 's/^/     /' <<< "$out"
  failures=$((failures + 1))
fi

repo=$(new_repo helper-assume-unchanged)
jq '.cap.buildersAtOnce = -1' "$repo/roster.json" > "$repo/roster.tmp" && mv "$repo/roster.tmp" "$repo/roster.json"
hide="git update-index --assume-unchanged scripts/check-control-room.sh && printf '#!/usr/bin/env bash\nexit 0\n' > scripts/check-control-room.sh"
out=$(helper "$repo" "$hide" "bash scripts/check-control-room.sh" 2>&1) && code=0 || code=$?
if [ "$code" -ne 0 ] && grep -q "assume-unchanged or skip-worktree" <<< "$out"; then
  echo "ok   helper refuses when a command hides a change with assume-unchanged"
else
  echo "FAIL helper refuses when a command hides a change with assume-unchanged (exit $code)"
  sed 's/^/     /' <<< "$out"
  failures=$((failures + 1))
fi

# A large index: more `git ls-files` output than one pipe buffer holds, so a
# check that stops reading early would miss the flag.
repo=$(new_repo helper-large-index)
change_roster "$repo"
mkdir -p "$repo/bulk"
for i in $(seq 1 3000); do echo "$i" > "$repo/bulk/file-$i.txt"; done
commit "$repo" "Add many files"
git -C "$repo" update-index --assume-unchanged roster.json
out=$(helper "$repo" "bash scripts/check-control-room.sh" 2>&1) && code=0 || code=$?
if [ "$code" -ne 0 ] && grep -q "assume-unchanged or skip-worktree" <<< "$out"; then
  echo "ok   helper finds a flagged file in a large index"
else
  echo "FAIL helper finds a flagged file in a large index (exit $code)"
  failures=$((failures + 1))
fi

# A command that swaps proof/ for a symlink mid-run must not lead the helper to
# write outside the repository: not the manifest after the last command, and
# not the log of a command that runs after the swap.
for case in "last:" "then-log:true"; do
  name=${case%%:*}
  repo=$(new_repo "helper-swap-$name")
  change_roster "$repo"
  mkdir -p "$work/swap-$name/outside" "$work/swap-$name/moved"
  swap="mv proof $(printf %q "$work/swap-$name/moved/proof") && ln -s $(printf %q "$work/swap-$name/outside") proof"
  later=${case#*:}
  out=$(helper "$repo" "bash scripts/check-control-room.sh" "$swap" ${later:+"$later"} 2>&1) && code=0 || code=$?
  if [ "$code" -ne 0 ] && grep -q "replaced proof/ with a symlink" <<< "$out" \
    && [ -z "$(ls -A "$work/swap-$name/outside")" ]; then
    echo "ok   helper writes nothing outside when a command swaps proof/ ($name)"
  else
    echo "FAIL helper writes nothing outside when a command swaps proof/ ($name, exit $code)"
    sed 's/^/     /' <<< "$out"
    ls -A "$work/swap-$name/outside" | sed 's/^/     outside: /'
    failures=$((failures + 1))
  fi
done

# A command that plants symlinks where the helper writes its own files.
repo=$(new_repo helper-linked-files)
change_roster "$repo"
mkdir -p "$work/linked"
echo untouched > "$work/linked/verification.txt"
echo untouched > "$work/linked/manifest.json"
plant="ln -s $(printf %q "$work/linked/verification.txt") proof/verification.txt && ln -s $(printf %q "$work/linked/manifest.json") proof/manifest.json"
out=$(helper "$repo" "bash scripts/check-control-room.sh" "$plant" 2>&1) && code=0 || code=$?
if [ "$code" -eq 0 ] \
  && [ "$(cat "$work/linked/verification.txt" "$work/linked/manifest.json")" = $'untouched\nuntouched' ] \
  && [ ! -L "$repo/proof/verification.txt" ] && [ ! -L "$repo/proof/manifest.json" ]; then
  commit "$repo" "Write proof past planted links"
  expect "helper replaces links a command planted in proof/" pass "$repo"
else
  echo "FAIL helper replaces links a command planted in proof/ (exit $code)"
  sed 's/^/     /' <<< "$out"
  failures=$((failures + 1))
fi

# TMPDIR inside proof/ would put the helper's log where a swapped proof/ can
# redirect it. The helper must refuse before any command runs, so not even a
# log its cleanup would delete reaches the external target.
repo=$(new_repo helper-tmpdir-in-proof)
change_roster "$repo"
mkdir -p "$work/tmpdir/outside" "$work/tmpdir/moved"
swap="mv proof $(printf %q "$work/tmpdir/moved/proof") && ln -s $(printf %q "$work/tmpdir/outside") proof"
peek="ls -A $(printf %q "$work/tmpdir/outside") > $(printf %q "$work/tmpdir/seen.txt")"
keep='for f in proof/tmp.*; do [ -f "$f" ] && mv -- "$f" proof/leaked.log; done; true'
out=$(TMPDIR="$repo/proof" helper "$repo" "$swap" "$peek" "$keep" 2>&1) && code=0 || code=$?
if [ "$code" -ne 0 ] && grep -q "TMPDIR is inside the repository" <<< "$out" \
  && [ -z "$(ls -A "$work/tmpdir/outside")" ] && [ ! -s "$work/tmpdir/seen.txt" ]; then
  echo "ok   helper refuses a TMPDIR inside the repository"
else
  echo "FAIL helper refuses a TMPDIR inside the repository (exit $code)"
  sed 's/^/     /' <<< "$out"
  cat "$work/tmpdir/seen.txt" "$work/tmpdir/outside"/* 2>/dev/null | sed 's/^/     outside: /'
  failures=$((failures + 1))
fi

# A command that replaces the log's own path with a link must not redirect
# the helper's later writes, or change what it copies into proof/. Reading the
# helper's descriptor would move its offset, so the command must not get it.
repo=$(new_repo helper-log-relinked)
change_roster "$repo"
mkdir -p "$work/relink/tmp" "$work/relink/outside"
relink="for f in $(printf %q "$work/relink/tmp")/tmp.*; do rm -f \"\$f\"; ln -s $(printf %q "$work/relink/outside/redirected") \"\$f\"; done; cat <&4 > /dev/null 2>&1; true"
out=$(TMPDIR="$work/relink/tmp" helper "$repo" "$relink" "echo after-relink" 2>&1) && code=0 || code=$?
if [ "$code" -eq 0 ] && [ -z "$(ls -A "$work/relink/outside")" ] \
  && grep -q '^\$ for f in' "$repo/proof/verification.txt" \
  && grep -q '^after-relink$' "$repo/proof/verification.txt"; then
  commit "$repo" "Write proof past a relinked log"
  expect "helper keeps its log when a command relinks the log path" pass "$repo"
else
  echo "FAIL helper keeps its log when a command relinks the log path (exit $code)"
  sed 's/^/     /' <<< "$out"
  ls -A "$work/relink/outside" | sed 's/^/     outside: /'
  failures=$((failures + 1))
fi

repo=$(new_repo quotepath)
printf 'note\n' > "$repo/"$'caf\303\251.txt'  # "café.txt", which git quotes by default
commit "$repo" "Add a non-ASCII path"
default_digest=$("$repo/scripts/proof-digest.sh" "$repo")
git -C "$repo" config core.quotePath false
raw_digest=$("$repo/scripts/proof-digest.sh" "$repo")
if [ "$default_digest" = "$raw_digest" ]; then
  echo "ok   digest ignores core.quotePath"
else
  echo "FAIL digest ignores core.quotePath ($default_digest vs $raw_digest)"
  failures=$((failures + 1))
fi

repo=$(new_repo proof-only)
change_roster "$repo"
prove "$repo"
echo "extra note" >> "$repo/proof/control-room-check.txt"
commit "$repo" "Touch only the proof folder"
expect "editing only proof/ keeps the digest" pass "$repo"

if [ "$failures" -gt 0 ]; then
  echo "$failures proof-gate case(s) failed."
  exit 1
fi
echo "All proof-gate cases behave as specified."
