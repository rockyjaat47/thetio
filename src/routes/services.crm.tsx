import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Check } from "lucide-react";

export const Route = createFileRoute("/services/crm")({
  head: () => ({
    meta: [
      { title: "CRM & Workflow Automation — Navora Digital" },
      { name: "description", content: "Automated lead routing, centralised CRM and workflow automation across your business systems." },
      { property: "og:title", content: "CRM & Workflow Automation — Navora Digital" },
      { property: "og:description", content: "Turn every lead into a tracked, followed-up, closable opportunity." },
    ],
  }),
  component: () => (
    <PageLayout
      title="CRM & Workflow Automation"
      subtitle="Every lead tracked. Every follow-up on time. Every workflow connected to the systems your team already uses."
    >
      <Section
        heading="What we set up"
        items={[
          "Centralised CRM architecture",
          "Automated lead routing",
          "Sales pipeline & stages",
          "Follow-up & nurture flows",
          "Reporting & dashboards",
          "System-to-system automation",
        ]}
      />
      <Section
        heading="What it means for you"
        items={[
          "Faster response, higher close rate",
          "No lead falls through the cracks",
          "Centralised, searchable customer data",
          "Better forecasting & visibility",
          "Less manual work for your team",
          "Real accountability, month over month",
        ]}
      />
      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/contact" className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background">Talk to Us</Link>
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
