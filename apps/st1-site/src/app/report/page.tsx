import type { Metadata } from "next";

import { loadFinance, loadMarkdown } from "../../data/content";
import { financeChart } from "../../domain/chart";
import { BarChart } from "../../ui/BarChart";
import { Markdown } from "../../ui/Markdown";

export const metadata: Metadata = { title: "Finance report" };

export default async function ReportPage() {
  const [text, finance] = await Promise.all([loadMarkdown("report"), loadFinance()]);
  return (
    <article className="page" data-deck="owner">
      <Markdown text={text} fromDir="ST-1" />
      <section aria-labelledby="charts-heading" className="report-charts">
        <h2 id="charts-heading">Charts from the model</h2>
        <BarChart spec={financeChart("payment_schedule", finance)} />
        <BarChart spec={financeChart("pv_sensitivity", finance)} />
      </section>
    </article>
  );
}
