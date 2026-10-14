import type { Metadata } from "next";

import { loadMarkdown } from "../../data/content";
import { Markdown } from "../../ui/Markdown";

export const metadata: Metadata = { title: "Decisions" };

export default async function DecisionsPage() {
  return (
    <article className="page">
      <Markdown text={await loadMarkdown("decisions")} fromDir="ST-1" />
    </article>
  );
}
