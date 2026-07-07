import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const before = [
  "Five vendors who never talk to each other",
  "The agency doesn't understand the product",
  "The developer doesn't understand the campaign",
  "Budget spent before anyone agrees what happened",
];
const after = [
  "One team architects the strategy end-to-end",
  "Builds the platform your campaigns run on",
  "Engineers automation that follows up every lead",
  "One contract. One report. One accountable team.",
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
          Why growth usually stalls
        </motion.h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-foreground/65">
          It's rarely the marketing that fails. It's the handoffs. Navora Digital removes them —
          strategy, platform, automation and content, engineered as a single accountable system.
        </p>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Card title="The five-vendor problem" tone="danger" items={before} />
          <Card title="The Navora model" tone="success" items={after} />
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { v: "4", l: "Disciplines under one roof" },
            { v: "1", l: "Contract, one point of contact" },
            { v: "1", l: "Monthly report that matters" },
            { v: "24/7", l: "Strategic support" },
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
