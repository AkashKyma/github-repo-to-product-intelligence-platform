import type { RepositoryAnalysis } from "@/lib/types";

export function ScoreBreakdown({ analysis }: { analysis: RepositoryAnalysis }) {
  const scores = [analysis.technicalScore, analysis.commercialScore, analysis.overallScore];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-panel">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Score breakdown</p>
      <h3 className="mt-2 text-2xl font-semibold text-slate-950">Weighted recommendation at a glance</h3>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {scores.map((score) => (
          <div key={score.label} className="rounded-2xl border border-slate-200 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-900">{score.label}</p>
              <span className="text-lg font-semibold text-slate-950">{score.score}</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-sky-500" style={{ width: `${score.score}%` }} />
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">{score.reason}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm text-slate-500">
        Overall opportunity weights technical readiness at 55% and commercial potential at 45% to keep feasibility slightly ahead of storytelling.
      </p>
    </section>
  );
}
