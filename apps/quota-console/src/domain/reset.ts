import type { Reset } from "./quota-document";

export interface ResetDescription {
  readonly relative: string;
  readonly absolute: string | null;
}

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function plural(count: number, unit: string): string {
  return `in ${String(count)} ${unit}${count === 1 ? "" : "s"}`;
}

function relativeTo(at: Date, asOf: Date): string {
  const remaining = at.getTime() - asOf.getTime();
  if (remaining <= 0) return "reset due";
  if (remaining >= DAY) return plural(Math.floor(remaining / DAY), "day");
  if (remaining >= HOUR) return plural(Math.floor(remaining / HOUR), "hour");
  if (remaining >= MINUTE) return plural(Math.floor(remaining / MINUTE), "minute");
  return "in under a minute";
}

// Month/day and 24-hour time, for example "09/12, 23:00".
export function clockTime(at: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(at);
  const part = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((candidate) => candidate.type === type)?.value ?? "";
  return `${part("month")}/${part("day")}, ${part("hour")}:${part("minute")}`;
}

// `asOf` is the moment the quota document was generated, so the same document
// always reads the same way.
export function describeReset(reset: Reset, asOf: Date, timeZone: string): ResetDescription {
  switch (reset.status) {
    case "scheduled": {
      const at = new Date(reset.at);
      return { relative: relativeTo(at, asOf), absolute: clockTime(at, timeZone) };
    }
    case "none":
      return { relative: "No reset pending", absolute: null };
    case "unavailable":
      return { relative: "Reset unavailable", absolute: null };
  }
}
