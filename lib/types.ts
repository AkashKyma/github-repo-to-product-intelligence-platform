export type RepoInput = {
  raw: string;
  owner: string;
  repo: string;
};

export type GitHubRepoSnapshot = {
  owner: string;
  repo: string;
  fullName: string;
  htmlUrl: string;
  description: string;
  stars: number;
  forks: number;
  openIssues: number;
  watchers: number;
  language: string;
  topics: string[];
  license: string;
  createdAt: string;
  updatedAt: string;
  defaultBranch: string;
  archived: boolean;
};

export type AnalysisScore = {
  label: string;
  score: number;
  reason: string;
};

export type ProductSpec = {
  summary: string;
  problem: string;
  targetUsers: string[];
  coreUseCases: string[];
  mvpFeatures: string[];
  nonGoals: string[];
  successMetrics: string[];
};

export type DeliveryPhase = {
  phase: string;
  items: string[];
};

export type RecreationBlueprint = {
  recommendedPositioning: string;
  pages: string[];
  components: string[];
  apiNeeds: string[];
  deliveryPhases: DeliveryPhase[];
};

export type RepositoryAnalysis = {
  input: RepoInput;
  repo: GitHubRepoSnapshot;
  source: "live" | "fallback";
  fallbackReason?: string;
  technicalScore: AnalysisScore;
  commercialScore: AnalysisScore;
  overallScore: AnalysisScore;
  technicalFindings: string[];
  commercialFindings: string[];
  risks: string[];
  opportunities: string[];
  productSpec: ProductSpec;
  recreationBlueprint: RecreationBlueprint;
};

export type FeaturedExample = {
  label: string;
  value: string;
  note: string;
};
