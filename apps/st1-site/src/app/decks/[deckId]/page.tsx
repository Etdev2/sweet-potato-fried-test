import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { loadDeckContent, loadFinance } from "../../../data/content";
import { resolveChart } from "../../../domain/chart";
import { DECK_IDS, deckIdSchema, findDeck, isFiction, sourcesFor } from "../../../domain/deck";
import { FictionBanner } from "../../../ui/Markdown";
import { SlideView } from "../../../ui/SlideView";

interface DeckPageProps {
  params: Promise<{ deckId: string }>;
}

// Only the three delivered decks exist. Any other id is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return DECK_IDS.map((deckId) => ({ deckId }));
}

export async function generateMetadata({ params }: DeckPageProps): Promise<Metadata> {
  const id = deckIdSchema.safeParse((await params).deckId);
  if (!id.success) {
    return {};
  }
  return { title: findDeck(await loadDeckContent(), id.data).title };
}

export default async function DeckPage({ params }: DeckPageProps) {
  const id = deckIdSchema.safeParse((await params).deckId);
  if (!id.success) {
    notFound();
  }
  const [content, finance] = await Promise.all([loadDeckContent(), loadFinance()]);
  const deck = findDeck(content, id.data);
  const fiction = isFiction(deck.id);

  return (
    <div className="deck" data-deck={deck.id}>
      <header className="deck-head">
        <h1>{deck.title}</h1>
        {deck.subtitle === undefined ? null : <p className="lead">{deck.subtitle}</p>}
        <p className="deck-links">
          <span>{deck.slides.length} slides</span>
          <a href={`/downloads/${deck.filename}.pdf`}>Download PDF</a>
          <a href={`/downloads/${deck.filename}.pptx`}>Download PowerPoint</a>
        </p>
        {fiction ? <FictionBanner /> : null}
      </header>
      <ol className="slides">
        {deck.slides.map((slide, index) => (
          <li key={slide.title}>
            <SlideView
              slide={slide}
              number={index + 1}
              total={deck.slides.length}
              headingId={`slide-${deck.id}-${String(index + 1)}`}
              sources={sourcesFor(content, slide.source_ids)}
              chart={slide.layout === "chart" ? resolveChart(slide.chart, finance) : null}
              fiction={fiction}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}
