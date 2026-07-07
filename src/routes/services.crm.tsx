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
  component: CrmPage,
});

function CrmPage() {
  return (
    <PageLayout
      title="CRM & Workflow Automation"
      subtitle="Every lead tracked. Every follow-up on time. Every workflow connected to the systems your team already uses."
    >
      <div className="space-y-10">
        <section className="space-y-3 text-foreground/80">
          <p>
            The best marketing team in the world can't save a business with a broken CRM. Leads
            land in five different inboxes, sales reps forget to follow up, the founder ends up
            chasing WhatsApp threads at midnight, and the reports at the end of the month don't
            match the bank account.
          </p>
          <p>
            We architect the CRM and automation layer that quietly runs underneath everything —
            capturing every lead the moment it lands, routing it to the right person, firing the
            right follow-up on the right channel, and reporting the truth back to you every Monday.
          </p>
        </section>

        <Section
          heading="What we set up"
          items={[
            "Centralised CRM architecture",
            "Automated lead routing",
            "Sales pipeline & stages",
            "Follow-up & nurture flows",
            "WhatsApp & SMS automation",
            "Email sequences & drip campaigns",
            "Reporting & dashboards",
            "System-to-system automation",
            "Payment & invoicing workflows",
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

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Platforms we work in</h2>
          <p className="text-foreground/80">
            HubSpot, Zoho, Salesforce, Pipedrive, GoHighLevel, custom Postgres/Supabase back-ends —
            we're platform-agnostic. We recommend based on your team's actual workflow, not a
            partner commission.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-foreground">A typical lead journey we build</h2>
          <ol className="grid gap-3 md:grid-cols-2">
            {[
              ["00:00 · Lead lands", "Form, WhatsApp, ad click, phone call or walk-in — captured into one CRM record with source, campaign and UTM intact."],
              ["00:02 · Auto-qualified", "AI agent or scoring rule tags intent, budget and urgency, then routes to the right rep or team."],
              ["00:05 · First touch", "Instant WhatsApp / SMS / email acknowledgement so the buyer knows they've been seen."],
              ["Day 1–7 · Nurture", "Sequenced follow-ups across channels until the lead books, replies or opts out."],
              ["Ongoing · Reporting", "Every touch logged, every stage timestamped, every conversion attributed."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-2xl border border-border bg-background/40 p-5">
                <div className="text-sm font-semibold text-amber-600 dark:text-amber-400">{t}</div>
                <p className="mt-1 text-sm text-foreground/75">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/contact" className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background">Talk to Us</Link>
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
