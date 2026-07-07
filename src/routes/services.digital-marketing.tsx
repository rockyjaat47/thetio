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
  component: () => (
    <PageLayout
      title="The Demand Engine, Engineered"
      subtitle="SEO, GEO & AEO, paid media, social, influencer and political campaigns — planned by the same team that builds the platform they run on."
    >
      <Section
        heading="Channels we run"
        items={[
          "SEO (technical + on-page + content)",
          "GEO & AEO (AI search optimisation)",
          "Google Ads (Search, Display, PMax)",
          "Meta Ads (Instagram & Facebook)",
          "LinkedIn Ads",
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
          "Monthly review + roadmap forward",
        ]}
      />
      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/contact" className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background">Get a Free Growth Audit</Link>
        <Link to="/portfolio" className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground">See Campaigns</Link>
      </div>
    </PageLayout>
  ),
});

function Section({ heading, items }: { heading: string; items: string[] }) {
  return (
    <section className="mb-8">
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
