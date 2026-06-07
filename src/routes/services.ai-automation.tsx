import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Check } from "lucide-react";

export const Route = createFileRoute("/services/ai-automation")({
  head: () => ({
    meta: [
      { title: "AI Agents & Automation — TEO Marketing" },
      { name: "description", content: "Automate your business with AI agents, chatbots and workflow automation." },
    ],
  }),
  component: () => (
    <PageLayout
      title="Automate With Artificial Intelligence"
      subtitle="Deploy AI agents that qualify leads, support customers and run your workflows 24/7."
    >
      <Section
        heading="Solutions we deliver"
        items={[
          "AI Chatbots",
          "WhatsApp Automation",
          "Lead Qualification",
          "Appointment Booking",
          "Customer Support Automation",
          "Internal Workflow Automation",
        ]}
      />
      <Section
        heading="Why automate"
        items={[
          "24/7 Response Time",
          "Lower Operational Cost",
          "Higher Conversions",
          "Consistent Customer Experience",
          "Free Up Your Team",
          "Scale Without Hiring",
        ]}
      />
      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/contact" className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background">Get Free Consultation</Link>
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
