# Commit a proof bundle with every pull request

## Decision

Every implementation pull request commits a proof bundle: `proof/manifest.json` plus its evidence files, all inside `proof/`. Each pull request replaces the previous bundle. Git history keeps the old ones.

`scripts/check-proof.sh` rejects a pull request when:

- the bundle is missing;
- the result is anything other than `PASS`, including `INCONCLUSIVE`;
- a listed command exited non-zero;
- evidence is missing, uncommitted or outside `proof/`;
- `proof/` holds more than 5 MB;
- the bundle's `sourceDigest` differs from `scripts/proof-digest.sh` on the pull request's code.

`scripts/test-proof-gate.sh` proves each rule and runs in the control room's CI. The control room's CI also runs `scripts/check-proof.sh` on every pull request at its head commit, so control-room pull requests carry a bundle too. Pushes to `main` don't re-run it, because the merged tree differs from the reviewed candidate once `main` has moved.

Decided by Et in [#5](https://github.com/Etdev2/sweet-potato/issues/5).

## Why

Et reads proof in the GitHub app, which opens committed files and doesn't preview Actions artifacts. A digest of the staged files outside `proof/` ties the proof to the exact code it ran against without the manifest having to hash itself. `INCONCLUSIVE` blocks because a verification run that couldn't reach a verdict hasn't proved anything. The 5 MB cap leaves room for compressed screenshots and logs while keeping the repo small.

## Consequences

- The check proves the bundle is complete, says `PASS` and matches the code. It can't tell whether the evidence is honest. The reviewer and Et still judge that, and project CI re-runs its own verification command.
- Merging the base branch into a pull request makes its proof stale, so the builder re-runs verification.
- Project CI must check out `github.event.pull_request.head.sha`, not the default merge ref, or every bundle reads as stale.
- A free private repo can't block a merge on a red check. Until branch protection is available, Et doesn't merge a pull request whose proof check is red.
- The starter templates from [#4](https://github.com/Etdev2/sweet-potato/issues/4) ship `proof-digest.sh` and `check-proof.sh` as a required check.
- Long videos go in the pull request description as links rather than in `proof/`.
