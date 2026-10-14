# ST-1 deliverables

The six-role agency exercise evaluates Ohtani's contract and a hypothetical U.S. advertiser proposal. Greg's personnel story is fiction.

- [Owner and agency deck](decks/st1-owner-agency.pdf), [editable PowerPoint](decks/st1-owner-agency.pptx)
- [U.S. advertiser deck](decks/st1-us-advertiser.pdf), [editable PowerPoint](decks/st1-us-advertiser.pptx)
- [Personal internal Greg-versus-Fred deck](decks/st1-greg-versus-fred.pdf), [editable PowerPoint](decks/st1-greg-versus-fred.pptx)
- [Financial report](financial-report.md) and [machine-readable model](finance.json)
- [Fictional extra-credit report](greg-fiction.md)
- [Readable decisions](decisions.md), [peer contributions](discussion), [shared research](research/evidence.md), [glossary](GLOSSARY.md)
- [Communication receipts](communications.md) and [resume status](STATUS.md)

The conclusion supports a serious baseball and marketing opportunity case. Public evidence does not establish actual ten-year club profitability, U.S.-only endorsement fees or the best deal in history. Worldwide athlete income is separate from club receipts and advertiser returns.

## Reproduce the exports

From the repository root, use an isolated Python environment:

```sh
python3 -m venv /tmp/st1-deck-venv
/tmp/st1-deck-venv/bin/pip install -r ST-1/requirements.txt
/tmp/st1-deck-venv/bin/python ST-1/render.py --content ST-1/deck-content.json --finance ST-1/finance.json --out /tmp/st1-deck-replay
python3 ST-1/audit-finance.py --finance ST-1/finance.json --report ST-1/financial-report.md
```

See [export notes](decks/README.md) for fonts, editable chart shapes and QA. Same-input byte replay depends on the same fonts and library versions. The PDFs are the reference layout. The renderer performs no account access or network calls.

## Skills and wizard exercise

Unslop edited the prose. Grill with Docs, Grilling and Domain Modeling were read at the repository's reviewed Matt Pocock pin `49dd158d1076134a641b33efb035946536778336`. The owner delegated role choices and peer debate, so interviews ran between actual specialists; the glossary records resolved finance terms. A native Skill invocation tool was unavailable, and no tool invocation is claimed.

The Wizard instructions at the same pin were read. The existing `scripts/claude-launcher-wizard.sh` was reused and statically inspected. Its plan mode and the repository's isolated fixture verification exercise its procedure without opening a live browser or changing credentials. This verifies the wizard against stubs; live account provisioning remains INCONCLUSIVE. No new human setup was required for these local artifacts.

```sh
bash -n scripts/claude-launcher-wizard.sh
bash scripts/claude-launcher-wizard.sh --plan
bash scripts/verify-claude-launcher-wizard.sh
```

These exercise roles do not modify the permanent roster. Native specialists ran in waves. Grok contributed through GitHub; Codex integrated, and Claude independently reviewed outside the six seats. GitHub checkpoints preserve phone/desktop state; they do not install an unattended receiver.
