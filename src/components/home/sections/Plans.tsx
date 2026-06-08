import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const plans = [
  {
    name: "Professional Business Website",
    tagline: "Get a modern, fast & responsive website for your business",
    price: "₹7,999",
    period: "only",
    badge: "Delivered in 4 days",
    features: [
      "Up to 5 pages website",
      "Mobile responsive design",
      "WhatsApp integration",
      "Contact form",
      "Google Maps integration",
      "Social media integration",
      "Basic SEO setup",
      "Free .in domain (1 year)",
      "Free hosting (1 year)",
      "SSL security certificate",
      "2 free revisions",
    ],
    cta: "Start small",
    href: "/contact",
    highlighted: false,
  },
  {
    name: "Business Growth Website",
    tagline: "A powerful website that brings leads & grows your business",
    price: "₹14,999",
    period: "only",
    badge: "Delivered in 5 days",
    features: [
      "Up to 10 pages website",
      "Lead generation forms",
      "Google Analytics setup",
      "Meta Pixel integration",
      "Advanced SEO setup",
      "Speed optimization",
      "WhatsApp automation",
      "Free domain (.in) & hosting (1 year)",
      "Conversion optimized & secure",
      "Mobile friendly",
      "30 days support",
      "Bonus: free business email setup",
    ],
    cta: "Grow with us",
    href: "/contact",
    highlighted: true,
  },
  {
    name: "Premium Business Website",
    tagline: "Powerful. Custom. Scalable. Built for your business growth",
    price: "₹24,999",
    period: "onwards",
    badge: "Delivered in 7–15 days",
    features: [
      "Fully custom website design",
      "Unlimited pages + advanced UI/UX",
      "Booking & appointment system",
      "Payment gateway integration",
      "CRM & dashboard integration",
      "API & email automation setup",
      "Advanced security & performance",
      "SEO & speed optimized",
      "Member / client dashboard",
      "Priority support — 90 days free",
      "Free domain (.in) & hosting (1 year)",
      "Bonus: business email, SEO audit, Analytics & Search Console",
    ],
    cta: "Talk to us",
    href: "/contact",
    highlighted: false,
  },
];

export function Plans() {
  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-amber-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-amber-600/10 blur-3xl" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
            <Sparkles className="h-3.5 w-3.5" /> Web Development Plans
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            Pricing built around your <span className="italic text-amber-600 dark:text-amber-400">growth stage</span>
          </h2>
          <p className="mt-4 text-foreground/65">
            Transparent, fixed-scope packages — no hidden fees, no agency runaround.
            Pick what fits today, scale up whenever you're ready.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
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
              <p className={`mt-1.5 text-sm ${p.highlighted ? "text-white/65" : "text-foreground/60"}`}>
                {p.tagline}
              </p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-semibold tracking-tight">{p.price}</span>
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
                  p.highlighted
                    ? "bg-amber-500 text-black"
                    : "bg-foreground text-background"
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
          Need something custom? <Link to="/contact" className="underline underline-offset-4 hover:text-foreground">Tell us about your project</Link> and we'll tailor a plan.
        </p>
      </div>
    </section>
  );
}
