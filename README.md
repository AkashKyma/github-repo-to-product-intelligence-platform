# github-repo-to-product-intelligence-platform

RepoSignal is a Next.js + Tailwind MVP for turning a GitHub repository into a product intelligence brief and recreation plan.

## What was built for PAP-452

This ticket delivers a repository analysis experience that helps a user:

- submit a GitHub repository as either `owner/repo` or a full GitHub URL
- score the repository for **technical readiness**, **commercial potential**, and **overall opportunity**
- review generated findings, risks, and opportunities
- inspect a generated **product spec** with target users, use cases, MVP features, non-goals, and success metrics
- inspect a generated **recreation blueprint** with recommended positioning, pages, components, API needs, and phased delivery guidance
- share a stable server-rendered analysis route at `/analyze/[owner]/[repo]`

The app uses live GitHub repository metadata when available and falls back to deterministic mock analysis if the GitHub API cannot be reached or the request fails.

## Stack

- Next.js 14
- React 18
- Tailwind CSS
- TypeScript
- Zod

## Setup

```bash
npm install
```

Optional environment variable:

```bash
cp .env.example .env.local
```

- `GITHUB_TOKEN` improves GitHub API reliability and rate-limit headroom.
- The app still works without a token by using public GitHub requests and deterministic fallback data when needed.

## Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

## How to use

1. Start the app with `npm run dev`
2. Enter a repository reference like `vercel/next.js` or `https://github.com/vercel/next.js`
3. Submit the form from the landing page
4. Review the generated analysis dashboard and shareable detail route

## Key delivered flows

### Landing page

The homepage introduces the repository analyzer and provides the main repository submission form.

### Analysis API

`POST /api/analyze`

Request body:

```json
{
  "repo": "vercel/next.js"
}
```

Behavior:

- validates repository input
- fetches repository metadata from GitHub when possible
- computes technical/commercial/overall scores
- generates product-spec and recreation-blueprint outputs
- returns structured JSON for the UI

### Shareable analysis page

`/analyze/[owner]/[repo]` renders the full analysis server-side so results can be bookmarked or shared with stakeholders.

### Health endpoint

`GET /api/health` is available for deployment smoke checks.

## Product framing delivered in the MVP

This MVP is intentionally scoped around **analysis and planning**, not one-click repository cloning or deployment. It focuses on helping a user decide:

- whether a repository looks promising as a commercial product input
- how to frame the opportunity for stakeholders
- what a pragmatic recreated MVP should include first

## Notes for deployment / PR completion

- Install dependencies with `npm install`
- Run locally with `npm run dev`
- Validate production build with `npm run build`
- If GitHub API rate limits are a concern in deployment, set `GITHUB_TOKEN`
- No additional required environment variables are needed for the MVP to function
