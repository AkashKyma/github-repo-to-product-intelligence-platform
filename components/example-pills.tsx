import type { FeaturedExample } from "@/lib/types";

export function ExamplePills({
  examples,
  onSelect,
}: {
  examples: FeaturedExample[];
  onSelect: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {examples.map((example) => (
        <button
          key={example.value}
          type="button"
          onClick={() => onSelect(example.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-sky-300 hover:bg-sky-50"
        >
          <span className="block text-sm font-semibold text-slate-900">{example.label}</span>
          <span className="mt-1 block text-xs text-slate-500">{example.note}</span>
        </button>
      ))}
    </div>
  );
}
