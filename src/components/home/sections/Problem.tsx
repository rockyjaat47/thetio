import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const before = [
  "Working with 5+ vendors who never talk to each other",
  "Slow websites that don't generate leads",
  "Manual follow-ups eating your team's day",
  "Marketing spend with no measurable ROI",
];
const after = [
  "One agency owning your entire digital growth",
  "Premium websites engineered for conversions",
  "AI automations that respond 24/7",
  "Campaigns measured against real revenue",
];

export function Problem() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center text-3xl font-semibold tracking-tight sm:text-5xl"
        >
          Why businesses choose TEO Marketing
        </motion.h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-foreground/65">
          Stop stitching together freelancers and tools. Get one accountable agency
          that builds, brands and grows your business end-to-end.
        </p>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Card title="Without TEO" tone="danger" items={before} />
          <Card title="With TEO" tone="success" items={after} />
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { v: "200+", l: "Projects delivered" },
            { v: "150+", l: "Businesses served" },
            { v: "4.9★", l: "Client satisfaction" },
            { v: "24/7", l: "Support availability" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border border-foreground/10 bg-card p-5 text-center">
              <div className="text-3xl font-semibold tracking-tight text-amber-600 dark:text-amber-400">{s.v}</div>
              <div className="mt-1 text-xs text-foreground/60">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({
  title,
  tone,
  items,
}: {
  title: string;
  tone: "danger" | "success";
  items: string[];
}) {
  const Icon = tone === "danger" ? AlertCircle : CheckCircle2;
  const color =
    tone === "danger" ? "text-red-500 bg-red-500/10" : "text-emerald-500 bg-emerald-500/10";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl border border-foreground/10 bg-card p-8 shadow-sm"
    >
      <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${color}`}>
        <Icon className="h-3.5 w-3.5" />
        <span>{title}</span>
      </div>
      <ul className="mt-5 space-y-3">
        {items.map((t) => (
          <li key={t} className="flex items-start gap-3 text-foreground/80">
            <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${tone === "danger" ? "bg-red-500" : "bg-emerald-500"}`} />
            <span className="text-sm sm:text-base">{t}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
