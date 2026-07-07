import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Check } from "lucide-react";

export const Route = createFileRoute("/services/web-development")({
  head: () => ({
    meta: [
      { title: "Websites & Web Platforms — Navora Digital" },
      { name: "description", content: "Custom websites and web platforms engineered to convert. Built by the same team that runs your marketing and automation." },
      { property: "og:title", content: "Websites & Web Platforms — Navora Digital" },
      { property: "og:description", content: "Websites that are the platform your marketing runs on — not a static brochure." },
    ],
  }),
  component: WebPage,
});

function WebPage() {
  return (
    <PageLayout
      title="Websites That Are Actually the Platform"
      subtitle="Not a brochure. The engine your marketing, automation and CRM plug into — built by the same team running the demand."
    >
      <div className="space-y-10">
        <section className="space-y-3 text-foreground/80">
          <p>
            A website used to be a business card. In 2026, it's the single most important piece of
            infrastructure your company owns — the place ads land, chatbots live, payments happen,
            SEO compounds and every customer forms their first opinion of you inside three seconds.
          </p>
          <p>
            We build websites and web platforms with performance, conversion and search visibility
            engineered in from day one — not bolted on after launch by a different vendor who
            doesn't understand what you're trying to sell.
          </p>
        </section>

        <Block
          heading="What we build"
          items={[
            "Corporate & marketing sites",
            "High-intent landing pages",
            "Web platforms & portals",
            "E-commerce storefronts",
            "Custom web applications",
            "Multi-brand microsites",
            "Booking & reservation systems",
            "Membership & subscription sites",
            "Progressive web apps",
          ]}
        />

        <Block
          heading="Engineered in"
          items={[
            "Conversion-tuned UX",
            "Blazing-fast performance (sub-second LCP)",
            "On-page SEO foundation",
            "Structured data & schema",
            "CRM & lead-routing hooks",
            "Analytics & event tracking",
            "AI chat & WhatsApp handoff",
            "Accessibility (WCAG AA)",
            "Global CDN & edge delivery",
          ]}
        />

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-foreground">The 30-day launch</h2>
          <ol className="grid gap-3 md:grid-cols-2">
            {[
              ["Week 1 · Discovery & IA", "Positioning workshop, sitemap, wireframes and content plan agreed."],
              ["Week 2 · Design", "High-fidelity design of every template, reviewed against real content."],
              ["Week 3 · Build", "Front-end and CMS implementation, integrations wired, tracking installed."],
              ["Week 4 · Launch & tune", "QA, performance pass, SEO checklist, go-live and post-launch iteration."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-2xl border border-border bg-background/40 p-5">
                <div className="text-sm font-semibold text-amber-600 dark:text-amber-400">{t}</div>
                <p className="mt-1 text-sm text-foreground/75">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Beyond launch</h2>
          <p className="text-foreground/80">
            A website is never done. Our retainer clients get monthly conversion-rate optimisation,
            new landing pages for every campaign, ongoing SEO/GEO work, and a real engineer on
            WhatsApp when something breaks — not a support-ticket queue.
          </p>
        </section>

        <CTA />
      </div>
    </PageLayout>
  );
}

function Block({ heading, items }: { heading: string; items: string[] }) {
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

function CTA() {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <Link to="/contact" className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background">
        Book a Free Strategy Call
      </Link>
      <Link to="/portfolio" className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground">
        See Recent Work
      </Link>
    </div>
  );
}
