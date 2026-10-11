import { useState } from "react";
import { PROVIDER_LABELS, type ProviderId } from "../domain/providers";
import type { Credential } from "../domain/quota-document";
import { describeReset } from "../domain/reset";
import { formatPercent, summarizeLimits, type LimitSummary } from "../domain/summary";
import { Bar, PercentText } from "./Bar";
import { ProviderMark } from "./ProviderMark";

interface ProviderCardProps {
  readonly provider: ProviderId;
  readonly credentials: readonly Credential[];
  readonly asOf: Date;
  readonly timeZone: string;
}

function SegmentedBar({ summary, provider }: { readonly summary: LimitSummary; readonly provider: ProviderId }) {
  return (
    <div className="segments" role="group" aria-label={`${PROVIDER_LABELS[provider]} ${summary.label} by credential`}>
      {summary.segments.map((segment, index) => (
        // A segment's only identity is its position in credential order.
        <Bar key={index} remaining={segment} label={`${summary.label}, credential ${String(index + 1)}`} />
      ))}
    </div>
  );
}

function ResetLine({ summary, asOf, timeZone }: { readonly summary: LimitSummary; readonly asOf: Date; readonly timeZone: string }) {
  const reset = describeReset(summary.nextReset, asOf, timeZone);
  return (
    <p className="reset">
      <strong>{reset.relative}</strong>
      {reset.absolute === null ? null : <span> · {reset.absolute}</span>}
    </p>
  );
}

export function ProviderCard({ provider, credentials, asOf, timeZone }: ProviderCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [primary, ...others] = summarizeLimits(credentials);
  if (primary === undefined) return null;
  const last = others.at(-1);
  const name = PROVIDER_LABELS[provider];
  const detailsId = `card-details-${provider}`;

  return (
    <article className="card" data-provider={provider} aria-label={`${name} summary`}>
      <header className="card-head">
        <ProviderMark provider={provider} />
        <h3>{name}</h3>
        <span className="card-count">
          {credentials.length} {credentials.length === 1 ? "credential" : "credentials"}
        </span>
      </header>
      <p className="card-label">{primary.label}</p>
      <p className="card-value">
        <strong data-testid="card-total">
          <PercentText remaining={primary.total} />
        </strong>
        <span> of {formatPercent(primary.capacityPercent)}</span>
      </p>
      <SegmentedBar summary={primary} provider={provider} />
      <ResetLine summary={primary} asOf={asOf} timeZone={timeZone} />
      {last === undefined ? null : (
        <footer className="card-foot">
          <div className="card-foot-line">
            <span>
              {last.label}{" "}
              <strong data-testid="card-secondary-total">
                <PercentText remaining={last.total} />
              </strong>
            </span>
            <button
              type="button"
              className="link-button"
              aria-expanded={expanded}
              aria-controls={detailsId}
              onClick={() => {
                setExpanded((value) => !value);
              }}
            >
              {expanded ? "Hide" : "Show"}
            </button>
          </div>
          {expanded ? (
            <ul id={detailsId} className="card-details">
              {others.map((summary) => (
                <li key={summary.id}>
                  <div className="card-details-head">
                    <span>{summary.label}</span>
                    <strong>
                      <PercentText remaining={summary.total} />
                    </strong>
                  </div>
                  <SegmentedBar summary={summary} provider={provider} />
                  <ResetLine summary={summary} asOf={asOf} timeZone={timeZone} />
                </li>
              ))}
            </ul>
          ) : null}
        </footer>
      )}
    </article>
  );
}
