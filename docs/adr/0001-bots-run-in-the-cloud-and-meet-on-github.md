# Bots run in the cloud and meet on GitHub

Et needs the setup to keep working with the Mac off, and runs it from a phone. So Sweet Potato runs in Grok Bot's cloud, Claude Code builds in GitHub Actions, and Codex reviews pull requests on GitHub. GitHub issues and pull requests are the hand-off between them, and a different AI reviews than builds, so no model grades its own work.

## Considered options

- T3 Code as the place builders run. Dropped because its agents run on Et's Mac.
- Cursor Projects as the builder, as in Lauren Tan's setup. Skipped because it adds a subscription, and Grok Bot already runs on Et's Grok plan.
- The Codex plugin for Claude Code as the reviewer. Dropped because it runs locally.
