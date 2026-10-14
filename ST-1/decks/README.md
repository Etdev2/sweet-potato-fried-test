# ST-1 presentation exports

The renderer uses one layout definition for the editable PowerPoint and PDF exports. Charts are editable shapes and text rather than raster images. It needs Python, python-pptx and reportlab. Arial is used for PowerPoint. PDF embeds Arial when available, falls back to DejaVu Sans, then Helvetica.

Run from the repository root:

```sh
python ST-1/render.py --content ST-1/deck-content.json --finance ST-1/finance.json --out ST-1/decks
python ST-1/render.py --schema
```

Each deck has ten 16:9 slides, including an evidence appendix. The owner palette is navy, white and teal. The advertiser palette is cream and cobalt. The fictional internal story uses warm paper, dark ink and rust. The fictional footer appears on every internal slide.

Output includes three distinct PowerPoint/PDF pairs, sources.json, notes.md, qa.json, content-schema.json and sha256.json. All output files are local. The renderer makes no network requests. The finance model remains the shared ../finance.json source.

The renderer checks slide counts, output name uniqueness, known source identifiers, the four-bullet limit, text fit and page bounds. It reopens each PowerPoint, verifies financial schedule totals and recomputes discounted payment sums. Fixed PDF metadata and PowerPoint ZIP timestamps permit byte-for-byte replay with the same inputs and installed fonts.

Before release, inspect every PDF page at full size. Check dense chart sidebars, source appendix links and fiction footers. Compare PDF page counts and text with the PowerPoint slide text. Confirm that sources retain dates and disclosure limits, hypothetical inputs remain visible, and DCF, CBT and current liabilities remain distinct. Check filenames and relative model links after copying into the final folder.

A PowerPoint application's font substitution can affect rendering on another computer. The included PDF is the reference layout. PowerPoint charts remain editable shape equivalents; their data values also appear in the source manifest.
