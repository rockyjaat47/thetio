import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Check } from "lucide-react";

export const Route = createFileRoute("/services/crm")({
  head: () => ({
    meta: [
      { title: "CRM Solutions — TEO Marketing" },
      { name: "description", content: "Manage customers, leads and sales pipelines in one place." },
    ],
  }),
  component: () => (
    <PageLayout
      title="Manage Customers More Efficiently"
      subtitle="CRM systems tailored to your sales process — not generic templates."
    >
      <Section
        heading="Features"
        items={[
          "Lead Tracking",
          "Customer Database",
          "Sales Pipelines",
          "Automation",
          "Reporting",
          "Integrations",
        ]}
      />
      <Section
        heading="Benefits"
        items={[
          "Faster Follow-ups",
          "Higher Close Rates",
          "Centralised Data",
          "Better Forecasting",
          "Reduced Manual Work",
          "Team Accountability",
        ]}
      />
      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/contact" className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background">Talk To Us</Link>
        <Link to="/portfolio" className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground">View Portfolio</Link>
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
