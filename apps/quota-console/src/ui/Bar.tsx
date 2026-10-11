import type { Remaining } from "../domain/quota-document";
import { formatPercent, toneFor } from "../domain/summary";

interface BarProps {
  readonly remaining: Remaining;
  readonly label: string;
}

// One progress bar. The fill width is the remaining percentage itself.
export function Bar({ remaining, label }: BarProps) {
  switch (remaining.status) {
    case "measured":
      return (
        <div
          className="bar"
          role="progressbar"
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={remaining.percent}
          aria-valuetext={`${formatPercent(remaining.percent)} remaining`}
        >
          <div
            className="bar-fill"
            data-tone={toneFor(remaining.percent)}
            style={{ width: `${String(remaining.percent)}%` }}
          />
        </div>
      );
    case "unavailable":
      return (
        <div
          className="bar"
          role="progressbar"
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext="unavailable"
          data-unavailable="true"
        />
      );
  }
}

export function PercentText({ remaining }: { readonly remaining: Remaining }) {
  switch (remaining.status) {
    case "measured":
      return <>{formatPercent(remaining.percent)}</>;
    case "unavailable":
      return (
        <span className="unavailable" title="unavailable" aria-label="unavailable">
          --
        </span>
      );
  }
}
