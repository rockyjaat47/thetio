import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team — Navora Digital" },
      {
        name: "description",
        content:
          "The strategists, engineers, marketers and creatives behind Navora Digital — one team across four disciplines.",
      },
      { property: "og:title", content: "Team — Navora Digital" },
      {
        property: "og:description",
        content: "One team across four disciplines — no vendor chain.",
      },
    ],
    links: [{ rel: "canonical", href: "https://navora.placeory.store/team" }],
  }),
  component: TeamPage,
});

const pillars = [
  {
    name: "Strategy & Growth",
    lead: "Growth strategists, media planners and CMO-track operators.",
    roles: ["Growth Strategy", "Paid Media", "SEO / GEO / AEO", "Analytics & Attribution"],
  },
  {
    name: "Engineering & AI",
    lead: "Full-stack engineers, AI specialists and platform architects.",
    roles: ["Web & App Development", "Custom Software / SaaS", "AI Agents & Automation", "CRM & Systems"],
  },
  {
    name: "Creative & Content",
    lead: "Editorial-grade art direction, film, motion and copy.",
    roles: ["Art Direction", "Video & Photography", "Brand & Identity", "Copywriting"],
  },
  {
    name: "Client Partnership",
    lead: "Your day-to-day team — accountable to results, not tickets.",
    roles: ["Account Leadership", "Project Delivery", "Reporting & Rituals", "24/7 Support"],
  },
];

function TeamPage() {
  return (
    <PageLayout
      title="One team. Four disciplines. Zero handoffs."
      subtitle="Navora Digital is not an agency network — it's a single operating team. Strategy, engineering, creative and delivery, sitting under one roof and one plan."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {pillars.map((p) => (
          <div
            key={p.name}
            className="rounded-2xl border border-border bg-background/40 p-6"
          >
            <h3 className="text-xl font-semibold text-foreground">{p.name}</h3>
            <p className="mt-2 text-sm text-foreground/75">{p.lead}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.roles.map((r) => (
                <li
                  key={r}
                  className="rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-foreground/80"
                >
                  {r}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-background/40 p-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Want to join the team?
          </h3>
          <p className="mt-1 text-sm text-foreground/70">
            We're hiring across engineering, growth and creative.
          </p>
        </div>
        <Link
          to="/careers"
          className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
        >
          View open roles
        </Link>
      </div>
    </PageLayout>
  );
}
