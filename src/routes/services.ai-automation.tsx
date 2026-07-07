import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Check } from "lucide-react";

export const Route = createFileRoute("/services/ai-automation")({
  head: () => ({
    meta: [
      { title: "AI, Chatbots & Mobile Engagement — Navora Digital" },
      { name: "description", content: "AI chatbots on web and WhatsApp, workflow automation, bulk SMS and AI voice outreach — channels that reach customers directly." },
      { property: "og:title", content: "AI, Chatbots & Mobile Engagement — Navora Digital" },
      { property: "og:description", content: "Channels that reach a customer directly, not through a feed algorithm." },
    ],
  }),
  component: () => (
    <PageLayout
      title="AI Agents & Mobile Engagement"
      subtitle="Conversational AI, WhatsApp Business, bulk SMS and AI voice outreach — engineered to capture, qualify and follow up with every lead, 24/7."
    >
      <Section
        heading="What we deploy"
        items={[
          "AI chatbot on your website",
          "AI agent on WhatsApp Business",
          "Multi-step, adaptive conversations",
          "WhatsApp Business API",
          "Bulk SMS deployment",
          "AI voice calling for follow-ups",
        ]}
      />
      <Section
        heading="Outcomes we engineer"
        items={[
          "24/7 lead capture & qualification",
          "Instant WhatsApp response times",
          "Automated appointment booking",
          "Frictionless customer support",
          "Higher conversion at every step",
          "Scale without hiring proportionally",
        ]}
      />
      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/contact" className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background">Book a Free Strategy Call</Link>
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
