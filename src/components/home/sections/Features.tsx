import { motion } from "framer-motion";
import {
  Bot,
  Code2,
  LineChart,
  Megaphone,
  PieChart,
  Workflow,
} from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Web Development",
    desc: "High-performance marketing sites and product UIs, built modern.",
    tag: "Next.js · TanStack · Tailwind",
  },
  {
    icon: Workflow,
    title: "SaaS Products",
    desc: "From wireframe to revenue — design, engineering, and go-to-market.",
    tag: "Full-stack",
  },
  {
    icon: PieChart,
    title: "CRM Systems",
    desc: "Custom CRMs that fit your pipeline — not the other way around.",
    tag: "Sales & Ops",
  },
  {
    icon: Bot,
    title: "AI Agent & Automation",
    desc: "Internal agents that handle support, ops and lead routing 24/7.",
    tag: "LLM workflows",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    desc: "Performance creative, paid, SEO and lifecycle that compounds.",
    tag: "Growth",
  },
  {
    icon: LineChart,
    title: "Analytics & Insights",
    desc: "One dashboard for everything — see what's working and what's not.",
    tag: "Reporting",
  },
];

export function Features() {
  return (
    <section className="bg-card py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/70">
            Core services
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            Everything you need to ship and scale
          </h2>
          <p className="mt-4 text-foreground/65">
            One team for product, engineering, AI and marketing — so nothing falls
            between the cracks.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-3xl border border-foreground/10 bg-background p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-blue-500/15 to-emerald-500/5 blur-2xl transition-opacity group-hover:opacity-80" />
              <div className="relative">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-foreground text-background">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-foreground/65">{f.desc}</p>
                <div className="mt-5 inline-flex rounded-full bg-foreground/5 px-2.5 py-1 text-[11px] font-medium text-foreground/70">
                  {f.tag}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
