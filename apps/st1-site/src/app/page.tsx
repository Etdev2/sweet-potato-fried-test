import Link from "next/link";

import { loadDeckContent, loadFinance } from "../data/content";
import { formatUsdMillions } from "../domain/chart";
import { isFiction } from "../domain/deck";
import { presentValueAt } from "../domain/finance";

export default async function HomePage() {
  const [content, finance] = await Promise.all([loadDeckContent(), loadFinance()]);
  const presentValue = presentValueAt(finance, 0.05);

  return (
    <>
      <section className="intro">
        <p className="eyebrow">ST-1, a six-role agency exercise</p>
        <h1>Ohtani&rsquo;s Dodgers contract and his U.S. endorsement appeal</h1>
        <p className="lead">
          The work supports a serious baseball and marketing opportunity case. Public evidence does not establish
          actual ten-year club profitability, U.S.-only endorsement fees or the best deal in history.
        </p>
      </section>

      <section aria-labelledby="figures-heading">
        <h2 id="figures-heading" className="visually-hidden">
          Contract figures
        </h2>
        <dl className="tiles">
          <div className="tile">
            <dt>Nominal commitment</dt>
            <dd>{formatUsdMillions(finance.nominal_contract.total_usd)}</dd>
          </div>
          <div className="tile">
            <dt>Paid during 2024&ndash;33</dt>
            <dd>{formatUsdMillions(finance.nominal_contract.service_period_paid_usd)}</dd>
          </div>
          <div className="tile">
            <dt>Deferred to 2034&ndash;43</dt>
            <dd>{formatUsdMillions(finance.nominal_contract.deferred_paid_usd)}</dd>
          </div>
          {presentValue === null ? null : (
            <div className="tile">
              <dt>Modeled present value at 5%, as of {finance.valuation.date}</dt>
              <dd>{formatUsdMillions(presentValue)}</dd>
            </div>
          )}
        </dl>
      </section>

      <section aria-labelledby="decks-heading">
        <h2 id="decks-heading">The three decks</h2>
        <ul className="deck-list">
          {content.decks.map((deck) => (
            <li key={deck.id} className="deck-card" data-deck={deck.id}>
              {isFiction(deck.id) ? <p className="fiction-tag">Fiction</p> : null}
              <h3>
                <Link href={`/decks/${deck.id}`}>{deck.title}</Link>
              </h3>
              {deck.subtitle === undefined ? null : <p>{deck.subtitle}</p>}
              <p className="deck-links">
                <span>{deck.slides.length} slides</span>
                <a href={`/downloads/${deck.filename}.pdf`}>PDF</a>
                <a href={`/downloads/${deck.filename}.pptx`}>PowerPoint</a>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="more-heading">
        <h2 id="more-heading">The written work</h2>
        <ul className="more-list">
          <li>
            <Link href="/report">Finance report</Link>
            <span>The valuation, the payment model and the limits of the evidence.</span>
          </li>
          <li>
            <Link href="/story">Greg, Fred, and the sort order</Link>
            <span>The fictional extra-credit story.</span>
          </li>
          <li>
            <Link href="/decisions">Decisions</Link>
            <span>How the six roles divided the work and where they disagreed.</span>
          </li>
        </ul>
      </section>
    </>
  );
}
