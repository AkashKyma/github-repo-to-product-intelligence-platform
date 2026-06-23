"use client";

import { type FormEvent, useState } from "react";

import { featuredExamples } from "@/data/examples";
import { AnalysisDashboard } from "@/components/analysis-dashboard";
import { ErrorState } from "@/components/error-state";
import { ExamplePills } from "@/components/example-pills";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import type { RepositoryAnalysis } from "@/lib/types";

const initialValue = "vercel/next.js";

export function RepoInputForm() {
  const [value, setValue] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<RepositoryAnalysis | null>(null);

  const runAnalysis = async (repoValue: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ repo: repoValue }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to analyze repository.");
      }

      setAnalysis(payload);
    } catch (caughtError) {
      setAnalysis(null);
      setError(caughtError instanceof Error ? caughtError.message : "Unable to analyze repository.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await runAnalysis(value);
  };

  const onSelectExample = async (exampleValue: string) => {
    setValue(exampleValue);
    await runAnalysis(exampleValue);
  };

  return (
    <div className="space-y-8">
      <form onSubmit={onSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-panel sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-4">
            <label htmlFor="repo" className="block text-sm font-semibold text-slate-900">
              GitHub repository URL or owner/repo
            </label>
            <input
              id="repo"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="https://github.com/vercel/next.js or vercel/next.js"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            />
            <p className="text-sm leading-6 text-slate-500">
              RepoSignal scores technical readiness, product potential, and the quickest path to a recreated MVP. Live GitHub metadata is used when available; deterministic fallback insights keep the app usable offline.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {loading ? "Analyzing…" : "Analyze repository"}
            </button>
            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">What you get</p>
              <ul className="mt-2 space-y-2">
                <li>Technical + commercial scorecards</li>
                <li>Generated product spec</li>
                <li>MVP recreation blueprint</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Try a sample repository</p>
          <ExamplePills examples={featuredExamples} onSelect={onSelectExample} />
        </div>
      </form>

      {loading ? <LoadingSkeleton /> : null}
      {error ? <ErrorState message={error} /> : null}
      {analysis ? <AnalysisDashboard analysis={analysis} /> : null}
    </div>
  );
}
