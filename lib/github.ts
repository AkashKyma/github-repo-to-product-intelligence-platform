import { z } from "zod";

import type { GitHubRepoSnapshot, RepoInput } from "@/lib/types";

const repoPathSchema = z.object({
  owner: z.string().min(1).max(100),
  repo: z.string().min(1).max(100),
});

export class GitHubFetchError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "GitHubFetchError";
  }
}

const sanitizeSegment = (value: string) => value.trim().replace(/^\/+|\/+$/g, "").replace(/\.git$/i, "");

export function parseRepoInput(raw: string): RepoInput {
  const trimmed = raw.trim();

  if (!trimmed) {
    throw new Error("Enter a GitHub repository URL or owner/repo.");
  }

  if (trimmed.includes("github.com")) {
    let url: URL;

    try {
      url = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
    } catch {
      throw new Error("The GitHub URL could not be parsed.");
    }

    const [owner, repo] = url.pathname.split("/").filter(Boolean).slice(0, 2).map(sanitizeSegment);
    const parsed = repoPathSchema.safeParse({ owner, repo });

    if (!parsed.success) {
      throw new Error("Use a full GitHub repository URL like https://github.com/vercel/next.js.");
    }

    return {
      raw: trimmed,
      owner: parsed.data.owner,
      repo: parsed.data.repo,
    };
  }

  const [owner, repo] = trimmed.split("/").map(sanitizeSegment);
  const parsed = repoPathSchema.safeParse({ owner, repo });

  if (!parsed.success) {
    throw new Error("Use a repository reference in the form owner/repo.");
  }

  return {
    raw: trimmed,
    owner: parsed.data.owner,
    repo: parsed.data.repo,
  };
}

export async function fetchGitHubRepository(input: RepoInput): Promise<GitHubRepoSnapshot> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "RepoSignal",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(`https://api.github.com/repos/${input.owner}/${input.repo}`, {
    headers,
    cache: "no-store",
  });

  if (!response.ok) {
    const statusText = response.status === 404 ? "Repository not found on GitHub." : `GitHub API request failed with status ${response.status}.`;
    throw new GitHubFetchError(statusText, response.status);
  }

  const payload = await response.json();

  return {
    owner: payload.owner?.login ?? input.owner,
    repo: payload.name ?? input.repo,
    fullName: payload.full_name ?? `${input.owner}/${input.repo}`,
    htmlUrl: payload.html_url ?? `https://github.com/${input.owner}/${input.repo}`,
    description: payload.description ?? "No repository description was provided.",
    stars: payload.stargazers_count ?? 0,
    forks: payload.forks_count ?? 0,
    openIssues: payload.open_issues_count ?? 0,
    watchers: payload.subscribers_count ?? payload.watchers_count ?? 0,
    language: payload.language ?? "Unknown",
    topics: Array.isArray(payload.topics) ? payload.topics : [],
    license: payload.license?.spdx_id || payload.license?.name || "No license listed",
    createdAt: payload.created_at ?? new Date().toISOString(),
    updatedAt: payload.updated_at ?? new Date().toISOString(),
    defaultBranch: payload.default_branch ?? "main",
    archived: Boolean(payload.archived),
  };
}
