import type { GitHubRepoSnapshot } from "@/lib/types";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

const stats = (repo: GitHubRepoSnapshot) => [
  { label: "Stars", value: repo.stars.toLocaleString() },
  { label: "Forks", value: repo.forks.toLocaleString() },
  { label: "Watchers", value: repo.watchers.toLocaleString() },
  { label: "Open issues", value: repo.openIssues.toLocaleString() },
];

export function RepositoryOverviewCard({ repo }: { repo: GitHubRepoSnapshot }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-panel">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Repository overview</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-950">{repo.fullName}</h3>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-slate-600">{repo.description}</p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">Language: {repo.language}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">License: {repo.license}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">Updated: {formatDate(repo.updatedAt)}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">Branch: {repo.defaultBranch}</span>
          </div>
        </div>
        <a
          href={repo.htmlUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-fit items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-800 transition hover:bg-sky-100"
        >
          View on GitHub
        </a>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats(repo).map((item) => (
          <div key={item.label} className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">{item.value}</p>
          </div>
        ))}
      </div>

      {repo.topics.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {repo.topics.map((topic) => (
            <span key={topic} className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600">
              #{topic}
            </span>
          ))}
        </div>
      ) : null}
    </section>
  );
}
