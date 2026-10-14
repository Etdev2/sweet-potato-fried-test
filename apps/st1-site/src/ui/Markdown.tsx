import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { repoLink } from "../domain/links";

/**
 * Renders one ST-1 Markdown file. Links to other repository files go to
 * GitHub, resolved from the folder the file sits in.
 */
export function Markdown({ text, fromDir }: { text: string; fromDir: string }) {
  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        urlTransform={(url) => repoLink(url, fromDir)}
        components={{
          table: ({ children }) => (
            <div className="table-scroll">
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}

export function FictionBanner() {
  return (
    <p className="fiction-banner" role="note">
      <strong>This is fiction.</strong> Greg and Fred are invented characters. The firing, the mailroom incident and
      every line of dialogue are invented. No real employee or workplace is described.
    </p>
  );
}
