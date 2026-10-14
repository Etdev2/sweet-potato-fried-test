"""Reproduce release exports through the real CLI and verify their bytes."""
import hashlib
import json
import subprocess
import sys
import tempfile
from pathlib import Path

root = Path(__file__).resolve().parent
expected = json.loads((root / "decks/sha256.json").read_text())
qa = json.loads((root / "decks/qa-independent.json").read_text())
for key, filename in (("content", "deck-content.json"), ("finance", "finance.json"), ("renderer", "render.py")):
    actual = hashlib.sha256((root / filename).read_bytes()).hexdigest()
    if actual != qa["input_sha256"][key]:
        raise SystemExit(f"FAIL: stale producer QA for {filename}")

with tempfile.TemporaryDirectory(prefix="st1-export-replay-") as folder:
    subprocess.run([
        sys.executable, str(root / "render.py"), "--content", str(root / "deck-content.json"),
        "--finance", str(root / "finance.json"), "--out", folder,
    ], check=True)
    exports = sorted((root / "decks").glob("*.pptx")) + sorted((root / "decks").glob("*.pdf"))
    if len(exports) != 6:
        raise SystemExit("FAIL: expected three PPTX/PDF pairs")
    for release in exports:
        replay = Path(folder) / release.name
        digest = hashlib.sha256(release.read_bytes()).hexdigest()
        if digest != expected[release.name] or digest != hashlib.sha256(replay.read_bytes()).hexdigest():
            raise SystemExit(f"FAIL: export differs from recorded release or replay: {release.name}")
        print(f"PASS: byte-identical real CLI replay: {release.name}")
print("PASS: six release files and producer input hashes; same installed fonts/libraries")
