import { defineConfig, devices } from "@playwright/test";

const PORT = 4173;

// Browser tests drive the production build through `vite preview`, the same
// files a deployment would serve.
export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL: `http://127.0.0.1:${String(PORT)}`,
    timezoneId: "UTC",
    locale: "en-US",
    viewport: { width: 1440, height: 1000 },
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } } }],
  webServer: {
    command: `npm run preview -- --host 127.0.0.1`,
    url: `http://127.0.0.1:${String(PORT)}`,
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
