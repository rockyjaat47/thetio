import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Check } from "lucide-react";

export const Route = createFileRoute("/services/digital-marketing")({
  head: () => ({
    meta: [
      { title: "Digital Marketing — Navora Digital" },
      { name: "description", content: "SEO, GEO & AEO, Google & Meta Ads, social, influencer and political campaigns. The demand engine, engineered." },
      { property: "og:title", content: "Digital Marketing — Navora Digital" },
      { property: "og:description", content: "The demand engine behind the ecosystem — measured against revenue, not vanity metrics." },
    ],
  }),
  component: DigitalMarketingPage,
});

function DigitalMarketingPage() {
  return (
    <PageLayout
      title="The Demand Engine, Engineered"
      subtitle="SEO, GEO & AEO, paid media, social, influencer and political campaigns — planned by the same team that builds the platform they run on."
    >
      <div className="space-y-10">
        <section className="space-y-3 text-foreground/80">
          <p>
            Most marketing budgets don't fail because the channels are wrong — they fail because
            nobody owns the whole loop. The ad points at a landing page nobody optimised. The
            landing page dumps into a CRM nobody automated. The lead sits in an inbox nobody
            watches. Every handoff is a leak, and every leak is compounding.
          </p>
          <p>
            Navora Digital runs your demand engine as one loop. The same team that plans the
            campaign writes the copy, builds the page, wires the CRM, sets up the WhatsApp bot and
            reports the number at the end of the month. One roadmap. One P&amp;L. One point of
            accountability.
          </p>
        </section>

        <Section
          heading="Channels we run"
          items={[
            "SEO (technical + on-page + content)",
            "GEO & AEO (AI search optimisation)",
            "Google Ads (Search, Display, PMax)",
            "Meta Ads (Instagram & Facebook)",
            "LinkedIn Ads",
            "YouTube & video ads",
            "Social Media Management",
            "Influencer Marketing",
            "Political Digital Campaigns",
          ]}
        />

        <Section
          heading="What you get"
          items={[
            "Strategy rooted in unit economics",
            "Editorial-grade creative production",
            "Landing pages that actually convert",
            "CRM & automation for every lead",
            "Full tracking & attribution",
            "Weekly stand-ups + monthly QBRs",
            "Shared reporting dashboard",
            "Dedicated growth strategist",
          ]}
        />

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Our operating rhythm</h2>
          <ol className="grid gap-3 md:grid-cols-2">
            {[
              ["Week 1 · Audit & baseline", "We map your funnel end-to-end — spend, sources, conversion rates, CAC, LTV — and identify the three biggest leaks."],
              ["Week 2 · Roadmap & creative kickoff", "Channel mix, budget allocation, creative brief and landing-page architecture agreed and locked."],
              ["Week 3–4 · Launch", "Campaigns live, tracking verified, CRM automations firing, WhatsApp handoff tested end-to-end."],
              ["Monthly · Review & resequence", "What worked, what didn't, what we change next month — with the P&L, not just impressions."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-2xl border border-border bg-background/40 p-5">
                <div className="text-sm font-semibold text-amber-600 dark:text-amber-400">{t}</div>
                <p className="mt-1 text-sm text-foreground/75">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-foreground">GEO &amp; AEO: the new front page</h2>
          <p className="text-foreground/80">
            Google's AI Overviews, ChatGPT, Perplexity and Gemini are quietly becoming the first
            answer your customer sees. Ranking on page one is no longer enough — you have to be the
            answer the AI cites. We rebuild your content, schema and entity graph so your brand
            shows up inside generative answers, not just below them.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Frequently asked</h2>
          <div className="space-y-3">
            {[
              ["How fast do results show up?", "Paid channels typically produce measurable pipeline in 2–4 weeks. SEO and GEO compound over 3–6 months. We report weekly so you never wait a quarter to know if it's working."],
              ["Do you work on retainer or project?", "Retainers are our default — marketing is a system, not a one-off. We also take on fixed-scope launches (rebrands, product releases, political cycles) when the timing calls for it."],
              ["Will you work with our existing team?", "Yes. We plug in as the missing layer — often the strategy, creative or engineering layer your in-house team doesn't have yet."],
            ].map(([q, a]) => (
              <details key={q} className="group rounded-2xl border border-border bg-background/40 p-5">
                <summary className="cursor-pointer text-sm font-medium text-foreground">{q}</summary>
                <p className="mt-2 text-sm text-foreground/75">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/contact" className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background">Get a Free Growth Audit</Link>
          <Link to="/portfolio" className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground">See Campaigns</Link>
        </div>
      </div>
    </PageLayout>
  );
}

function Section({ heading, items }: { heading: string; items: string[] }) {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold text-foreground">{heading}</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-background/40 p-4">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <Check className="h-4 w-4" />
            </span>
            <span className="text-sm font-medium text-foreground">{i}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
