#!/usr/bin/env bash
set -euo pipefail

roster="${1:-roster.json}"

if ! jq empty "$roster" 2>/dev/null; then
  echo "::error file=$roster::$roster is not valid JSON. Fix the syntax, then run scripts/check-roster.sh again."
  exit 1
fi

# jq reads a stream, so an empty file or several concatenated documents would pass.
documents=$(jq -s 'length' "$roster")
if [ "$documents" -ne 1 ]; then
  echo "::error file=$roster::$roster must hold exactly one JSON document, but it holds $documents."
  exit 1
fi

problems=$(jq -r '
  def roles: ["executive-chef", "architect", "builder", "reviewer"];
  def statuses: ["hiring", "not-connected", "active", "paused"];
  def fields: ["name", "role", "runsOn", "job", "status", "contract"];

  def bot_problems($i):
    if type != "object" then
      "bots[\($i)] is \(type). Make each bot an object."
    else
      . as $bot
      | (fields[] as $f
          | select(($bot[$f] | type) != "string" or ($bot[$f] | length) == 0)
          | "bots[\($i)] has no \($f). Every bot needs \(fields | join(", ")).")
      , (select(($bot.role | type) == "string" and ($bot.role | IN(roles[]) | not))
          | "bots[\($i)].role is \"\($bot.role)\". Use one of: \(roles | join(", ")).")
      , (select(($bot.status | type) == "string" and ($bot.status | IN(statuses[]) | not))
          | "bots[\($i)].status is \"\($bot.status)\". Use one of: \(statuses | join(", ")).")
      , (select(($bot.contract | type) == "string" and ($bot.contract | test("^bots/[a-z0-9-]+\\.md$") | not))
          | "bots[\($i)].contract is \"\($bot.contract)\". Point it to a job contract file in bots/, such as bots/claude-builder.md.")
    end;

  .cap.buildersAtOnce as $cap
  | .bots as $bots
  | if ($bots | type) != "array" then
      "bots is \($bots | type). Make it a list of bots."
    else
      (if ($cap | type) == "number" and $cap >= 0 and ($cap | floor) == $cap then empty
       else "cap.buildersAtOnce is \($cap | tojson). Set it to a whole number, 0 or more." end)
      , ($bots | to_entries[] | .key as $i | .value | bot_problems($i))
      , ([$bots[] | objects | .name | strings] | group_by(.) | map(select(length > 1) | .[0])[]
          | "Two bots are named \"\(.)\". Give each bot its own name.")
      , ([$bots[] | objects | .contract | strings] | group_by(.) | map(select(length > 1) | .[0])[]
          | "Two bots share contract \(.). Each bot needs its own one-job contract.")
      , (([$bots[] | objects | select(.role == "builder" and .status == "active")] | length) as $active
          | if ($cap | type) == "number" and $active > $cap then
              "\($active) builders are active but cap.buildersAtOnce is \($cap). Pause a builder, or raise the cap in a pull request Et approves."
            else empty end)
    end
' "$roster")

if [ -n "$problems" ]; then
  while IFS= read -r problem; do
    echo "::error file=$roster::$problem"
  done <<< "$problems"
  exit 1
fi

# Job contracts live next to the control room's root, whichever roster is checked.
# A contract belongs to the bot its first line names, as "# <bot name>".
root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
missing_contracts=""
while IFS=$'\t' read -r name contract; do
  if [ ! -f "$root/$contract" ]; then
    missing_contracts+="$name names contract $contract, which does not exist. Write the one-job contract before adding the bot."$'\n'
  elif [ "$(head -n 1 "$root/$contract")" != "# $name" ]; then
    missing_contracts+="$name names contract $contract, whose first line is not \"# $name\". Point the bot to its own contract."$'\n'
  fi
done < <(jq -r '.bots[] | [.name, .contract] | @tsv' "$roster")

if [ -n "$missing_contracts" ]; then
  while IFS= read -r problem; do
    [ -n "$problem" ] && echo "::error file=$roster::$problem"
  done <<< "$missing_contracts"
  exit 1
fi

active=$(jq '[.bots[] | select(.role == "builder" and .status == "active")] | length' "$roster")
cap=$(jq '.cap.buildersAtOnce' "$roster")
echo "$roster is valid. Active builders: $active of $cap."
