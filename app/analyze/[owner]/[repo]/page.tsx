import Link from "next/link";

import { AnalysisDashboard } from "@/components/analysis-dashboard";
import { AppShell } from "@/components/app-shell";
import { ErrorState } from "@/components/error-state";
import { SectionHeading } from "@/components/section-heading";
import { getRepositoryAnalysis } from "@/lib/analyzer";

export default async function AnalyzeDetailPage({
  params,
}: {
  params: { owner: string; repo: string };
}) {
  try {
    const analysis = await getRepositoryAnalysis(`${params.owner}/${params.repo}`);

    return (
      <AppShell>
        <div className="flex items-center justify-between gap-4">
          <SectionHeading
            eyebrow="Shareable analysis"
            title={analysis.repo.fullName}
            description="A server-rendered analysis route that can be bookmarked or shared with stakeholders."
          />
          <Link
            href="/"
            className="inline-flex h-fit shrink-0 items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Back to analyzer
          </Link>
        </div>
        <AnalysisDashboard analysis={analysis} />
      </AppShell>
    );
  } catch (error) {
    return (
      <AppShell>
        <div className="flex items-center justify-between gap-4">
          <SectionHeading
            eyebrow="Shareable analysis"
            title="Repository analysis unavailable"
            description="The requested repository path could not be analyzed."
          />
          <Link
            href="/"
            className="inline-flex h-fit shrink-0 items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Back to analyzer
          </Link>
        </div>
        <ErrorState message={error instanceof Error ? error.message : "Unable to load repository analysis."} />
      </AppShell>
    );
  }
}
