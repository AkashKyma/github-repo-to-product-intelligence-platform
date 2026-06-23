import { AppShell } from "@/components/app-shell";
import { RepoInputForm } from "@/components/repo-input-form";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/src/site";

const valuePoints = [
  {
    title: "Executive summary fast",
    body: "Turn raw repository signals into a board-ready recommendation without reading the entire codebase first.",
  },
  {
    title: "Product framing built in",
    body: "Translate technical artifacts into ICPs, use cases, success metrics, and MVP feature boundaries.",
  },
  {
    title: "Recreation roadmap included",
    body: "Leave with a practical plan for rebuilding the highest-value slice as a standalone product.",
  },
];

export default function HomePage() {
  return (
    <AppShell>
      <section className="grid gap-10 rounded-[2rem] border border-slate-200 bg-white/80 p-8 shadow-panel backdrop-blur sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-sky-50 px-4 py-1.5 text-sm font-semibold text-sky-800">
            GitHub repository analyzer & recreation platform
          </span>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              {siteConfig.tagline}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              {siteConfig.description}
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {valuePoints.map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Analyze"
          title="Submit a repo and get a product intelligence brief"
          description="This MVP focuses on high-signal analysis first: technical readiness, commercial potential, generated product specs, and a pragmatic recreation blueprint."
        />
        <RepoInputForm />
      </section>
    </AppShell>
  );
}
