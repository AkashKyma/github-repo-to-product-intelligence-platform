import { fetchGitHubRepository, parseRepoInput } from "@/lib/github";
import { getMockRepository } from "@/lib/mock-data";
import { generateProductSpec, generateRecreationBlueprint } from "@/lib/spec-generator";
import type { AnalysisScore, GitHubRepoSnapshot, RepositoryAnalysis } from "@/lib/types";

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));

const daysSince = (isoDate: string) => {
  const diff = Date.now() - new Date(isoDate).getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
};

const numberSignal = (value: number, weight: number) => Math.log10(value + 1) * weight;

function buildTechnicalScore(repo: GitHubRepoSnapshot): AnalysisScore {
  const activityDays = daysSince(repo.updatedAt);
  const activityScore = activityDays <= 30 ? 24 : activityDays <= 180 ? 18 : activityDays <= 365 ? 12 : 6;
  const tractionScore = numberSignal(repo.stars, 9) + numberSignal(repo.forks, 4);
  const structureScore = (repo.description ? 8 : 0) + (repo.license !== "No license listed" ? 6 : 1) + (repo.language !== "Unknown" ? 5 : 0) + Math.min(repo.topics.length * 2, 10);
  const stabilityScore = repo.archived ? -18 : 9;
  const issueLoad = repo.openIssues > 1000 ? -5 : repo.openIssues > 250 ? -2 : 3;
  const score = clamp(18 + activityScore + tractionScore + structureScore + stabilityScore + issueLoad);

  return {
    label: "Technical Readiness",
    score,
    reason: repo.archived
      ? "The repository has meaningful signals, but archived status materially lowers implementation confidence."
      : `Healthy activity, ecosystem traction, and metadata completeness support a ${score}/100 technical readiness score.`,
  };
}

function buildCommercialScore(repo: GitHubRepoSnapshot): AnalysisScore {
  const descriptionClarity = repo.description && !repo.description.startsWith("No repository") ? 18 : 8;
  const demandScore = numberSignal(repo.stars, 8) + Math.min(repo.topics.length * 2.5, 12);
  const packagingFit = /platform|api|dashboard|workflow|automation|tool|app|infra|data/i.test(`${repo.description} ${repo.topics.join(" ")}`) ? 20 : 12;
  const audienceBreadth = repo.language !== "Unknown" ? 10 : 6;
  const freshness = daysSince(repo.updatedAt) <= 180 ? 10 : 5;
  const score = clamp(15 + descriptionClarity + demandScore + packagingFit + audienceBreadth + freshness);

  return {
    label: "Commercial Potential",
    score,
    reason: `The repository hints at a sellable workflow, with demand proxies and positioning clarity producing a ${score}/100 commercialization score.`,
  };
}

function buildOverallScore(technicalScore: AnalysisScore, commercialScore: AnalysisScore): AnalysisScore {
  const score = clamp(technicalScore.score * 0.55 + commercialScore.score * 0.45);

  return {
    label: "Overall Opportunity",
    score,
    reason: "Weighted blend of implementation confidence and productization potential.",
  };
}

function buildTechnicalFindings(repo: GitHubRepoSnapshot): string[] {
  const findings = [
    `${repo.fullName} is primarily built in ${repo.language}, which gives the recreated MVP a clear default implementation language.`,
    repo.license !== "No license listed"
      ? `An explicit ${repo.license} license reduces ambiguity when evaluating reuse or inspiration boundaries.`
      : "License ambiguity means a recreated MVP should treat this as inspiration, not a direct derivative.",
    repo.topics.length > 0
      ? `Topic coverage (${repo.topics.join(", ")}) makes the solution space more legible for scoping and market mapping.`
      : "Sparse topic metadata means more manual framing is needed when positioning the repo for customers.",
  ];

  if (daysSince(repo.updatedAt) <= 90) {
    findings.push("Recent update activity suggests the codebase direction is still alive and easier to benchmark against current demand.");
  } else {
    findings.push("Older update activity raises the odds that a recreated MVP will need opinionated simplification rather than feature parity.");
  }

  return findings;
}

function buildCommercialFindings(repo: GitHubRepoSnapshot): string[] {
  return [
    `${repo.stars.toLocaleString()} stars and ${repo.forks.toLocaleString()} forks provide a lightweight proxy for market curiosity and developer trust.`,
    repo.description && !repo.description.startsWith("No repository")
      ? `The repository description already contains a credible problem framing: “${repo.description}”`
      : "The repository lacks a sharp description, so the product narrative should be tightened before serious commercialization.",
    repo.topics.length >= 3
      ? "Multiple topical tags make it easier to define an ICP and adjacent buyer categories."
      : "Narrow or missing topics may hide who the real buyer is, which increases go-to-market uncertainty.",
  ];
}

function buildRisks(repo: GitHubRepoSnapshot): string[] {
  const risks = [
    "Open-source popularity does not automatically translate into willingness to pay for a packaged product.",
    "Repository metadata is a coarse proxy; deeper code or user research may revise the recommendation.",
  ];

  if (repo.archived) {
    risks.push("Archived repositories can signal maintenance drag, making recreation harder to de-risk.");
  }

  if (repo.license === "No license listed") {
    risks.push("Missing license information complicates how directly the original repo can inform the recreated MVP.");
  }

  return risks;
}

function buildOpportunities(repo: GitHubRepoSnapshot): string[] {
  return [
    "Package the strongest workflow into a narrower, easier-to-onboard SaaS-style experience.",
    "Use repository traction to prioritize integrations, templates, and dashboards that reduce adoption friction.",
    `Convert ${repo.fullName} from a code artifact into a buyer-facing product narrative with clearer activation and ROI metrics.`,
  ];
}

export function analyzeRepositorySnapshot(
  repo: GitHubRepoSnapshot,
  source: "live" | "fallback",
  fallbackReason?: string,
): RepositoryAnalysis {
  const input = {
    raw: repo.fullName,
    owner: repo.owner,
    repo: repo.repo,
  };
  const technicalScore = buildTechnicalScore(repo);
  const commercialScore = buildCommercialScore(repo);
  const overallScore = buildOverallScore(technicalScore, commercialScore);

  return {
    input,
    repo,
    source,
    fallbackReason,
    technicalScore,
    commercialScore,
    overallScore,
    technicalFindings: buildTechnicalFindings(repo),
    commercialFindings: buildCommercialFindings(repo),
    risks: buildRisks(repo),
    opportunities: buildOpportunities(repo),
    productSpec: generateProductSpec(repo, technicalScore, commercialScore),
    recreationBlueprint: generateRecreationBlueprint(repo),
  };
}

export async function getRepositoryAnalysis(rawInput: string): Promise<RepositoryAnalysis> {
  const input = parseRepoInput(rawInput);

  try {
    const liveRepo = await fetchGitHubRepository(input);
    return analyzeRepositorySnapshot(liveRepo, "live");
  } catch (error) {
    const fallbackRepo = getMockRepository(input);
    const reason = error instanceof Error ? error.message : "Live GitHub data could not be fetched.";
    return analyzeRepositorySnapshot(fallbackRepo, "fallback", reason);
  }
}
