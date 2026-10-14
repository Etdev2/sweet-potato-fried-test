import type { Metadata, Viewport } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { REPO_URL } from "../domain/links";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "ST-1: Ohtani's contract and U.S. endorsement appeal", template: "%s | ST-1" },
  description:
    "Three decks, a finance report and a fictional story from ST-1, a six-role agency exercise on Shohei Ohtani's Dodgers contract.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <header className="site-head">
          <Link className="site-name" href="/">
            ST-1
          </Link>
          <nav aria-label="Sections">
            <Link href="/decks/owner">Owner deck</Link>
            <Link href="/decks/advertiser">Advertiser deck</Link>
            <Link href="/decks/internal">Greg versus Fred</Link>
            <Link href="/report">Finance report</Link>
            <Link href="/story">Story</Link>
            <Link href="/decisions">Decisions</Link>
          </nav>
        </header>
        <main id="main">{children}</main>
        <footer className="site-foot">
          <p>
            Built from the ST-1 files in <a href={`${REPO_URL}/tree/main/ST-1`}>the repository</a>. The figures are
            illustrative. Worldwide athlete income, club receipts and advertiser returns are separate things, and the
            report says what the evidence does not prove.
          </p>
        </footer>
      </body>
    </html>
  );
}
