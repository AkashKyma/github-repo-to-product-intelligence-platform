export function LoadingSkeleton() {
  return (
    <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-panel">
      <div className="h-6 w-40 animate-pulse rounded-full bg-slate-200" />
      <div className="h-10 w-3/4 animate-pulse rounded-2xl bg-slate-200" />
      <div className="grid gap-4 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="space-y-3 rounded-2xl border border-slate-200 p-4">
            <div className="h-4 w-28 animate-pulse rounded-full bg-slate-200" />
            <div className="h-8 w-16 animate-pulse rounded-full bg-slate-200" />
            <div className="h-20 animate-pulse rounded-2xl bg-slate-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
