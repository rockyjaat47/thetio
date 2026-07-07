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
  component: AiAutomationPage,
});

function AiAutomationPage() {
  return (
    <PageLayout
      title="AI Agents & Mobile Engagement"
      subtitle="Conversational AI, WhatsApp Business, bulk SMS and AI voice outreach — engineered to capture, qualify and follow up with every lead, 24/7."
    >
      <div className="space-y-10">
        <section className="space-y-3 text-foreground/80">
          <p>
            The gap between a lead landing and a human replying is where 40% of revenue quietly
            disappears. By the time your sales team opens the inbox on Monday, the buyer has
            already spoken to three competitors. AI closes that gap without adding headcount — and
            without sounding like a form.
          </p>
          <p>
            We design and deploy conversational agents that actually book meetings, qualify budgets,
            answer product questions, hand off to humans at the right moment, and follow up
            relentlessly on WhatsApp, SMS and voice.
          </p>
        </section>

        <Section
          heading="What we deploy"
          items={[
            "AI chatbot on your website",
            "AI agent on WhatsApp Business",
            "Multi-step, adaptive conversations",
            "WhatsApp Business API",
            "Bulk SMS deployment",
            "AI voice calling for follow-ups",
            "Voice IVR & receptionist",
            "Automated appointment booking",
            "CRM & calendar handoff",
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

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-foreground">How an AI agent gets built</h2>
          <ol className="grid gap-3 md:grid-cols-2">
            {[
              ["01 · Conversation design", "We map every question a buyer actually asks, the answer that moves them forward, and the moment a human needs to take over."],
              ["02 · Knowledge base & tone", "Your product docs, pricing, policies and brand voice ingested into a retrieval layer so the agent never guesses."],
              ["03 · Integrations", "CRM, calendar, WhatsApp Business API, payment link, ticketing — wired end-to-end so the bot actually does the job."],
              ["04 · Guardrails & handoff", "Escalation rules, human-in-the-loop review, and monitoring so nothing embarrassing ships to a customer."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-2xl border border-border bg-background/40 p-5">
                <div className="text-sm font-semibold text-amber-600 dark:text-amber-400">{t}</div>
                <p className="mt-1 text-sm text-foreground/75">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Where it moves the needle</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Real estate", "Instant WhatsApp qualification of site-visit intent, budget and location — before an agent picks up the phone."],
              ["Healthcare & clinics", "Appointment booking, pre-consultation intake and reminders across WhatsApp and SMS."],
              ["Education", "Programme counselling, application status and fee reminders on the channel students actually check."],
              ["D2C & e-commerce", "Order tracking, returns, upsell and abandoned-cart recovery on WhatsApp — recovering 15–25% of lost revenue."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-2xl border border-border bg-background/40 p-5">
                <div className="font-medium text-foreground">{t}</div>
                <p className="mt-1 text-sm text-foreground/70">{d}</p>
              </div>
            ))}
          </div>
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
