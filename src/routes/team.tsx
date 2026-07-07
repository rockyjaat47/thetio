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
      <div className="mb-10 space-y-3 text-foreground/80">
        <p>
          Most agencies scale by adding vendors. We scale by adding operators. Every person on the
          Navora team is a full-time employee, trained inside the same playbook, accountable to
          the same monthly review, and reachable on the same WhatsApp group as you.
        </p>
        <p>
          When we say "one team," we mean the growth strategist sits ten feet from the engineer
          who ships your CRM automation, who sits ten feet from the art director cutting the
          campaign film. Ideas move at the speed of conversation, not the speed of a status meeting.
        </p>
      </div>

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

      <section className="mt-14">
        <h2 className="mb-4 text-2xl font-semibold text-foreground">How we're structured</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["Pods, not silos", "Each client is served by a pod — a strategist, an engineer, a creative lead and an account partner — who stay with you for the length of the engagement."],
            ["Senior-first", "You get the person who scoped the work doing the work. Junior team members support, they don't replace."],
            ["In-house, not outsourced", "Every discipline is on payroll. No mystery subcontractors, no time-zone excuses."],
            ["Global delivery", "Headquartered in Lucknow with team members across Delhi, Mumbai, Bengaluru, Dubai and London."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-border bg-background/40 p-5">
              <div className="font-medium text-foreground">{t}</div>
              <p className="mt-1 text-sm text-foreground/70">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="mb-4 text-2xl font-semibold text-foreground">Our leadership</h2>
        <p className="text-foreground/80">
          Navora was founded by a small group with backgrounds spanning law, technology,
          performance marketing and private equity. That mix shapes how we operate: rigorous about
          numbers, obsessive about craft, and allergic to fluff. We built the company we wished we
          could have hired when we were on the client side.
        </p>
      </section>

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
