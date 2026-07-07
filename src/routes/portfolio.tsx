import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { X } from "lucide-react";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Navora Digital" },
      { name: "description", content: "Projects that drive results — websites, platforms, CRM, AI and campaigns engineered by Navora Digital." },
      { property: "og:title", content: "Portfolio — Navora Digital" },
      { property: "og:description", content: "Selected work across software, AI, mobile and marketing." },
    ],
  }),
  component: PortfolioPage,
});

const categories = [
  "All",
  "Websites",
  "Landing Pages",
  "SaaS Platforms",
  "CRM Systems",
  "AI Solutions",
  "Marketing Campaigns",
] as const;

type Cat = (typeof categories)[number];

type Project = {
  title: string;
  category: Exclude<Cat, "All">;
  client: string;
  summary: string;
  result: string;
};

const projects: Project[] = [
  { title: "Skyline Realty Website", category: "Websites", client: "Real Estate", summary: "Lead-focused real estate website with WhatsApp inquiries.", result: "3.2x lead increase in 60 days." },
  { title: "MediCare Booking Landing", category: "Landing Pages", client: "Healthcare", summary: "High-converting landing page for clinic appointment booking.", result: "Conversion rate 11.4%." },
  { title: "EduFlow LMS", category: "SaaS Platforms", client: "Education", summary: "Subscription LMS with courses, payments and analytics.", result: "5,000+ active learners." },
  { title: "FoodHub CRM", category: "CRM Systems", client: "Restaurants", summary: "Multi-outlet CRM with loyalty, leads and sales pipeline.", result: "27% repeat order growth." },
  { title: "AskBot AI Agent", category: "AI Solutions", client: "Consulting", summary: "WhatsApp AI agent qualifying leads 24/7.", result: "70% support tickets automated." },
  { title: "GrowthAds Q4 Campaign", category: "Marketing Campaigns", client: "E-commerce", summary: "Meta + Google performance campaign with creative system.", result: "4.8x ROAS." },
  { title: "Consultly Portal", category: "SaaS Platforms", client: "Consultants", summary: "Client portal with bookings, invoices and chat.", result: "Saved 12 hrs/week per consultant." },
  { title: "LocalEats Microsite", category: "Websites", client: "Local Business", summary: "Premium microsite for a fine-dining brand.", result: "+58% reservations." },
];

function PortfolioPage() {
  const [active, setActive] = useState<Cat>("All");
  const [open, setOpen] = useState<Project | null>(null);

  const visible = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active],
  );

  return (
    <PageLayout title="Our Work" subtitle="Projects That Drive Results.">
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              active === c
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background/40 text-foreground/70 hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <button
            key={p.title}
            onClick={() => setOpen(p)}
            className="group text-left rounded-2xl border border-border bg-background/40 p-5 transition-transform hover:scale-[1.01]"
          >
            <div className="mb-3 aspect-video rounded-xl bg-gradient-to-br from-foreground/10 to-amber-500/20" />
            <div className="text-[11px] uppercase tracking-wide text-amber-600 dark:text-amber-400">{p.category}</div>
            <h3 className="mt-1 font-medium text-foreground">{p.title}</h3>
            <p className="mt-1 text-sm text-foreground/60">{p.client}</p>
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur"
          onClick={() => setOpen(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-2xl"
          >
            <button
              onClick={() => setOpen(null)}
              className="absolute right-4 top-4 rounded-full p-1.5 hover:bg-accent"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="aspect-video rounded-xl bg-gradient-to-br from-foreground/10 to-amber-500/20" />
            <div className="mt-4 text-[11px] uppercase tracking-wide text-amber-600 dark:text-amber-400">{open.category}</div>
            <h3 className="mt-1 text-xl font-semibold">{open.title}</h3>
            <p className="mt-1 text-sm text-foreground/60">Client industry: {open.client}</p>
            <p className="mt-4 text-foreground/80">{open.summary}</p>
            <div className="mt-4 rounded-xl bg-amber-500/10 p-3 text-sm font-medium text-amber-700 dark:text-amber-300">
              Result: {open.result}
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
