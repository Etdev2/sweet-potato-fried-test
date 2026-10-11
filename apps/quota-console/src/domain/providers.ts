// The providers the console knows, in tab and card order.
export const PROVIDER_IDS = ["claude", "antigravity", "codex", "xai", "kimi"] as const;

export type ProviderId = (typeof PROVIDER_IDS)[number];

export const PROVIDER_LABELS: Readonly<Record<ProviderId, string>> = {
  claude: "Claude",
  antigravity: "Antigravity",
  codex: "Codex",
  xai: "xAI",
  kimi: "Kimi",
};
