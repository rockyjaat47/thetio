import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Check } from "lucide-react";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Packages — Navora Digital" },
      {
        name: "description",
        content:
          "Ignite, Momentum, Command and Apex — four Navora Digital packages that combine marketing, software, AI and creative under one retainer.",
      },
      { property: "og:title", content: "Packages — Navora Digital" },
      {
        property: "og:description",
        content:
          "Four packages that combine marketing, software, AI and creative under one retainer.",
      },
    ],
    links: [{ rel: "canonical", href: "https://navora.placeory.store/packages" }],
  }),
  component: PackagesPage,
});

type Pkg = {
  name: string;
  tag: string;
  price: string;
  best: string;
  features: string[];
  featured?: boolean;
};

const packages: Pkg[] = [
  {
    name: "Ignite",
    tag: "Starter",
    price: "Entry",
    best: "New brands ready to show up online with intent.",
    features: [
      "Brand & positioning audit",
      "Landing page or 3-page site",
      "SEO foundation & Google Business",
      "1 paid channel (Google or Meta)",
      "Basic CRM & lead capture",
      "Monthly performance report",
    ],
  },
  {
    name: "Momentum",
    tag: "Growth",
    price: "Popular",
    best: "Growing businesses that need consistent, tracked demand.",
    features: [
      "Full website or web platform",
      "SEO + GEO/AEO program",
      "Google Ads + Meta Ads",
      "Social content (12–16 posts/mo)",
      "WhatsApp Business + AI chatbot",
      "CRM automation & pipelines",
    ],
    featured: true,
  },
  {
    name: "Command",
    tag: "Scale",
    price: "Full-stack",
    best: "Established brands scaling multi-channel with real infrastructure.",
    features: [
      "Custom software / CRM module",
      "Multi-channel paid media",
      "Influencer & PR campaigns",
      "Editorial-grade creative production",
      "AI voice & SMS outreach",
      "Dedicated growth strategist",
    ],
  },
  {
    name: "Apex",
    tag: "Enterprise",
    price: "Bespoke",
    best: "Enterprises and category leaders operating the full ecosystem.",
    features: [
      "Custom SaaS / ERP build",
      "Full marketing operating system",
      "National / political-grade campaigns",
      "24/7 AI concierge & voice agents",
      "Executive dashboards & attribution",
      "Priority engineering & SLA",
    ],
  },
];

function PackagesPage() {
  return (
    <PageLayout
      title="Packages engineered around outcomes"
      subtitle="Four tiers, one ecosystem. Every package bundles marketing, technology and creative — priced against the result, not the deliverable."
    >
      <div className="mb-10 space-y-3 text-foreground/80">
        <p>
          Every Navora package includes strategy, execution and reporting from the same team.
          There are no per-hour fees, no surprise scope changes, and no separate line items for
          "creative" or "development" — the number you see is the number you pay, and it maps
          directly to the outcomes below.
        </p>
        <p>
          Not sure which tier fits? Most brands start on <strong>Momentum</strong> and graduate to
          <strong> Command</strong> within two quarters. If your revenue is already north of ₹25 Cr
          / $3M and you need a full operating team, <strong>Apex</strong> is designed for you.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {packages.map((p) => (
          <div
            key={p.name}
            className={`relative flex flex-col rounded-2xl border p-6 ${
              p.featured
                ? "border-amber-500/60 bg-amber-500/5 shadow-lg"
                : "border-border bg-background/40"
            }`}
          >
            {p.featured && (
              <span className="absolute -top-3 left-6 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-black">
                Most chosen
              </span>
            )}
            <div className="mb-1 text-xs uppercase tracking-widest text-foreground/60">
              {p.tag}
            </div>
            <h3 className="text-2xl font-semibold text-foreground">{p.name}</h3>
            <div className="mt-1 text-sm text-foreground/70">{p.price}</div>
            <p className="mt-3 text-sm text-foreground/75">{p.best}</p>
            <ul className="mt-5 space-y-2.5">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-foreground/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
            >
              Talk to us
            </Link>
          </div>
        ))}
      </div>

      <section className="mt-14">
        <h2 className="mb-4 text-2xl font-semibold text-foreground">What every package includes</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["Dedicated account lead", "One senior operator owns your relationship end to end — not a rotating pod."],
            ["Weekly stand-ups", "Every Monday. Agenda, decisions and next steps in writing."],
            ["Shared dashboard", "Live view of pipeline, spend, conversions and revenue — same numbers we see."],
            ["Monthly QBR", "What worked, what didn't, what we change next month — with the P&L."],
            ["WhatsApp access", "Real people, real fast. Not a ticket queue."],
            ["No lock-in", "Month-to-month after the first quarter. Stay because it's working, not because you signed."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-border bg-background/40 p-5">
              <div className="font-medium text-foreground">{t}</div>
              <p className="mt-1 text-sm text-foreground/70">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="mb-4 text-2xl font-semibold text-foreground">How pricing works</h2>
        <p className="text-foreground/80">
          Packages are quoted monthly and sized against the outcome we agree to hit — pipeline
          generated, revenue influenced, systems delivered. We share the working, not just the
          invoice. Custom builds (SaaS, ERP, mobile apps) are quoted separately after a two-week
          discovery sprint.
        </p>
      </section>

      <div className="mt-10 rounded-2xl border border-border bg-background/40 p-6 text-sm text-foreground/75">
        Not sure which fits? Send us your goals — we'll recommend a tier or build
        a hybrid package around your quarter.
      </div>
    </PageLayout>
  );
}
