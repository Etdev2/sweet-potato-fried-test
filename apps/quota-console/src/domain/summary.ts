import { PROVIDER_IDS, type ProviderId } from "./providers";
import type { Credential, LimitId, Remaining, Reset } from "./quota-document";

export function countByProvider(credentials: readonly Credential[]): Record<ProviderId, number> {
  const counts: Record<ProviderId, number> = { claude: 0, antigravity: 0, codex: 0, xai: 0, kimi: 0 };
  for (const credential of credentials) counts[credential.provider] += 1;
  return counts;
}

export function countLoaded(credentials: readonly Credential[]): number {
  return credentials.filter((credential) => credential.state === "loaded").length;
}

export function groupByProvider(
  credentials: readonly Credential[],
): readonly { readonly provider: ProviderId; readonly credentials: readonly Credential[] }[] {
  return PROVIDER_IDS.map((provider) => ({
    provider,
    credentials: credentials.filter((credential) => credential.provider === provider),
  }));
}

export interface LimitSummary {
  readonly id: LimitId;
  readonly label: string;
  // The sum of every measured remaining percentage. Unavailable when no
  // credential has a measurement, because missing is not zero.
  readonly total: Remaining;
  readonly capacityPercent: number;
  // One entry per credential, in credential order.
  readonly segments: readonly Remaining[];
  readonly nextReset: Reset;
}

const UNAVAILABLE = { status: "unavailable" } as const;

function earliestReset(resets: readonly Reset[]): Reset {
  let earliest: Extract<Reset, { status: "scheduled" }> | null = null;
  let sawNone = false;
  for (const reset of resets) {
    switch (reset.status) {
      case "scheduled":
        if (earliest === null || Date.parse(reset.at) < Date.parse(earliest.at)) earliest = reset;
        break;
      case "none":
        sawNone = true;
        break;
      case "unavailable":
        break;
    }
  }
  if (earliest !== null) return earliest;
  return sawNone ? { status: "none" } : UNAVAILABLE;
}

// Summarises the credentials of one provider, one entry per limit id, in the
// order the limits first appear.
export function summarizeLimits(credentials: readonly Credential[]): readonly LimitSummary[] {
  const labels = new Map<LimitId, string>();
  for (const credential of credentials) {
    for (const limit of credential.limits) {
      if (!labels.has(limit.id)) labels.set(limit.id, limit.label);
    }
  }

  return [...labels].map(([id, label]) => {
    const matches = credentials.map((credential) => credential.limits.find((limit) => limit.id === id));
    const segments = matches.map((limit): Remaining => limit?.remaining ?? UNAVAILABLE);
    let measured = 0;
    let sum = 0;
    for (const segment of segments) {
      if (segment.status === "measured") {
        measured += 1;
        sum += segment.percent;
      }
    }
    return {
      id,
      label,
      total: measured === 0 ? UNAVAILABLE : { status: "measured", percent: sum },
      capacityPercent: credentials.length * 100,
      segments,
      nextReset: earliestReset(matches.map((limit): Reset => limit?.reset ?? UNAVAILABLE)),
    };
  });
}

export type Tone = "low" | "mid" | "high";

export function toneFor(remainingPercent: number): Tone {
  if (remainingPercent < 25) return "low";
  if (remainingPercent < 60) return "mid";
  return "high";
}

export function formatPercent(percent: number): string {
  const rounded = Math.round(percent * 10) / 10;
  return `${Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1)}%`;
}
