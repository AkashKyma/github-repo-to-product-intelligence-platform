import type { RecreationBlueprint } from "@/lib/types";

export function RecreationBlueprintPanel({ blueprint }: { blueprint: RecreationBlueprint }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-panel">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Recreation blueprint</p>
      <h3 className="mt-2 text-2xl font-semibold text-slate-950">How to turn the repo into a real MVP</h3>
      <p className="mt-4 text-sm leading-7 text-slate-600">{blueprint.recommendedPositioning}</p>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <BlueprintList title="Pages" items={blueprint.pages} />
        <BlueprintList title="Components" items={blueprint.components} />
        <BlueprintList title="API needs" items={blueprint.apiNeeds} />
      </div>

      <div className="mt-6 space-y-4">
        {blueprint.deliveryPhases.map((phase) => (
          <div key={phase.phase} className="rounded-2xl border border-slate-200 p-4">
            <p className="text-sm font-semibold text-slate-900">{phase.phase}</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
              {phase.items.map((item) => (
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

function BlueprintList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
