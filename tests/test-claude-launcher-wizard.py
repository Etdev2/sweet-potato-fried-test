#!/usr/bin/env python3
"""Drive the real launcher wizard in a pseudo-terminal against stub commands.

The stubs stand in for gh, claude and the browser openers, and the token is a
fake. These cases prove the script's own branches. They do not prove a real
sign-in or a real secret write.
"""

import errno
import json
import os
from pathlib import Path
import pty
import select
import subprocess
import sys
import tempfile
import termios
import time
import unittest

ROOT = Path(__file__).resolve().parents[1]
WIZARD = ROOT / "scripts/claude-launcher-wizard.sh"
TEMPLATE = ROOT / ".claude/skills/wizard/template.sh"
TOKEN = "sk-ant-fixture-not-a-real-token"
SECRET = "CLAUDE_CODE_OAUTH_TOKEN"
REPOS = ["Etdev2/sweet-potato", "Etdev2/sweet-potato-fried-test"]
BROWSERS = ("wslview", "explorer.exe", "xdg-open", "open")
DONE = "Setup complete"
NOT_DONE = "Setup is not complete"

# One stub serves every command name. It records the call, never the payload.
STUB = r"""import json, os, sys
tool = os.path.basename(sys.argv[0])
args = sys.argv[1:]
mode = os.environ["FIXTURE_MODE"]
record = {"tool": tool, "args": args}
code = 0
if tool == "gh":
    repo = os.environ.get("GH_REPO")
    record["repo"] = repo
    if args == ["auth", "status"]:
        code = 1 if mode == "gh-signed-out" else 0
    elif args[:2] == ["secret", "set"]:
        payload = sys.stdin.read()
        record["payload"] = "empty" if not payload else "token" if payload == os.environ["FIXTURE_TOKEN"] else "other"
        failing = {"uploads-fail": True, "first-upload-fails": repo == "Etdev2/sweet-potato",
                   "second-upload-fails": repo == "Etdev2/sweet-potato-fried-test"}
        code = 1 if failing.get(mode, False) else 0
    elif args[:2] == ["secret", "list"]:
        # A secret left by an earlier run. Its name proves nothing about this run.
        print("CLAUDE_CODE_OAUTH_TOKEN\t2026-01-01T00:00:00Z")
    else:
        code = 99
elif tool == "claude":
    if mode == "sign-in-fails":
        code = 1
    else:
        print("Fixture sign-in complete")
with open(os.environ["FIXTURE_LOG"], "a") as log:
    log.write(json.dumps(record) + "\n")
sys.exit(code)
"""

READY = ("Ready to start?", "\n")
INSTALLED = ("installed on both repositories?", "y\n")
SIGN_IN = ("Press Enter to start the sign-in", "\n")
COPIED = ("Copy the token now", "\n")
PASTE = "Paste the token:"
FINISH = ("Press Enter to finish", "\n")
TO_TOKEN = [READY, INSTALLED, SIGN_IN, COPIED]


class Run:
    def __init__(self, code, output, calls, leftovers, echo_off, token_in_files):
        self.code = code
        self.output = output
        self.calls = calls
        self.leftovers = leftovers
        self.echo_off = echo_off
        self.token_in_files = token_in_files

    def of(self, tool):
        return [call for call in self.calls if call["tool"] == tool]

    def secret_sets(self):
        return [call for call in self.of("gh") if call["args"][:2] == ["secret", "set"]]

    def browser(self):
        return [call for call in self.calls if call["tool"] in BROWSERS]


def wait_for_hidden_input(master):
    """True once the terminal has stopped echoing, which is what `read -s` does."""
    deadline = time.monotonic() + 5
    while time.monotonic() < deadline:
        if not termios.tcgetattr(master)[3] & termios.ECHO:
            return True
        time.sleep(0.01)
    return False


def drive(mode, steps=(), args=(), terminal=True, with_claude=True):
    """Run the wizard, answering each prompt only after it appears."""
    with tempfile.TemporaryDirectory(prefix="launcher-fixture-") as scratch:
        scratch = Path(scratch)
        bins, work, home, log = scratch / "bin", scratch / "work", scratch / "home", scratch / "calls.jsonl"
        for folder in (bins, work, home):
            folder.mkdir()
        log.write_text("")
        names = ("gh",) + BROWSERS + (("claude",) if with_claude else ())
        for name in names:
            stub = bins / name
            stub.write_text("#!" + sys.executable + "\n" + STUB)
            stub.chmod(0o755)
        # Only the stubs and the system folders, so no real gh or claude can run.
        env = {"PATH": str(bins) + ":/usr/bin:/bin", "HOME": str(home), "TERM": "dumb",
               "FIXTURE_MODE": mode, "FIXTURE_LOG": str(log), "FIXTURE_TOKEN": TOKEN}
        command = ["bash", str(WIZARD), *args]
        echo_off = None
        if not terminal:
            result = subprocess.run(command, input="", cwd=work, env=env, text=True, capture_output=True, timeout=30)
            code, output = result.returncode, result.stdout + result.stderr
        else:
            master, slave = pty.openpty()
            proc = subprocess.Popen(command, stdin=slave, stdout=slave, stderr=slave, cwd=work, env=env)
            os.close(slave)
            raw, searched, pending = bytearray(), 0, list(steps)
            deadline = time.monotonic() + 30
            try:
                while time.monotonic() < deadline:
                    if pending:
                        found = raw.find(pending[0][0].encode(), searched)
                        if found >= 0:
                            prompt, reply = pending.pop(0)
                            searched = found + len(prompt)
                            if prompt == PASTE:
                                echo_off = wait_for_hidden_input(master)
                            os.write(master, reply.encode())
                            continue
                    ready, _, _ = select.select([master], [], [], 0.1)
                    if ready:
                        try:
                            data = os.read(master, 65536)
                        except OSError as error:
                            if error.errno == errno.EIO:
                                break
                            raise
                        if not data:
                            break
                        raw.extend(data)
                    elif proc.poll() is not None:
                        break
                # The terminal closes a moment before the exit status is ready.
                code = proc.wait(timeout=max(0.1, deadline - time.monotonic()))
            except subprocess.TimeoutExpired:
                code = "timed out waiting for " + (repr(pending[0][0]) if pending else "exit")
            finally:
                if proc.poll() is None:
                    proc.kill()
                    proc.wait()
                os.close(master)
            output = raw.decode(errors="replace")
        calls = [json.loads(line) for line in log.read_text().splitlines()]
        leftovers = sorted(path.name for path in work.iterdir())
        token_in_files = [str(path.relative_to(scratch)) for path in scratch.rglob("*")
                          if path.is_file() and TOKEN.encode() in path.read_bytes()]
        return Run(code, output, calls, leftovers, echo_off, token_in_files)


OBSERVED = []


class Launcher(unittest.TestCase):
    def drive(self, case, mode, steps=(), **options):
        """Run one case and keep what it did for the table printed at the end."""
        run = drive(mode, steps, **options)
        OBSERVED.append((case, run.code, "yes" if DONE in run.output else "no",
                         len(run.secret_sets()), len(run.browser()), len(run.of("claude"))))
        return run

    def assert_nothing_sent(self, run):
        self.assertEqual(run.secret_sets(), [])
        self.assertNotIn(DONE, run.output)
        self.assertEqual(run.leftovers, [])

    def test_library_is_the_pinned_template(self):
        marker = "run_wizard() {"
        self.assertEqual(TEMPLATE.read_text().split(marker, 1)[0], WIZARD.read_text().split(marker, 1)[0])
        subprocess.run(["bash", "-n", str(WIZARD)], check=True)

    def test_plan_prints_the_steps_and_calls_nothing(self):
        run = self.drive("--plan", "success", args=["--plan"], terminal=False)
        self.assertEqual(run.code, 0, run.output)
        self.assertIn("1. Install the Claude GitHub App", run.output)
        self.assertIn("3. Store the token", run.output)
        self.assertIn("adds and activates no workflow", run.output)
        self.assertEqual(run.calls, [])
        self.assertEqual(run.leftovers, [])

    def test_invalid_arguments_exit_2_before_any_action(self):
        cases = ([""], ["--install"], ["", "--install"], ["", ""], ["--plan", "extra"], ["--plan", "--plan"], ["", "--plan"])
        for args in cases:
            for terminal in (True, False):
                with self.subTest(args=args, terminal=terminal):
                    where = "terminal" if terminal else "no terminal"
                    run = self.drive(f"arguments {args!r}, {where}", "success", args=args, terminal=terminal)
                    self.assertEqual(run.code, 2, run.output)
                    self.assertIn("Usage:", run.output)
                    self.assertEqual(run.calls, [])
                    self.assertEqual(run.leftovers, [])

    def test_run_without_a_terminal_exits_2_before_any_action(self):
        run = self.drive("no arguments, no terminal", "success", terminal=False)
        self.assertEqual(run.code, 2, run.output)
        self.assertIn("interactive terminal", run.output)
        self.assertEqual(run.calls, [])

    def test_missing_claude_command_stops_before_the_browser(self):
        run = self.drive("claude command missing", "success", with_claude=False)
        self.assertEqual(run.code, 1, run.output)
        self.assertIn("Could not find the Claude Code command-line tool", run.output)
        self.assertEqual(run.calls, [])

    def test_signed_out_gh_stops_before_the_browser(self):
        run = self.drive("gh signed out", "gh-signed-out")
        self.assertEqual(run.code, 1, run.output)
        self.assertIn("gh command is not signed in", run.output)
        self.assertEqual(run.browser(), [])
        self.assertEqual(run.of("claude"), [])
        self.assert_nothing_sent(run)

    def test_app_not_installed_stops_before_the_sign_in(self):
        run = self.drive("app not installed", "success", [READY, ("installed on both repositories?", "n\n")])
        self.assertEqual(run.code, 1, run.output)
        self.assertEqual(run.of("claude"), [])
        self.assert_nothing_sent(run)

    def test_success_stores_the_token_in_both_repositories(self):
        run = self.drive("both uploads succeed", "success", TO_TOKEN + [(PASTE, TOKEN + "\n"), FINISH])
        self.assertEqual(run.code, 0, run.output)
        self.assertIn(DONE, run.output)
        self.assertNotIn(NOT_DONE, run.output)
        self.assertIn("No workflow is active yet", run.output)
        self.assertEqual([call["args"] for call in run.browser()], [["https://github.com/apps/claude"]])
        self.assertEqual([call["args"] for call in run.of("claude")], [["setup-token"]])
        sets = run.secret_sets()
        self.assertEqual([call["repo"] for call in sets], REPOS)
        # The token travels on standard input, never as an argument.
        self.assertEqual([call["args"] for call in sets], [["secret", "set", SECRET]] * 2)
        self.assertEqual([call["payload"] for call in sets], ["token", "token"])
        self.assertTrue(run.echo_off, "the terminal still echoed input at the token prompt")
        self.assertNotIn(TOKEN, run.output)
        self.assertEqual(run.token_in_files, [])
        self.assertEqual(run.leftovers, [])

    def test_failed_uploads_are_not_reported_as_complete(self):
        cases = {
            "uploads-fail": ("both uploads fail", REPOS, []),
            "first-upload-fails": ("first upload fails", REPOS[:1], REPOS[1:]),
            "second-upload-fails": ("second upload fails", REPOS[1:], REPOS[:1]),
        }
        for mode, (case, failed, stored) in cases.items():
            with self.subTest(mode=mode):
                # The stub's `gh secret list` names an old secret in every mode.
                run = self.drive(case + ", old secret listed", mode, TO_TOKEN + [(PASTE, TOKEN + "\n"), FINISH])
                self.assertEqual(run.code, 1, run.output)
                self.assertNotIn(DONE, run.output)
                self.assertIn(NOT_DONE, run.output)
                self.assertEqual([call["repo"] for call in run.secret_sets()], REPOS)
                report = run.output.split(NOT_DONE, 1)[1]
                unconfirmed = report.split("Stored for:", 1)[0]
                for repo in failed:
                    self.assertIn("    " + repo + "\r\n", unconfirmed)
                if stored:
                    self.assertIn("Stored for: " + " ".join(stored) + "\r\n", report)
                else:
                    self.assertNotIn("Stored for:", report)
                self.assertIn("This run did not replace it", report)
                self.assertNotIn(TOKEN, run.output)
                self.assertEqual(run.token_in_files, [])

    def test_failed_sign_in_sends_nothing(self):
        run = self.drive("setup-token fails", "sign-in-fails", TO_TOKEN + [(PASTE, TOKEN + "\n"), FINISH])
        self.assertEqual(run.code, 1, run.output)
        self.assertIn(NOT_DONE, run.output)
        self.assertEqual([call["args"] for call in run.of("claude")], [["setup-token"]])
        self.assert_nothing_sent(run)

    def test_empty_or_spaced_token_sends_nothing(self):
        cases = {"": "empty token", " ": "token of one space", "sk-ant-fixture with-a-space": "token with a space inside"}
        for value, case in cases.items():
            with self.subTest(value=value):
                # The extra replies answer "Store it anyway?" if the script ever asks.
                run = self.drive(case, "success", TO_TOKEN + [(PASTE, value + "\n"), ("Store it anyway?", "y\n"), FINISH])
                self.assertEqual(run.code, 1, run.output)
                self.assertIn(NOT_DONE, run.output)
                self.assertNotIn("Store it anyway?", run.output)
                self.assert_nothing_sent(run)

    def test_unusual_token_needs_a_yes(self):
        declined = self.drive("unusual token, declined", "success", TO_TOKEN + [(PASTE, "not-a-claude-token\n"), ("Store it anyway?", "n\n"), FINISH])
        self.assertEqual(declined.code, 1, declined.output)
        self.assert_nothing_sent(declined)
        accepted = self.drive("unusual token, accepted", "success", TO_TOKEN + [(PASTE, "not-a-claude-token\n"), ("Store it anyway?", "y\n"), FINISH])
        self.assertEqual(accepted.code, 0, accepted.output)
        self.assertIn(DONE, accepted.output)
        self.assertEqual([call["payload"] for call in accepted.secret_sets()], ["other", "other"])
        self.assertNotIn("not-a-claude-token", accepted.output)


if __name__ == "__main__":
    program = unittest.main(verbosity=2, exit=False)
    print("\nObserved runs against the stub commands:")
    print(f"{'case':<50} {'exit':>4}  {'complete':<8}  {'write attempts':>14}  {'browser':>7}  {'sign-in':>7}")
    for case, code, complete, writes, browser, sign_in in OBSERVED:
        print(f"{case:<50} {code!s:>4}  {complete:<8}  {writes:>14}  {browser:>7}  {sign_in:>7}")
    sys.exit(not program.result.wasSuccessful())
