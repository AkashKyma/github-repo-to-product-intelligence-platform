import type { RepositoryAnalysis } from "@/lib/types";

export function ResultBanner({ analysis }: { analysis: RepositoryAnalysis }) {
  if (analysis.source === "live") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
        Live GitHub metadata loaded successfully for <span className="font-semibold">{analysis.repo.fullName}</span>.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
      Showing a generated demo analysis for <span className="font-semibold">{analysis.repo.fullName}</span> because live GitHub data was unavailable.
      {analysis.fallbackReason ? <span className="block pt-1 text-amber-800">Reason: {analysis.fallbackReason}</span> : null}
    </div>
  );
}
