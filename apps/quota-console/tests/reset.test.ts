import { describe, expect, it } from "vitest";
import { describeReset } from "../src/domain/reset";

const asOf = new Date("2026-09-11T20:00:00Z");
const at = (iso: string) => ({ status: "scheduled", at: iso }) as const;

describe("describeReset", () => {
  it("counts whole days, rounded down", () => {
    expect(describeReset(at("2026-09-12T23:00:00Z"), asOf, "UTC")).toEqual({ relative: "in 1 day", absolute: "09/12, 23:00" });
    expect(describeReset(at("2026-09-13T13:00:00Z"), asOf, "UTC")).toEqual({ relative: "in 1 day", absolute: "09/13, 13:00" });
    expect(describeReset(at("2026-09-15T22:00:00Z"), asOf, "UTC")).toEqual({ relative: "in 4 days", absolute: "09/15, 22:00" });
  });

  it("switches to hours and minutes inside a day", () => {
    expect(describeReset(at("2026-09-12T01:30:00Z"), asOf, "UTC").relative).toBe("in 5 hours");
    expect(describeReset(at("2026-09-11T21:00:00Z"), asOf, "UTC").relative).toBe("in 1 hour");
    expect(describeReset(at("2026-09-11T20:12:00Z"), asOf, "UTC").relative).toBe("in 12 minutes");
    expect(describeReset(at("2026-09-11T20:01:00Z"), asOf, "UTC").relative).toBe("in 1 minute");
    expect(describeReset(at("2026-09-11T20:00:20Z"), asOf, "UTC").relative).toBe("in under a minute");
  });

  it("says a passed reset is due, and still shows when it was", () => {
    expect(describeReset(at("2026-09-11T19:00:00Z"), asOf, "UTC")).toEqual({ relative: "reset due", absolute: "09/11, 19:00" });
  });

  it("shows the clock time in the requested time zone", () => {
    expect(describeReset(at("2026-09-12T23:00:00Z"), asOf, "America/Los_Angeles").absolute).toBe("09/12, 16:00");
    expect(describeReset(at("2026-09-13T06:30:00+09:00"), asOf, "UTC").absolute).toBe("09/12, 21:30");
  });

  it("has words for no pending reset and for an unknown one", () => {
    expect(describeReset({ status: "none" }, asOf, "UTC")).toEqual({ relative: "No reset pending", absolute: null });
    expect(describeReset({ status: "unavailable" }, asOf, "UTC")).toEqual({ relative: "Reset unavailable", absolute: null });
  });
});
