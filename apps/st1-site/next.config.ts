import path from "node:path";

import type { NextConfig } from "next";

// Every page is generated at build time from the ST-1 files two folders up.
// Nothing reads the file system or a network at request time.
const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The repository root, so the build does not guess it from stray lockfiles.
  turbopack: { root: path.resolve(import.meta.dirname, "..", "..") },
};

export default config;
