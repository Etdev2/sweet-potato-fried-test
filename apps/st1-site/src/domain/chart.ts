import type { ChartRef, FinanceChartKind, InlineChart } from "./deck";
import type { Finance } from "./finance";

export interface Bar {
  label: string;
  value: number;
}

/** One bar series, ready to draw. Values are in the stated unit. */
export interface BarChartSpec {
  title: string;
  unit: string;
  seriesName: string;
  caption: string | null;
  bars: readonly Bar[];
}

const MILLION = 1_000_000;

function percent(fraction: number): string {
  return `${String(Math.round(fraction * 100))}%`;
}

// Titles, units and captions match ST-1/render.py, so the web charts say what
// the exported slides say.
export function financeChart(kind: FinanceChartKind, finance: Finance): BarChartSpec {
  switch (kind) {
    case "payment_schedule":
      return {
        title: "Contract payment timing",
        unit: "USD millions",
        seriesName: "Salary paid",
        caption: "Illustrative calendar-year-end timing; 2024-2033 service, 2034-2043 deferred payments.",
        bars: finance.player_payment_schedule.map((row) => ({
          label: String(row.year),
          value: row.player_payment_usd / MILLION,
        })),
      };
    case "pv_sensitivity":
      return {
        title: "Original-decision salary-payment DCF",
        unit: "USD millions",
        seriesName: "Salary-payment present value",
        caption:
          "Illustrative value at Dec. 31, 2023. Excludes CBT cash tax, alternative roster costs and other club cash flows.",
        bars: finance.present_value_sensitivities.map((row) => ({
          label: percent(row.discount_rate),
          value: row.total_player_payment_pv_usd / MILLION,
        })),
      };
    case "contribution_sensitivity":
      return {
        title: "Hypothetical contribution at 50% attribution",
        unit: "USD millions / year",
        seriesName: "Annual contribution",
        caption:
          "Assumes $100m annual gross receipts, 50% increment, ten years, and zero fixed cost. No observed club result.",
        bars: finance.sponsorship_sensitivity.cases
          .filter((row) => row.attribution_fraction === 0.5)
          .map((row) => ({
            label: `${percent(row.retained_net_contribution_margin)} margin`,
            value: row.annual_attributable_contribution_usd / MILLION,
          })),
      };
  }
}

function inlineChart(chart: InlineChart): BarChartSpec {
  const [series] = chart.series;
  return {
    title: chart.title,
    unit: chart.unit,
    seriesName: series.name,
    caption: chart.caption ?? null,
    bars: chart.labels.map((label, index) => ({ label, value: series.values[index] ?? 0 })),
  };
}

/** A slide's chart is either written out in the deck file or named from the finance model. */
export function resolveChart(ref: ChartRef, finance: Finance): BarChartSpec {
  return "finance" in ref ? financeChart(ref.finance, finance) : inlineChart(ref);
}

/** "$68m" for money in millions, the bare number otherwise. At most one decimal. */
export function formatValue(value: number, unit: string): string {
  const rounded = Math.round(value * 10) / 10;
  const text = rounded.toLocaleString("en-US", { maximumFractionDigits: 1 });
  return unit.startsWith("USD millions") ? `$${text}m` : text;
}

/** "$700m" or "$337.8m" from a USD amount. */
export function formatUsdMillions(usd: number): string {
  return formatValue(usd / MILLION, "USD millions");
}

/**
 * Axis ticks from zero to a round number at or above the largest value,
 * about four steps apart.
 */
export function axisTicks(maxValue: number): number[] {
  if (maxValue <= 0) {
    return [0, 1];
  }
  const rough = maxValue / 4;
  const magnitude = 10 ** Math.floor(Math.log10(rough));
  const step = [1, 2, 2.5, 5, 10].map((factor) => factor * magnitude).find((candidate) => candidate >= rough) ?? rough;
  const count = Math.ceil(maxValue / step);
  return Array.from({ length: count + 1 }, (_, index) => Math.round(index * step * 1000) / 1000);
}

/**
 * Which bars get a value printed on them. A short chart labels every bar. A
 * long one labels only the bars where the value changes, so twenty bars do not
 * carry twenty numbers.
 */
export function labelledBars(bars: readonly Bar[]): number[] {
  if (bars.length <= 6) {
    return bars.map((_, index) => index);
  }
  return bars.flatMap((bar, index) => (index === 0 || bars[index - 1]?.value !== bar.value ? [index] : []));
}
