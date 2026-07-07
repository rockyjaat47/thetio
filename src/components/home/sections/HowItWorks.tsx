import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    t: "Understand the Business",
    d: "We start with your numbers, not a mood board — margins, sales cycle, and what a qualified lead is worth to you.",
  },
  {
    n: "02",
    t: "Build the Plan",
    d: "A written roadmap covering channels, priorities, timelines and the systems needed to run it.",
  },
  {
    n: "03",
    t: "Execute Without Handoffs",
    d: "The same team plans, builds and ships the campaign, the platform and the content.",
  },
  {
    n: "04",
    t: "Report, Then Improve",
    d: "A monthly review showing what worked, what didn't, and exactly what changes next.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-card py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
            How we work
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            One team. Four steps. No handoffs.
          </h2>
          <p className="mt-4 text-foreground/65">
            A transparent process built to remove friction and deliver measurable business outcomes.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-background p-8"
            >
              <div className="text-6xl font-semibold text-amber-500/20">{s.n}</div>
              <h3 className="mt-4 text-xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-foreground/65">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
