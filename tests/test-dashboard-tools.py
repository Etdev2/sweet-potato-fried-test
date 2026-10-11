#!/usr/bin/env python3
"""Exercise real helper entry points; HTTP fixtures prove the checker only."""

import hashlib
import http.server
import json
import os
from pathlib import Path
import subprocess
import shlex
import sys
import tempfile
import threading
import unittest

ROOT = Path(__file__).resolve().parents[1]
WIZARD = ROOT / "scripts/dashboard-wizard.sh"
DOCTOR = ROOT / "scripts/dashboard-doctor.py"


class Fixture(http.server.BaseHTTPRequestHandler):
    requests = []
    response_code = 200
    body = b"<title>CLI Proxy API Management Center</title>"

    def do_GET(self):
        self.requests.append(self.path)
        self.send_response(self.response_code)
        if self.response_code == 302:
            self.send_header("Location", "/secret-destination")
        self.end_headers()
        self.wfile.write(self.body)

    def log_message(self, *_args):
        pass


class Tools(unittest.TestCase):
    def test_matching_pinned_skills_and_resources(self):
        lock = json.loads((ROOT / "skills/trial-sources.json").read_text())
        self.assertEqual({item["name"] for item in lock["sources"]}, {"wizard", "create-verification-skill"})
        for item in lock["sources"]:
            for path, expected in item["files"].items():
                for harness in (".agents", ".claude"):
                    data = (ROOT / harness / "skills" / item["name"] / path).read_bytes()
                    self.assertEqual(hashlib.sha256(data).hexdigest(), expected)
        generated = ROOT / ".agents/skills/verify-dashboard-tools"
        for path in generated.rglob("*"):
            if path.is_file():
                twin = ROOT / ".claude/skills/verify-dashboard-tools" / path.relative_to(generated)
                self.assertEqual(path.read_bytes(), twin.read_bytes())

    def test_unmodified_wizard_library(self):
        source = (ROOT / ".agents/skills/wizard/template.sh").read_text()
        self.assertEqual(source.split("run_wizard() {", 1)[0], WIZARD.read_text().split("run_wizard() {", 1)[0])

    def test_syntax_and_plan_preserve_state(self):
        subprocess.run(["bash", "-n", str(WIZARD)], check=True)
        with tempfile.TemporaryDirectory() as scratch:
            sentinel = Path(scratch) / ".env"
            sentinel.write_text("DO_NOT_CHANGE=existing\n")
            before = sentinel.read_bytes()
            instruments = Path(scratch) / "bin"
            instruments.mkdir()
            marker = Path(scratch) / "browser-or-network-called"
            for name in ("open", "xdg-open", "wslview", "explorer.exe", "curl", "gh", "python3"):
                stub = instruments / name
                stub.write_text("#!/bin/sh\nprintf called > " + shlex.quote(str(marker)) + "\nexit 99\n")
                stub.chmod(0o755)
            env = {**os.environ, "PATH": str(instruments) + os.pathsep + os.environ["PATH"]}
            result = subprocess.run(["/bin/bash", str(WIZARD), "--plan"], cwd=scratch, env=env, text=True, capture_output=True)
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertIn("1. Console connection", result.stdout)
            self.assertIn("3. Quota inspection", result.stdout)
            self.assertIn("Live acceptance remains INCONCLUSIVE", result.stdout)
            self.assertEqual(sentinel.read_bytes(), before)
            self.assertFalse(marker.exists(), "Plan mode invoked an instrumented browser or network command")
            self.assertEqual(sorted(p.name for p in Path(scratch).iterdir()), [".env", "bin"])

    def test_noninteractive_run_refuses_before_browser_or_writes(self):
        with tempfile.TemporaryDirectory() as scratch:
            result = subprocess.run(["bash", str(WIZARD)], input="", cwd=scratch, text=True, capture_output=True)
            self.assertEqual(result.returncode, 2)
            self.assertIn("interactive terminal", result.stderr)
            self.assertEqual(list(Path(scratch).iterdir()), [])

    def test_unknown_option_refused(self):
        result = subprocess.run(["bash", str(WIZARD), "--install"], text=True, capture_output=True)
        self.assertEqual(result.returncode, 2)
        self.assertIn("Usage:", result.stderr)

    def check_fixture(self, code, body, expected):
        handler = type("CaseFixture", (Fixture,), {"requests": [], "response_code": code, "body": body})
        server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            result = subprocess.run([sys.executable, str(DOCTOR), str(server.server_port)], text=True, capture_output=True)
            value = json.loads(result.stdout)
            self.assertEqual(value["result"], expected)
            self.assertEqual(value["productAcceptance"], "INCONCLUSIVE")
            self.assertEqual(result.returncode, 0 if expected == "READY" else 2)
            self.assertEqual(handler.requests, ["/management.html"])
            self.assertNotIn("credential-payload", result.stdout)
        finally:
            server.shutdown()
            server.server_close()
            thread.join(timeout=2)

    def test_expected_page_is_readiness_only(self):
        self.check_fixture(200, Fixture.body, "READY")

    def test_wrong_page_is_inconclusive_and_not_printed(self):
        self.check_fixture(200, b"credential-payload", "INCONCLUSIVE")

    def test_unauthorized_page_is_inconclusive(self):
        self.check_fixture(401, b"credential-payload", "INCONCLUSIVE")

    def test_redirect_is_not_followed(self):
        self.check_fixture(302, b"redirect", "INCONCLUSIVE")

    def test_oversized_page_is_refused(self):
        self.check_fixture(200, Fixture.body + b"x" * (1024 * 1024), "INCONCLUSIVE")

    def test_invalid_port_is_refused(self):
        for value in ("0", "65536", "-1", "8317/path", "remote.example", "1" * 5000):
            result = subprocess.run([sys.executable, str(DOCTOR), value], text=True, capture_output=True)
            self.assertEqual(result.returncode, 2)
            self.assertNotIn("Traceback", result.stderr)


if __name__ == "__main__":
    unittest.main(verbosity=2)
