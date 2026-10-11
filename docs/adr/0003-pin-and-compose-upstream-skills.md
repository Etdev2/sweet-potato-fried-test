# Pin and compose upstream skills

## Decision

Sweet Potato keeps a reviewed registry of selected skills from Matt Pocock's skills and pstack. Each source is pinned to a commit. The workflow selects one skill for a job instead of installing every available skill into every context.

The control room does not copy upstream skill bodies in this decision. Provider-native plugins or a later reviewed sync tool load them. Project-local skills own project commands and verification.

## Why

The two collections overlap. Loading everything wastes context and can give an agent conflicting processes. A pinned registry makes the reviewed version and license visible, while composition preserves the strengths of each collection:

- Matt Pocock for discovery, maps, specifications, tickets, domain language and two-axis review.
- Pstack for architecture, verification, type discipline, correction, blast radius, decision trails and writing quality.

## Consequences

- An upstream update does not reach a project until a pull request moves the pin.
- A future decision must choose provider plugin installation or vendored snapshots.
- Attribution and MIT license information stay with any copied upstream material.
- Agents load only the skills needed for the current phase.
