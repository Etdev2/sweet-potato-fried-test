import type { BarChartSpec } from "../domain/chart";
import type { CitedSource, Slide } from "../domain/deck";
import { repoLink } from "../domain/links";
import { BarChart } from "./BarChart";

export const FICTION_LABEL = "FICTIONAL SATIRE";

// Source links in the deck file are written relative to ST-1/decks.
const SOURCES_DIR = "ST-1/decks";

interface SlideViewProps {
  slide: Slide;
  number: number;
  total: number;
  headingId: string;
  sources: readonly CitedSource[];
  /** The chart to draw, already resolved against the finance model. Only chart slides have one. */
  chart: BarChartSpec | null;
  fiction: boolean;
}

function Bullets({ items }: { items: readonly string[] }) {
  if (items.length === 0) {
    return null;
  }
  return (
    <ul className="slide-bullets">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function SlideBody({ slide, sources, chart }: Pick<SlideViewProps, "slide" | "sources" | "chart">) {
  switch (slide.layout) {
    case "cover":
    case "bullets":
      return <Bullets items={slide.bullets} />;
    case "cards":
      return (
        <>
          <dl className="slide-cards">
            {slide.cards.map((card) => (
              <div key={card.label} className="slide-card">
                <dt>{card.label}</dt>
                <dd className="slide-card-value">{card.value}</dd>
                {card.detail === undefined ? null : <dd className="slide-card-detail">{card.detail}</dd>}
              </div>
            ))}
          </dl>
          <Bullets items={slide.bullets} />
        </>
      );
    case "chart":
      return (
        <div className="slide-chart">
          {chart === null ? null : <BarChart spec={chart} />}
          <Bullets items={slide.bullets} />
        </div>
      );
    case "table":
      return (
        <>
          <div className="table-scroll">
            <table className="slide-table">
              <thead>
                <tr>
                  {slide.table.headers.map((header) => (
                    <th key={header} scope="col">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {slide.table.rows.map((row) => (
                  <tr key={row.join("|")}>
                    {row.map((cell, index) => (
                      <td key={`${String(index)}-${cell}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Bullets items={slide.bullets} />
        </>
      );
    case "sources":
      return (
        <ol className="slide-sources">
          {sources.map((source) => (
            <li key={source.id}>
              <a href={repoLink(source.url, SOURCES_DIR)}>{source.title}</a>
              {source.date === undefined ? null : <span className="source-date"> ({source.date})</span>}
              {source.limit === undefined ? null : <span className="source-limit">{source.limit}</span>}
            </li>
          ))}
        </ol>
      );
  }
}

export function SlideView({ slide, number, total, headingId, sources, chart, fiction }: SlideViewProps) {
  return (
    <section className="slide" data-layout={slide.layout} aria-labelledby={headingId}>
      <header className="slide-head">
        {slide.kicker === undefined ? null : <p className="slide-kicker">{slide.kicker}</p>}
        <h2 id={headingId}>{slide.title}</h2>
        {slide.subtitle === undefined ? null : <p className="slide-subtitle">{slide.subtitle}</p>}
      </header>
      <div className="slide-body">
        <SlideBody slide={slide} sources={sources} chart={chart} />
        {slide.callout === undefined ? null : <p className="slide-callout">{slide.callout}</p>}
      </div>
      <footer className="slide-foot">
        {fiction ? <span className="fiction-tag">{FICTION_LABEL}</span> : null}
        {slide.layout !== "sources" && sources.length > 0 ? (
          <span className="slide-cites">
            Sources:{" "}
            {sources.map((source, index) => (
              <span key={source.id}>
                {index > 0 ? ", " : ""}
                <a href={repoLink(source.url, SOURCES_DIR)}>{source.title}</a>
              </span>
            ))}
          </span>
        ) : null}
        <span className="slide-number">
          {number} / {total}
        </span>
      </footer>
      {slide.notes === undefined || slide.layout === "cover" ? null : (
        <details className="slide-notes">
          <summary>Presenter notes</summary>
          <p>{slide.notes}</p>
        </details>
      )}
    </section>
  );
}
