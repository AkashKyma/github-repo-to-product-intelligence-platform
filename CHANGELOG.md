# Changelog

## [PAP-452] - 2026-06-23

### Added
- Delivered the RepoSignal MVP for analyzing GitHub repositories as product opportunities.
- Added a Next.js + Tailwind landing experience with repository submission flow.
- Added analysis outputs for technical readiness, commercial potential, and overall opportunity.
- Added generated product specification sections covering target users, use cases, MVP features, non-goals, and success metrics.
- Added a recreation blueprint covering positioning, pages, components, API needs, and phased delivery.
- Added a shareable server-rendered analysis route at `/analyze/[owner]/[repo]`.
- Added API routes for repository analysis and health checks.
- Added deterministic fallback behavior when live GitHub metadata cannot be fetched.

### Operational notes
- Local install: `npm install`
- Local dev: `npm run dev`
- Production build: `npm run build`
- Optional env: `GITHUB_TOKEN` for improved GitHub API access
