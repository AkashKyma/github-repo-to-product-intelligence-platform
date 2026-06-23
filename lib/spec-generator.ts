import type {
  AnalysisScore,
  GitHubRepoSnapshot,
  ProductSpec,
  RecreationBlueprint,
} from "@/lib/types";

const titleize = (value: string) =>
  value
    .split(/[-_.]/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const pickPrimaryTopic = (repo: GitHubRepoSnapshot) => repo.topics[0] ?? repo.language.toLowerCase();

export function generateProductSpec(
  repo: GitHubRepoSnapshot,
  technicalScore: AnalysisScore,
  commercialScore: AnalysisScore,
): ProductSpec {
  const repoName = titleize(repo.repo);
  const primaryTopic = pickPrimaryTopic(repo);

  return {
    summary: `${repoName} can be reframed as a focused ${primaryTopic} product with execution confidence driven by a ${technicalScore.score}/100 technical score and a ${commercialScore.score}/100 commercial score.`,
    problem: `${repoName} already demonstrates real implementation depth, but a productized MVP would need to narrow the repository into a crisp workflow, clearer onboarding, and measurable business outcomes.`,
    targetUsers: [
      `Teams already exploring ${primaryTopic} workflows`,
      `Operators who need a faster path than self-hosting raw open source projects`,
      `Product or engineering leads evaluating ${repo.language} ecosystems`,
    ],
    coreUseCases: [
      `Analyze the repository to understand technical readiness and product potential`,
      `Convert repository capabilities into a tractable MVP feature set`,
      `Identify monetizable workflows, guardrails, and success metrics before implementation`,
    ],
    mvpFeatures: [
      "Repository ingestion with health, traction, and architecture signals",
      "Executive product brief generated from repo metadata and positioning heuristics",
      "Feature scope recommendation separating MVP essentials from expansion ideas",
      "Blueprint view covering routes, APIs, and phased delivery plan",
    ],
    nonGoals: [
      "One-click cloning or deployment of arbitrary repositories",
      "Deep source-code indexing or semantic code search in the MVP phase",
      "Multi-tenant billing, auth, or workspace management before core validation",
    ],
    successMetrics: [
      "Users can submit a repository and receive a clear go/no-go signal within two minutes",
      "At least one concrete MVP scope recommendation is produced for every valid repo",
      "Stakeholders can share a stable analysis URL for async review",
    ],
  };
}

export function generateRecreationBlueprint(repo: GitHubRepoSnapshot): RecreationBlueprint {
  const repoName = titleize(repo.repo);
  const primaryTopic = pickPrimaryTopic(repo);

  return {
    recommendedPositioning: `Package ${repoName} as an opinionated ${primaryTopic} product that prioritizes guided workflows, faster activation, and executive-friendly reporting over raw repository flexibility.`,
    pages: [
      "Marketing + repository submission landing page",
      "Analysis detail page with scorecards and investment recommendation",
      "Generated MVP scope page outlining must-have modules and non-goals",
      "Delivery roadmap view with phased engineering plan",
    ],
    components: [
      "Repository input and validation form",
      "Signal cards for technical and commercial scoring",
      "Product specification panels for personas, use cases, and metrics",
      "Roadmap timeline for the recreated MVP delivery phases",
    ],
    apiNeeds: [
      "GitHub repository metadata fetch endpoint",
      "Analysis normalization endpoint with deterministic fallback support",
      "Health endpoint for deployment checks and smoke tests",
    ],
    deliveryPhases: [
      {
        phase: "Phase 1 — Ingest and score",
        items: [
          "Validate repository input and fetch GitHub metadata",
          "Normalize health signals and score the repo deterministically",
          "Expose shareable analysis URLs",
        ],
      },
      {
        phase: "Phase 2 — Productize the opportunity",
        items: [
          "Generate product framing, ICP assumptions, and success metrics",
          "Separate MVP features from strategic non-goals",
          "Surface major risks and unknowns for stakeholder review",
        ],
      },
      {
        phase: "Phase 3 — Recreate the MVP",
        items: [
          "Translate validated requirements into app routes, APIs, and components",
          "Build phased implementation backlog with shipping milestones",
          "Instrument metrics to compare recreated product value against repository complexity",
        ],
      },
    ],
  };
}
