import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Navora Digital" },
      {
        name: "description",
        content:
          "Open roles across engineering, growth, AI and creative at Navora Digital. Build the ecosystem behind ambitious brands.",
      },
      { property: "og:title", content: "Careers — Navora Digital" },
      {
        property: "og:description",
        content: "Open roles across engineering, growth, AI and creative.",
      },
    ],
    links: [{ rel: "canonical", href: "https://navora.placeory.store/careers" }],
  }),
  component: CareersPage,
});

const roles = [
  {
    title: "Full-Stack Engineer (TypeScript / React)",
    team: "Engineering",
    location: "Remote / Hybrid",
    type: "Full-time",
    blurb:
      "Ship production web platforms, dashboards and CRM modules for growing brands. React, TanStack, Supabase, AI APIs.",
  },
  {
    title: "AI / Automation Engineer",
    team: "AI",
    location: "Remote",
    type: "Full-time",
    blurb:
      "Design and deploy conversational agents, workflow automations and voice/SMS pipelines that drive real revenue.",
  },
  {
    title: "Performance Marketing Lead",
    team: "Growth",
    location: "Hybrid",
    type: "Full-time",
    blurb:
      "Own paid strategy across Google, Meta and LinkedIn for a portfolio of ambitious brands. Own the KPI, not the ticket.",
  },
  {
    title: "SEO / GEO Strategist",
    team: "Growth",
    location: "Remote",
    type: "Full-time",
    blurb:
      "Rank in Google and answer in AI. Technical SEO, content strategy and generative-engine optimisation.",
  },
  {
    title: "Art Director",
    team: "Creative",
    location: "Hybrid",
    type: "Full-time",
    blurb:
      "Lead editorial-grade visual direction across brand, web, film and campaigns. Portfolio-first hire.",
  },
  {
    title: "Video Editor / Motion Designer",
    team: "Creative",
    location: "Remote / Hybrid",
    type: "Full-time / Freelance",
    blurb:
      "Cut short-form and long-form for brand, ads and social. Motion fluency in After Effects a plus.",
  },
  {
    title: "Client Partner",
    team: "Partnership",
    location: "Hybrid",
    type: "Full-time",
    blurb:
      "Own long-term client relationships. Half strategist, half operator — accountable to outcomes.",
  },
  {
    title: "Internships & Apprenticeships",
    team: "All teams",
    location: "Hybrid",
    type: "6–12 months",
    blurb:
      "Rolling intake across engineering, growth and creative. Real projects, real mentors, real ownership.",
  },
];

function CareersPage() {
  return (
    <PageLayout
      title="Build the ecosystem behind ambitious brands"
      subtitle="We hire operators, engineers and creatives who care about the outcome more than the deliverable. If that's you, we want to talk."
    >
      <div className="grid gap-4">
        {roles.map((r) => (
          <div
            key={r.title}
            className="flex flex-col gap-4 rounded-2xl border border-border bg-background/40 p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold text-foreground">{r.title}</h3>
                <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-300">
                  {r.team}
                </span>
              </div>
              <p className="mt-2 text-sm text-foreground/75">{r.blurb}</p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-foreground/65">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" /> {r.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> {r.type}
                </span>
              </div>
            </div>
            <Link
              to="/contact"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
            >
              Apply
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-background/40 p-6 text-sm text-foreground/75">
        Don't see your role? Send us your work anyway — we hire ahead of roles
        when the person is right.{" "}
        <Link to="/contact" className="font-medium text-foreground underline">
          Introduce yourself →
        </Link>
      </div>
    </PageLayout>
  );
}
