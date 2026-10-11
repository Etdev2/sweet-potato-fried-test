#!/usr/bin/env python3
"""Validate usage event files against schemas/token-usage.schema.json.

Usage: scripts/check-usage-events.py EVENT.json [EVENT.json ...]

Prints one line per schema error, naming the event path and the schema rule
that rejected it, and exits 1 if any event is invalid. Needs the `jsonschema`
and `rfc3339-validator` packages, pinned in CI. Without the second, jsonschema
skips `date-time` checks silently, so this script refuses to run.
"""

import json
import sys
from pathlib import Path

from jsonschema import Draft202012Validator

SCHEMA = Path(__file__).resolve().parent.parent / "schemas" / "token-usage.schema.json"


def main(paths: list[str]) -> int:
    if not paths:
        print("Give at least one usage event file.", file=sys.stderr)
        return 2

    format_checker = Draft202012Validator.FORMAT_CHECKER
    if format_checker.conforms("not-a-date", "date-time"):
        print(
            "::error::date-time checking is unavailable. Install rfc3339-validator, "
            "pinned in .github/workflows/roster.yml, so malformed timestamps fail.",
            file=sys.stderr,
        )
        return 2

    schema = json.loads(SCHEMA.read_text())
    Draft202012Validator.check_schema(schema)
    validator = Draft202012Validator(schema, format_checker=format_checker)

    failed = False
    for path in paths:
        event = json.loads(Path(path).read_text())
        errors = sorted(validator.iter_errors(event), key=lambda e: list(e.absolute_path))
        for error in errors:
            failed = True
            pointer = "/" + "/".join(str(part) for part in error.absolute_path)
            rule = "/".join(str(part) for part in error.absolute_schema_path)
            print(f"::error file={path}::{pointer}: {error.message} (schema rule: {rule})")
        if not errors:
            print(f"{path} is a valid usage event.")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
