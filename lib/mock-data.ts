import type { GitHubRepoSnapshot, RepoInput } from "@/lib/types";

const mockCatalog: Record<string, Partial<GitHubRepoSnapshot>> = {
  "vercel/next.js": {
    description: "The React framework for building production web applications.",
    stars: 129000,
    forks: 28000,
    openIssues: 3200,
    watchers: 2400,
    language: "TypeScript",
    topics: ["react", "framework", "ssr", "typescript", "frontend"],
    license: "MIT",
  },
  "calcom/cal.com": {
    description: "Open scheduling infrastructure for teams and marketplaces.",
    stars: 34000,
    forks: 8200,
    openIssues: 510,
    watchers: 310,
    language: "TypeScript",
    topics: ["scheduling", "calendar", "saas", "marketplace", "automation"],
    license: "AGPL-3.0",
  },
  "supabase/supabase": {
    description: "The open source Firebase alternative with database, auth, and storage products.",
    stars: 81000,
    forks: 9100,
    openIssues: 1900,
    watchers: 950,
    language: "TypeScript",
    topics: ["database", "backend", "developer-tools", "auth", "storage"],
    license: "Apache-2.0",
  },
};

const toTitle = (value: string) =>
  value
    .split(/[-_.]/g)
    .filter(Boolean)
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" ");

export function getMockRepository(input: RepoInput): GitHubRepoSnapshot {
  const key = `${input.owner}/${input.repo}`.toLowerCase();
  const preset = mockCatalog[key] ?? {};
  const now = new Date();
  const updatedAt = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 12).toISOString();
  const createdAt = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 700).toISOString();

  return {
    owner: input.owner,
    repo: input.repo,
    fullName: `${input.owner}/${input.repo}`,
    htmlUrl: `https://github.com/${input.owner}/${input.repo}`,
    description:
      preset.description ??
      `${toTitle(input.repo)} is treated as a promising repository concept for demo analysis when live GitHub data is unavailable.`,
    stars: preset.stars ?? 420,
    forks: preset.forks ?? 68,
    openIssues: preset.openIssues ?? 17,
    watchers: preset.watchers ?? 24,
    language: preset.language ?? "TypeScript",
    topics: preset.topics ?? ["automation", "developer-tools", "saas"],
    license: preset.license ?? "MIT",
    createdAt,
    updatedAt,
    defaultBranch: "main",
    archived: false,
  };
}
