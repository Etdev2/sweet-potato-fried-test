# Et authorizes ready work and names the builder

A ticket being ready is what lets a builder start, so marking it ready grants authority to execute work. PR #10 gave that transition to Sweet Potato: it added `ready-for-agent` once every readiness field was present. The review in issue #11 suggested keeping it there. On 2026-10-11, Et decided otherwise. Bots prepare and propose ready work. Only Et marks a ticket ready and names the builder that will take it.

## Decision

- Sweet Potato, Potato Architect and any other planning agent may write specs, tickets, acceptance criteria and dependencies, and may propose that a ticket is ready.
- A proposal grants no authority to execute. A builder does not start from a proposal.
- Et marks a ticket ready by adding `ready-for-agent` and naming the builder in the ticket.
- The builder works only on a ticket that is ready and names it.

## Enforcement

This is a soft rule. Sweet Potato's GitHub token may write labels, and GitHub cannot restrict who adds one label. The bots also act through Et's GitHub account, so a check on who added the label would see Et either way. Enforcing this needs each bot to have its own GitHub identity, which belongs to decision #6.

## Considered options

- Sweet Potato marks tickets ready once every field is present. This was PR #10's design. Rejected because at `stage-1-supervised` Et inspects every step, and dispatch is the step with the most consequence.
- Tickets become ready automatically when every field is present. Rejected for the same reason, and because nothing checks that the fields are true rather than merely present.

## Consequences

Et is the only path from a proposal to running work. At one builder, that is the intended bottleneck. Revisit when a project reaches `stage-2-proven` and the bots have separate identities.
