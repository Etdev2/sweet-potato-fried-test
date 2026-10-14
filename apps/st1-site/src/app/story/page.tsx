import type { Metadata } from "next";

import { loadMarkdown } from "../../data/content";
import { FictionBanner, Markdown } from "../../ui/Markdown";

export const metadata: Metadata = { title: "Greg, Fred, and the sort order" };

export default async function StoryPage() {
  return (
    <article className="page" data-deck="internal">
      <FictionBanner />
      <Markdown text={await loadMarkdown("story")} fromDir="ST-1" />
    </article>
  );
}
