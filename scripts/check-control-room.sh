#!/usr/bin/env bash
set -euo pipefail

scripts/check-roster.sh roster.json

scripts/check-projects.sh projects.json

for file in skills/registry.json schemas/token-usage.schema.json; do
  if ! jq empty "$file" 2>/dev/null; then
    echo "::error file=$file::$file is not valid JSON."
    exit 1
  fi
done

skill_problems=$(jq -r '
  .sources as $sources
  | (select((.version | type) != "number") | "skills registry needs a numeric version."),
    ($sources[]
      | select((.commit | type) != "string" or (.commit | test("^[0-9a-f]{40}$") | not))
      | "Source \(.id // "<missing>") must pin a 40-character commit SHA."),
    (.workflow[].skills[] as $skill
      | select(([$sources[].id] | index($skill.source)) == null)
      | "Skill \($skill.name) names unknown source \($skill.source).")
' skills/registry.json)

if [ -n "$skill_problems" ]; then
  while IFS= read -r problem; do
    echo "::error file=skills/registry.json::$problem"
  done <<< "$skill_problems"
  exit 1
fi

echo "Control-room data is valid."
