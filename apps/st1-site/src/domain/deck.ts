import { z } from "zod";

// The three decks ST-1 delivered. The id picks the palette and the route.
export const DECK_IDS = ["owner", "advertiser", "internal"] as const;
export const deckIdSchema = z.enum(DECK_IDS);
export type DeckId = z.infer<typeof deckIdSchema>;

// A source id and a deck id are both strings. The brand stops one being
// passed where the other is expected.
const sourceIdSchema = z.string().min(1).brand<"SourceId">();
export type SourceId = z.infer<typeof sourceIdSchema>;

const sourceSchema = z.object({
  title: z.string().min(1),
  url: z.string().min(1),
  date: z.string().optional(),
  limit: z.string().optional(),
});
export type Source = z.infer<typeof sourceSchema>;

export const FINANCE_CHART_KINDS = ["payment_schedule", "pv_sensitivity", "contribution_sensitivity"] as const;
const financeChartKindSchema = z.enum(FINANCE_CHART_KINDS);
export type FinanceChartKind = z.infer<typeof financeChartKindSchema>;

// The exports allow line charts and three series. The delivered content uses
// one bar series, so the site accepts only that and fails the build on more.
const inlineChartSchema = z
  .object({
    type: z.literal("bar"),
    title: z.string().min(1),
    labels: z.array(z.string().min(1)).min(1),
    series: z.tuple([z.object({ name: z.string().min(1), values: z.array(z.number().nonnegative()).min(1) })]),
    unit: z.string().min(1),
    caption: z.string().optional(),
  })
  .refine((chart) => chart.series[0].values.length === chart.labels.length, {
    message: "A chart needs one value for each label.",
  });
export type InlineChart = z.infer<typeof inlineChartSchema>;

const chartRefSchema = z.union([z.strictObject({ finance: financeChartKindSchema }), inlineChartSchema]);
export type ChartRef = z.infer<typeof chartRefSchema>;

const cardSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  detail: z.string().optional(),
});

const tableSchema = z
  .object({
    headers: z.array(z.string()).min(1),
    rows: z.array(z.array(z.string())).min(1),
  })
  .refine((table) => table.rows.every((row) => row.length === table.headers.length), {
    message: "Every table row needs one cell for each header.",
  });

const common = {
  title: z.string().min(1),
  kicker: z.string().optional(),
  subtitle: z.string().optional(),
  callout: z.string().optional(),
  notes: z.string().optional(),
  bullets: z.array(z.string().min(1)).max(4).default([]),
  source_ids: z.array(sourceIdSchema).default([]),
};

// One variant per layout, each carrying only the data that layout draws.
const slideSchema = z.discriminatedUnion("layout", [
  z.object({ ...common, layout: z.literal("cover") }),
  z.object({ ...common, layout: z.literal("bullets") }),
  z.object({ ...common, layout: z.literal("cards"), cards: z.array(cardSchema).min(2).max(4) }),
  z.object({ ...common, layout: z.literal("chart"), chart: chartRefSchema }),
  z.object({ ...common, layout: z.literal("table"), table: tableSchema }),
  z.object({ ...common, layout: z.literal("sources") }),
]);
export type Slide = z.infer<typeof slideSchema>;

const deckSchema = z.object({
  id: deckIdSchema,
  title: z.string().min(1),
  subtitle: z.string().optional(),
  filename: z.string().regex(/^st1-[a-z0-9-]+$/),
  slides: z.array(slideSchema).min(8).max(10),
});
export type Deck = z.infer<typeof deckSchema>;

const deckContentSchema = z
  .object({
    schema_version: z.literal(1),
    sources: z.record(sourceIdSchema, sourceSchema),
    decks: z.array(deckSchema).length(DECK_IDS.length),
  })
  .superRefine((content, context) => {
    for (const id of DECK_IDS) {
      if (content.decks.filter((deck) => deck.id === id).length !== 1) {
        context.addIssue({ code: "custom", message: `Expected exactly one "${id}" deck.` });
      }
    }
    for (const deck of content.decks) {
      deck.slides.forEach((slide, index) => {
        for (const sourceId of slide.source_ids) {
          if (!(sourceId in content.sources)) {
            context.addIssue({
              code: "custom",
              message: `Deck "${deck.id}" slide ${String(index + 1)} cites "${sourceId}", which is not in sources.`,
            });
          }
        }
      });
    }
  });
export type DeckContent = z.infer<typeof deckContentSchema>;

export type Parsed<T> = { ok: true; value: T } | { ok: false; problems: string[] };

function problemsOf(error: z.ZodError): string[] {
  return error.issues.map((issue) => {
    const where = issue.path.map(String).join(".");
    return where === "" ? issue.message : `${where}: ${issue.message}`;
  });
}

/** Turns the contents of ST-1/deck-content.json into typed decks, or lists what is wrong with it. */
export function parseDeckContent(input: unknown): Parsed<DeckContent> {
  const result = deckContentSchema.safeParse(input);
  return result.success ? { ok: true, value: result.data } : { ok: false, problems: problemsOf(result.error) };
}

export function findDeck(content: DeckContent, id: DeckId): Deck {
  const deck = content.decks.find((candidate) => candidate.id === id);
  if (deck === undefined) {
    throw new Error(`Deck "${id}" is missing after parsing, which the parser rules out.`);
  }
  return deck;
}

export interface CitedSource extends Source {
  id: SourceId;
}

/** The sources a slide cites, in the slide's order. */
export function sourcesFor(content: DeckContent, ids: readonly SourceId[]): CitedSource[] {
  return ids.flatMap((id) => {
    const source = content.sources[id];
    return source === undefined ? [] : [{ id, ...source }];
  });
}

/** The internal deck is fiction, and every one of its slides must say so. */
export function isFiction(id: DeckId): boolean {
  return id === "internal";
}
