# Local page check

The operator can check whether a candidate loopback port returns the expected bounded dashboard HTML.

## Sub-features

- PAGE: distinguish an expected page from an unauthorized or unrelated response.
- REDIRECT: refuse redirects instead of following another endpoint.
- PORT: refuse invalid or nonnumeric addresses.

## How to get to it (user POV)

Run `bash scripts/dashboard-wizard.sh --doctor 8317` for the approved local instance, or choose its documented numeric port.

## Driving it with the CLI

Preconditions: live requests use only an approved local instance. Automated fixture checks require no provider accounts.

- Candidate page: `python3 tests/test-dashboard-tools.py` drives the real doctor against an ephemeral HTTP fixture; expected HTML yields READY while productAcceptance remains INCONCLUSIVE.
- Refusals: the same command exercises unrelated HTML, 401, redirects, oversized bodies and invalid ports. Expect exit 2 and no response payload in logs.

## Gotchas

A page title is not an identity or ownership check. A READY candidate does not authorize driving it. HTTP fixtures prove only checker behavior, and unavailable live quota never becomes zero or PASS.
