export function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-950 shadow-panel">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-rose-700">Unable to analyze repository</p>
      <p className="mt-3 text-sm leading-7">{message}</p>
    </div>
  );
}
