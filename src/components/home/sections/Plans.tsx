import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const plans = [
  {
    name: "Navora Ignite",
    tagline: "Presence, orchestrated.",
    price: "₹23,999",
    period: "/ month",
    badge: "Best for first digital footprint",
    features: [
      "8 bespoke, platform-tailored creatives / month",
      "Strategy across 2 platforms",
      "Editorial-grade copywriting & captioning",
      "Full presence: Instagram, Facebook, LinkedIn, YouTube, GBP, Pinterest",
      "Profile optimisation & visual identity consistency",
      "Monthly content cadence calendar",
      "Meta Ads, Google Ads (Search & Display), LinkedIn Ads execution",
      "WhatsApp concierge line, business hours",
    ],
    cta: "Get Started",
    href: "/contact",
    highlighted: false,
  },
  {
    name: "Navora Momentum",
    tagline: "Where intelligence enters the equation.",
    price: "₹47,999",
    period: "/ month",
    badge: "AI & automation begins here",
    features: [
      "Everything in Ignite",
      "12 bespoke creatives / month",
      "Strategy across all platforms",
      "Content calendar & Google Business Profile optimisation",
      "On-page SEO recommendations",
      "Proprietary AI chatbot on web + WhatsApp",
      "Automated lead routing into centralised CRM",
      "Priority WhatsApp & email concierge",
    ],
    cta: "Get Started",
    href: "/contact",
    highlighted: true,
  },
  {
    name: "Navora Command",
    tagline: "Full command of your digital ecosystem.",
    price: "₹69,999",
    period: "/ month",
    badge: "Signature tier",
    features: [
      "Everything in Momentum",
      "16 bespoke creatives / month",
      "1 promotional campaign creative set / month",
      "1 professionally edited reel / month",
      "Multi-step, adaptive conversational AI",
      "Workflow automation across 2 integrated systems",
      "Bulk SMS deployment",
      "Pilot AI voice outreach for follow-ups",
      "Priority support, expedited turnaround",
    ],
    cta: "Get Started",
    href: "/contact",
    highlighted: false,
  },
  {
    name: "Navora Apex",
    tagline: "The entire ecosystem, engineered around you.",
    price: "Custom",
    period: "quote",
    badge: "Enterprise-grade",
    features: [
      "Everything in Command",
      "Full-scale SEO, GEO & AEO",
      "Complete social & paid media across every major platform",
      "Weekly video and editorial content",
      "Bespoke software or ERP module built to your operations",
      "Advanced AI with full CRM/ERP integration",
      "Omnichannel mobile: WhatsApp, Bulk SMS & AI voice at scale",
      "Dedicated account director & 24/7 concierge",
      "Custom BI dashboard & reporting",
    ],
    cta: "Talk to Us",
    href: "/contact",
    highlighted: false,
  },
];

export function Plans() {
  return (
    <section id="packages" className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-amber-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-amber-600/10 blur-3xl" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
            <Sparkles className="h-3.5 w-3.5" /> Packages
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            Four tiers. One ecosystem.{" "}
            <span className="italic text-amber-600 dark:text-amber-400">Ascend at your own pace.</span>
          </h2>
          <p className="mt-4 text-foreground/65">
            Every plan is precision-built for a distinct stage of growth. Intelligence, automation
            and infrastructure scale progressively — Software & AI enter from Momentum onward.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className={`relative flex flex-col rounded-3xl border p-7 transition-all hover:-translate-y-1 ${
                p.highlighted
                  ? "border-amber-500/40 bg-gradient-to-br from-[#111] via-[#1a1505] to-[#2a1f0a] text-white shadow-[0_30px_80px_-30px_rgba(245,158,11,0.55)]"
                  : "border-foreground/10 bg-card text-card-foreground shadow-sm hover:shadow-xl"
              }`}
            >
              {p.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="rounded-full bg-amber-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-black">
                    {p.badge}
                  </div>
                </div>
              )}

              <div className={`text-xs font-medium uppercase tracking-wider ${p.highlighted ? "text-amber-300" : "text-foreground/50"}`}>
                {p.highlighted ? "" : p.badge}
              </div>

              <h3 className="mt-2 text-2xl font-semibold">{p.name}</h3>
              <p className={`mt-1.5 text-sm italic ${p.highlighted ? "text-white/70" : "text-foreground/60"}`}>
                {p.tagline}
              </p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-3xl font-semibold tracking-tight">{p.price}</span>
                <span className={`text-xs ${p.highlighted ? "text-white/55" : "text-foreground/50"}`}>
                  {p.period}
                </span>
              </div>

              <ul className="mt-6 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span
                      className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full ${
                        p.highlighted ? "bg-amber-500/20 text-amber-300" : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      <Check className="h-3 w-3" />
                    </span>
                    <span className={p.highlighted ? "text-white/85" : "text-foreground/80"}>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex-1" />

              <Link
                to={p.href}
                className={`group inline-flex items-center justify-center gap-2 rounded-full py-2.5 pl-5 pr-2 text-sm font-medium transition-transform hover:scale-[1.02] ${
                  p.highlighted ? "bg-amber-500 text-black" : "bg-foreground text-background"
                }`}
              >
                {p.cta}
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full ${
                    p.highlighted ? "bg-black text-amber-400" : "bg-amber-500 text-background"
                  }`}
                >
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-foreground/55">
          All plans priced per month, exclusive of taxes. Month-to-month with a 3-month minimum term.
          Annual contracts include a 10% discount.
        </p>
      </div>
    </section>
  );
}
