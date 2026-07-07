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
  component: () => (
    <PageLayout
      title="Websites That Are Actually the Platform"
      subtitle="Not a brochure. The engine your marketing, automation and CRM plug into — built by the same team running the demand."
    >
      <Block
        heading="What we build"
        items={[
          "Corporate & marketing sites",
          "High-intent landing pages",
          "Web platforms & portals",
          "E-commerce storefronts",
          "Custom web applications",
          "Multi-brand microsites",
        ]}
      />
      <Block
        heading="Engineered in"
        items={[
          "Conversion-tuned UX",
          "Blazing-fast performance",
          "On-page SEO foundation",
          "CRM & lead-routing hooks",
          "Analytics & event tracking",
          "AI chat & WhatsApp handoff",
        ]}
      />
      <CTA />
    </PageLayout>
  ),
});

function Block({ heading, items }: { heading: string; items: string[] }) {
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
