#!/usr/bin/env python3
"""Read-only loopback page check. This does not verify credentials or quota."""

import json
import sys
import urllib.error
import urllib.request


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def main():
    port_text = sys.argv[1] if len(sys.argv) == 2 else "8317"
    if len(sys.argv) > 2 or len(port_text) > 5 or not port_text.isascii() or not port_text.isdecimal():
        print("INCONCLUSIVE: supply one numeric loopback port", file=sys.stderr)
        return 2
    port = int(port_text)
    if not 1 <= port <= 65535:
        print("INCONCLUSIVE: port must be between 1 and 65535", file=sys.stderr)
        return 2
    url = f"http://127.0.0.1:{port}/management.html"
    opener = urllib.request.build_opener(urllib.request.ProxyHandler({}), NoRedirect())
    result = {"url": url, "result": "INCONCLUSIVE", "productAcceptance": "INCONCLUSIVE"}
    try:
        with opener.open(url, timeout=2) as response:
            body = response.read(1024 * 1024 + 1)
            expected = b"<title>CLI Proxy API Management Center</title>"
            if response.status != 200 or len(body) > 1024 * 1024 or expected not in body:
                result["reason"] = "The response is not the expected bounded dashboard HTML."
            else:
                result["result"] = "READY"
                result["reason"] = "The page is reachable. Service ownership, versions, login and quota are unverified."
    except (urllib.error.URLError, TimeoutError, OSError):
        result["reason"] = "The local dashboard did not return the expected page; redirects are refused."
    print(json.dumps(result, sort_keys=True))
    return 0 if result["result"] == "READY" else 2


if __name__ == "__main__":
    sys.exit(main())
