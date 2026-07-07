import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Check } from "lucide-react";

export const Route = createFileRoute("/services/saas")({
  head: () => ({
    meta: [
      { title: "Software & AI — Navora Digital" },
      { name: "description", content: "Custom software, CRM & ERP systems, AI chatbots and workflow automation — the infrastructure behind the marketing." },
      { property: "og:title", content: "Software & AI — Navora Digital" },
      { property: "og:description", content: "The infrastructure your marketing runs on — engineered by the same team." },
    ],
  }),
  component: SaaSPage,
});

function SaaSPage() {
  return (
    <PageLayout
      title="Software & AI Infrastructure"
      subtitle="Custom software, CRM & ERP systems, AI chatbots and workflow automation — the infrastructure that turns campaigns into a business."
    >
      <div className="space-y-10">
        <section className="space-y-3 text-foreground/80">
          <p>
            Off-the-shelf SaaS gets you to $1M. Custom software is what gets you past it. When your
            workflow becomes your edge — how you route leads, how you price, how you fulfil, how
            you retain — a spreadsheet and a stack of subscriptions stops being enough.
          </p>
          <p>
            Navora builds the software layer that makes your business defensible: internal tools
            that eliminate manual work, customer-facing portals that increase retention, and
            AI-powered features that turn your product into a moat.
          </p>
        </section>

        <Section
          heading="What we build"
          items={[
            "Custom business software",
            "CRM & ERP modules",
            "Customer portals & dashboards",
            "Multi-tenant SaaS platforms",
            "Internal tools & admin panels",
            "APIs & third-party integrations",
            "Marketplace & booking platforms",
            "Data pipelines & warehouses",
            "Mobile apps (iOS + Android)",
          ]}
        />

        <Section
          heading="Built-in essentials"
          items={[
            "Authentication & roles",
            "Billing & subscriptions",
            "Analytics & reporting",
            "AI features & assistants",
            "Notification & workflow engine",
            "Enterprise-grade security",
            "Audit logs & compliance",
            "Backup & disaster recovery",
            "Observability & alerting",
          ]}
        />

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Our engineering stack</h2>
          <p className="text-foreground/80">
            We ship on TypeScript, React, Node, Postgres, Supabase, Cloudflare and the modern AI
            stack (OpenAI, Anthropic, Gemini, open-source models where they win). We optimise for
            two things: shipping speed and long-term maintainability — because the code we write
            today will still be running your business in five years.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-foreground">How a build works</h2>
          <ol className="grid gap-3 md:grid-cols-2">
            {[
              ["01 · Product discovery", "Two-week sprint mapping users, workflows, data model and success metrics. Ends with a clickable prototype and a fixed budget."],
              ["02 · MVP build", "6–10 weeks to a production system with the top 20% of features that drive 80% of the outcome. Live users, real feedback."],
              ["03 · Iterate & scale", "Monthly release cycles, roadmap owned jointly, performance and cost tuned as usage grows."],
              ["04 · Ongoing partnership", "We stay on as your product engineering team — no re-onboarding, no lost context, no rewrite."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-2xl border border-border bg-background/40 p-5">
                <div className="text-sm font-semibold text-amber-600 dark:text-amber-400">{t}</div>
                <p className="mt-1 text-sm text-foreground/75">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/contact" className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background">Book a Free Strategy Call</Link>
          <Link to="/portfolio" className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground">View Portfolio</Link>
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
