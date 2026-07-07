import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Check } from "lucide-react";

export const Route = createFileRoute("/partner/influencer")({
  head: () => ({
    meta: [
      { title: "Partner as Influencer — Navora Digital" },
      { name: "description", content: "Recommend Navora Digital to your audience and earn long-term revenue on every project." },
      { property: "og:title", content: "Partner as Influencer — Navora Digital" },
      { property: "og:description", content: "Long-term revenue share for creators and consultants." },
    ],
  }),
  component: () => (
    <PageLayout
      title="Become a Navora Digital Partner"
      subtitle="Recommend us to your audience and earn long-term revenue on every project we deliver."
    >
      <Section
        heading="Benefits"
        items={[
          "Referral Commission",
          "Exclusive Offers",
          "Long-Term Partnership",
          "Performance Bonuses",
        ]}
      />
      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/contact" className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background">Apply Now</Link>
      </div>
    </PageLayout>
  ),
});

function Section({ heading, items }: { heading: string; items: string[] }) {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-2xl font-semibold text-foreground">{heading}</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
