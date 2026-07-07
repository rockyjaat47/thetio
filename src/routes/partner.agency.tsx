import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Check } from "lucide-react";

export const Route = createFileRoute("/partner/agency")({
  head: () => ({
    meta: [
      { title: "Partner as Agency — Navora Digital" },
      { name: "description", content: "White-label Navora Digital's software, AI and creative team to expand what your agency can deliver — without expanding your payroll." },
      { property: "og:title", content: "Partner as Agency — Navora Digital" },
      { property: "og:description", content: "White-label engineering, AI and creative for agencies ready to grow." },
    ],
  }),
  component: () => (
    <PageLayout
      title="Partner With Navora Digital"
      subtitle="White-label our engineering, AI and creative team to expand what your agency can deliver — without expanding your payroll."
    >
      <Section
        heading="Who it's for"
        items={["Marketing Agencies", "Design Agencies", "Freelancers", "Consultants"]}
      />
      <Section
        heading="Benefits"
        items={["White Label Services", "Revenue Sharing", "Dedicated Support", "Priority Delivery"]}
      />
      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/contact" className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background">Become A Partner</Link>
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
