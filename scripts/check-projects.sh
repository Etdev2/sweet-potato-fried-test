#!/usr/bin/env bash
set -euo pipefail

# Validates the project registry's configuration. It does not prove that a
# verification command runs or that a required check is enforced on the project
# repository. Those happen in the project repo.

projects="${1:-projects.json}"

if ! jq empty "$projects" 2>/dev/null; then
  echo "::error file=$projects::$projects is not valid JSON."
  exit 1
fi

# jq reads a stream, so an empty file or several concatenated documents would pass.
documents=$(jq -s 'length' "$projects")
if [ "$documents" -ne 1 ]; then
  echo "::error file=$projects::$projects must hold exactly one JSON document, but it holds $documents."
  exit 1
fi

problems=$(jq -r '
  def lanes: ["rust-service", "typescript-web"];
  def stages: ["stage-0-unverified", "stage-1-supervised", "stage-2-proven"];
  def verification_statuses: ["missing", "available"];
  def blank: (type != "string") or (test("^\\s*$"));

  .projects
  | if type != "array" or length == 0 then
      "projects must be a non-empty array."
    else
      to_entries[]
      | .key as $i
      | .value as $project
      | (if ($project.verification | type) == "object" then $project.verification else {} end) as $v
      | ($project.requiredChecks) as $checks
      | ($project.trustStage != "stage-0-unverified") as $past_stage_0
      | (select(($project.name | type) != "string" or ($project.name | length) == 0)
          | "projects[\($i)] needs a name.")
      , (select(($project.repository | type) != "string" or ($project.repository | test("^[^/]+/[^/]+$") | not))
          | "projects[\($i)].repository must use owner/name.")
      , (select(($project.lane | IN(lanes[]) | not))
          | "projects[\($i)].lane must be one of: \(lanes | join(", ")).")
      , (select(($project.trustStage | IN(stages[]) | not))
          | "projects[\($i)].trustStage must be one of: \(stages | join(", ")).")
      , (select($project.mergeAuthority != "Et")
          | "projects[\($i)].mergeAuthority must remain Et.")
      , (select(($project.verification | type) != "object")
          | "projects[\($i)].verification must be an object with status and command.")
      , (select(($v.status | IN(verification_statuses[]) | not))
          | "projects[\($i)].verification.status must be one of: \(verification_statuses | join(", ")).")
      , (select($v.status == "missing" and $v.command != null)
          | "projects[\($i)].verification.status is missing but a command is set. Set command to null, or set status to available.")
      , (select($v.status == "available" and ($v.command | blank))
          | "projects[\($i)].verification.status is available but command is not a non-blank string.")
      , (select(($checks | type) != "array")
          | "projects[\($i)].requiredChecks must be an array of check names.")
      , (select(($checks | type) == "array" and any($checks[]; blank))
          | "projects[\($i)].requiredChecks entries must be non-blank strings.")
      , (select(($checks | type) == "array" and ($checks | length) != ($checks | unique | length))
          | "projects[\($i)].requiredChecks lists a check more than once.")
      , (select($past_stage_0 and $v.status != "available")
          | "projects[\($i)] is \($project.trustStage) but verification.status is not available. Stay at stage-0-unverified until the verification command exists.")
      , (select($past_stage_0 and (($checks | type) != "array" or ($checks | length) == 0))
          | "projects[\($i)] is \($project.trustStage) but requiredChecks is empty. Stay at stage-0-unverified until the project names its required checks.")
    end
' "$projects")

if [ -n "$problems" ]; then
  while IFS= read -r problem; do
    echo "::error file=$projects::$problem"
  done <<< "$problems"
  exit 1
fi

echo "$projects is valid."
