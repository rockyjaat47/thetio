import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const before = [
  "Marketing, product and dev all live in different silos",
  "Decisions based on gut feeling, not data",
  "Slow shipping cycles — months to launch anything",
  "Manual ops eating into your team's focus",
];
const after = [
  "One studio, one roadmap, one accountable team",
  "Dashboards that surface what actually matters",
  "Production in weeks, not quarters",
  "AI agents that automate the busywork",
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
          Smarter decisions start with a clearer build.
        </motion.h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-foreground/65">
          Most teams juggle five vendors and ten dashboards. We collapse the stack into
          one outcome-driven studio.
        </p>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Card title="Before +co" tone="danger" items={before} />
          <Card title="After +co" tone="success" items={after} />
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { v: "+212%", l: "Avg. revenue lift" },
            { v: "3.4x", l: "Faster shipping" },
            { v: "68%", l: "Less manual ops" },
            { v: "21d", l: "Average launch" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border border-foreground/10 bg-card p-5 text-center">
              <div className="text-3xl font-semibold tracking-tight">{s.v}</div>
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
        <Icon className="h-3.5 w-3.5" /> {title}
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
