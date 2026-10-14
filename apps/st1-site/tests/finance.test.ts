import { describe, expect, it } from "vitest";

import { axisTicks, financeChart, formatUsdMillions, formatValue, labelledBars, resolveChart } from "../src/domain/chart";
import { parseFinance, presentValueAt } from "../src/domain/finance";
import { repoLink } from "../src/domain/links";
import { mutable, readSt1Json } from "./content";

const raw = readSt1Json("finance.json");

function parsedFinance() {
  const parsed = parseFinance(raw);
  if (!parsed.ok) {
    throw new Error(parsed.problems.join("\n"));
  }
  return parsed.value;
}

describe("the finance model", () => {
  it("has a 20-year schedule that sums to the $700m nominal total", () => {
    const finance = parsedFinance();
    expect(finance.player_payment_schedule).toHaveLength(20);
    expect(formatUsdMillions(finance.nominal_contract.total_usd)).toBe("$700m");
    expect(formatUsdMillions(finance.nominal_contract.service_period_paid_usd)).toBe("$20m");
    expect(formatUsdMillions(finance.nominal_contract.deferred_paid_usd)).toBe("$680m");
  });

  it("is refused when the schedule no longer sums to the nominal total", () => {
    const broken = mutable(raw);
    broken.nominal_contract = { total_usd: 701_000_000, service_period_paid_usd: 20_000_000, deferred_paid_usd: 680_000_000 };
    const parsed = parseFinance(broken);
    expect(parsed.ok ? "" : parsed.problems.join("\n")).toContain("not the nominal total");
  });

  it("gives a present value below the nominal total, and none for an unmodeled rate", () => {
    const finance = parsedFinance();
    const atFive = presentValueAt(finance, 0.05);
    expect(atFive).not.toBeNull();
    expect(atFive ?? 0).toBeLessThan(finance.nominal_contract.total_usd);
    expect(presentValueAt(finance, 0.5)).toBeNull();
  });
});

describe("charts built from the model", () => {
  it("payment schedule: $2m for ten years, then $68m for ten", () => {
    const chart = financeChart("payment_schedule", parsedFinance());
    expect(chart.bars.map((bar) => bar.value)).toEqual([...Array<number>(10).fill(2), ...Array<number>(10).fill(68)]);
    expect(chart.bars[0]?.label).toBe("2024");
    expect(chart.bars.at(-1)?.label).toBe("2043");
    expect(chart.unit).toBe("USD millions");
  });

  it("present value: one bar per discount rate, falling as the rate rises", () => {
    const chart = financeChart("pv_sensitivity", parsedFinance());
    expect(chart.bars.map((bar) => bar.label)).toEqual(["3%", "5%", "7%"]);
    const values = chart.bars.map((bar) => bar.value);
    expect([...values].sort((a, b) => b - a)).toEqual(values);
  });

  it("contribution: only the 50% attribution cases", () => {
    const chart = financeChart("contribution_sensitivity", parsedFinance());
    expect(chart.bars.map((bar) => bar.label)).toEqual(["20% margin", "40% margin", "60% margin"]);
    expect(chart.bars.map((bar) => bar.value)).toEqual([10, 20, 30]);
  });

  it("a chart written out in the deck file keeps its own labels and values", () => {
    const chart = resolveChart(
      { type: "bar", title: "Breakeven", labels: ["20%", "25%"], series: [{ name: "Sales", values: [25, 20] }], unit: "USD millions" },
      parsedFinance(),
    );
    expect(chart.bars).toEqual([
      { label: "20%", value: 25 },
      { label: "25%", value: 20 },
    ]);
    expect(chart.caption).toBeNull();
  });
});

describe("chart helpers", () => {
  it("formats money in millions and leaves other numbers bare", () => {
    expect(formatValue(68, "USD millions")).toBe("$68m");
    expect(formatValue(12.5, "USD millions / year")).toBe("$12.5m");
    expect(formatValue(448.6749, "USD millions")).toBe("$448.7m");
    expect(formatValue(40, "")).toBe("40");
  });

  it("picks round axis ticks that reach the largest value", () => {
    expect(axisTicks(68)).toEqual([0, 20, 40, 60, 80]);
    expect(axisTicks(25)).toEqual([0, 10, 20, 30]);
    expect(axisTicks(448.7)).toEqual([0, 200, 400, 600]);
    expect(axisTicks(0)).toEqual([0, 1]);
  });

  it("labels every bar of a short chart and only the changes of a long one", () => {
    expect(labelledBars([{ label: "a", value: 1 }, { label: "b", value: 1 }])).toEqual([0, 1]);
    const schedule = financeChart("payment_schedule", parsedFinance()).bars;
    expect(labelledBars(schedule)).toEqual([0, 10]);
  });
});

describe("links written inside ST-1 files", () => {
  it("keeps web links and sends repository paths to GitHub", () => {
    expect(repoLink("https://www.mlb.com/news/x", "ST-1")).toBe("https://www.mlb.com/news/x");
    expect(repoLink("#limits", "ST-1")).toBe("#limits");
    expect(repoLink("research/evidence.md", "ST-1")).toBe(
      "https://github.com/Etdev2/sweet-potato-fried-test/blob/main/ST-1/research/evidence.md",
    );
    expect(repoLink("../finance.json", "ST-1/decks")).toBe(
      "https://github.com/Etdev2/sweet-potato-fried-test/blob/main/ST-1/finance.json",
    );
  });
});
