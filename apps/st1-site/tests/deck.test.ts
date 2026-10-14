import { describe, expect, it } from "vitest";

import { DECK_IDS, findDeck, isFiction, parseDeckContent, sourcesFor } from "../src/domain/deck";
import { mutable, readSt1Json } from "./content";

const raw = readSt1Json("deck-content.json");

function parsedContent() {
  const parsed = parseDeckContent(raw);
  if (!parsed.ok) {
    throw new Error(parsed.problems.join("\n"));
  }
  return parsed.value;
}

describe("the delivered deck content", () => {
  it("parses into the three decks of ten slides each", () => {
    const content = parsedContent();
    expect(content.decks.map((deck) => deck.id).sort()).toEqual([...DECK_IDS].sort());
    for (const deck of content.decks) {
      expect(deck.slides).toHaveLength(10);
      expect(deck.slides[0]?.layout).toBe("cover");
      expect(deck.slides.at(-1)?.layout).toBe("sources");
    }
  });

  it("resolves every cited source", () => {
    const content = parsedContent();
    for (const deck of content.decks) {
      for (const slide of deck.slides) {
        expect(sourcesFor(content, slide.source_ids)).toHaveLength(slide.source_ids.length);
      }
    }
  });

  it("marks only the internal deck as fiction", () => {
    expect(DECK_IDS.filter(isFiction)).toEqual(["internal"]);
    expect(findDeck(parsedContent(), "internal").title).toBe("Greg versus Fred");
  });
});

describe("content the site must refuse", () => {
  function decksOf(content: Record<string, unknown>): Record<string, unknown>[] {
    const decks = content.decks;
    if (!Array.isArray(decks)) {
      throw new Error("Expected decks to be an array.");
    }
    return decks.map((deck) => mutable(deck));
  }

  function firstSlideOf(deck: Record<string, unknown>, layout: string): Record<string, unknown> {
    const slides = deck.slides;
    if (!Array.isArray(slides)) {
      throw new Error("Expected slides to be an array.");
    }
    const copies = slides.map((slide) => mutable(slide));
    deck.slides = copies;
    const match = copies.find((slide) => slide.layout === layout);
    if (match === undefined) {
      throw new Error(`No ${layout} slide in this deck.`);
    }
    return match;
  }

  function problemsFor(change: (decks: Record<string, unknown>[]) => void): string[] {
    const content = mutable(raw);
    const decks = decksOf(content);
    change(decks);
    content.decks = decks;
    const parsed = parseDeckContent(content);
    return parsed.ok ? [] : parsed.problems;
  }

  it("a slide citing a source that does not exist", () => {
    const problems = problemsFor((decks) => {
      const deck = decks.find((candidate) => candidate.id === "owner");
      if (deck === undefined) throw new Error("No owner deck.");
      firstSlideOf(deck, "bullets").source_ids = ["NOT_A_SOURCE"];
    });
    expect(problems.join("\n")).toContain('cites "NOT_A_SOURCE"');
  });

  it("a chart slide with no chart", () => {
    const problems = problemsFor((decks) => {
      const deck = decks.find((candidate) => candidate.id === "owner");
      if (deck === undefined) throw new Error("No owner deck.");
      delete firstSlideOf(deck, "chart").chart;
    });
    expect(problems).not.toEqual([]);
  });

  it("a chart that names an unknown finance series", () => {
    const problems = problemsFor((decks) => {
      const deck = decks.find((candidate) => candidate.id === "owner");
      if (deck === undefined) throw new Error("No owner deck.");
      firstSlideOf(deck, "chart").chart = { finance: "made_up_series" };
    });
    expect(problems).not.toEqual([]);
  });

  it("a table row with the wrong number of cells", () => {
    const problems = problemsFor((decks) => {
      const deck = decks.find((candidate) => candidate.id === "owner");
      if (deck === undefined) throw new Error("No owner deck.");
      firstSlideOf(deck, "table").table = { headers: ["A", "B"], rows: [["only one"]] };
    });
    expect(problems.join("\n")).toContain("one cell for each header");
  });

  it("a missing deck and a duplicated deck", () => {
    expect(problemsFor((decks) => decks.pop())).not.toEqual([]);
    const problems = problemsFor((decks) => {
      const last = decks.at(-1);
      if (last === undefined) throw new Error("No decks.");
      last.id = "owner";
    });
    expect(problems.join("\n")).toContain('exactly one "owner" deck');
  });

  it("a deck filename that could escape the downloads folder", () => {
    const problems = problemsFor((decks) => {
      const first = decks[0];
      if (first === undefined) throw new Error("No decks.");
      first.filename = "../secrets";
    });
    expect(problems).not.toEqual([]);
  });
});
