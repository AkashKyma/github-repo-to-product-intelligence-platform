import Link from "next/link";

import { AssessmentCard } from "@/components/assessment-card";
import { ProductSpecPanel } from "@/components/product-spec-panel";
import { RecreationBlueprintPanel } from "@/components/recreation-blueprint";
import { RepositoryOverviewCard } from "@/components/repository-overview-card";
import { ResultBanner } from "@/components/result-banner";
import { ScoreBreakdown } from "@/components/score-breakdown";
import type { RepositoryAnalysis } from "@/lib/types";

export function AnalysisDashboard({ analysis }: { analysis: RepositoryAnalysis }) {
  const shareHref = `/analyze/${analysis.repo.owner}/${analysis.repo.repo}`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ResultBanner analysis={analysis} />
        <Link
          href={shareHref}
          className="inline-flex h-fit items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          Open shareable view
        </Link>
      </div>

      <RepositoryOverviewCard repo={analysis.repo} />

      <div className="grid gap-6 xl:grid-cols-2">
        <AssessmentCard title="Technical assessment" score={analysis.technicalScore} findings={analysis.technicalFindings} tone="technical" />
        <AssessmentCard title="Commercial assessment" score={analysis.commercialScore} findings={analysis.commercialFindings} tone="commercial" />
      </div>

      <ScoreBreakdown analysis={analysis} />

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <ProductSpecPanel productSpec={analysis.productSpec} />
        <div className="space-y-6">
          <RecreationBlueprintPanel blueprint={analysis.recreationBlueprint} />
          <RiskOpportunityPanel title="Top opportunities" items={analysis.opportunities} tone="sky" />
          <RiskOpportunityPanel title="Risks and unknowns" items={analysis.risks} tone="amber" />
        </div>
      </div>
    </div>
  );
}

function RiskOpportunityPanel({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "sky" | "amber";
}) {
  const palette =
    tone === "sky"
      ? "border-sky-200 bg-sky-50 text-sky-950"
      : "border-amber-200 bg-amber-50 text-amber-950";

  return (
    <section className={`rounded-3xl border p-6 shadow-panel ${palette}`}>
      <h3 className="text-xl font-semibold">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm leading-7">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
