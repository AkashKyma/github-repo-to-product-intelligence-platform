import type { ProductSpec } from "@/lib/types";

const listSections = [
  { key: "targetUsers", label: "Target users" },
  { key: "coreUseCases", label: "Core use cases" },
  { key: "mvpFeatures", label: "Recommended MVP features" },
  { key: "nonGoals", label: "Non-goals" },
  { key: "successMetrics", label: "Success metrics" },
] as const;

export function ProductSpecPanel({ productSpec }: { productSpec: ProductSpec }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-panel">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Generated product spec</p>
      <h3 className="mt-2 text-2xl font-semibold text-slate-950">Executive-ready MVP framing</h3>
      <p className="mt-4 text-sm leading-7 text-slate-600">{productSpec.summary}</p>
      <div className="mt-5 rounded-2xl bg-slate-50 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Problem statement</p>
        <p className="mt-2 text-sm leading-7 text-slate-700">{productSpec.problem}</p>
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {listSections.map((section) => (
          <div key={section.key} className="rounded-2xl border border-slate-200 p-4">
            <p className="text-sm font-semibold text-slate-900">{section.label}</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
              {productSpec[section.key].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
