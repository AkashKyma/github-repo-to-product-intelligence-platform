import type { AnalysisScore } from "@/lib/types";

type AssessmentCardProps = {
  title: string;
  score: AnalysisScore;
  findings: string[];
  tone: "technical" | "commercial";
};

const toneMap = {
  technical: {
    ring: "border-sky-200",
    badge: "bg-sky-50 text-sky-800",
  },
  commercial: {
    ring: "border-violet-200",
    badge: "bg-violet-50 text-violet-800",
  },
};

export function AssessmentCard({ title, score, findings, tone }: AssessmentCardProps) {
  const palette = toneMap[tone];

  return (
    <section className={`rounded-3xl border ${palette.ring} bg-white p-6 shadow-panel`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">{title}</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-950">{score.score}/100</h3>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${palette.badge}`}>{score.label}</span>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-600">{score.reason}</p>
      <ul className="mt-5 space-y-3 text-sm text-slate-700">
        {findings.map((finding) => (
          <li key={finding} className="flex gap-3 rounded-2xl bg-slate-50 px-4 py-3">
            <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-400" />
            <span>{finding}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
