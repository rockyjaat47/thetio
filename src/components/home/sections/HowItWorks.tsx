import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    t: "Discover",
    d: "Free consultation call to understand your business, goals and target audience.",
  },
  {
    n: "02",
    t: "Design & Build",
    d: "Our team designs, develops and reviews with you in fast weekly sprints.",
  },
  {
    n: "03",
    t: "Launch & Grow",
    d: "Go-live, performance marketing, automation and ongoing optimisation.",
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
            From idea to launch in weeks
          </h2>
          <p className="mt-4 text-foreground/65">
            A simple, transparent process designed to remove friction and deliver
            measurable business outcomes.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
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

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-foreground/10 bg-background p-8">
            <div className="text-4xl font-semibold text-amber-600 dark:text-amber-400">100%</div>
            <p className="mt-1 text-sm text-foreground/65">
              Transparent pricing, fixed timelines — no surprises, ever.
            </p>
          </div>
          <div className="rounded-3xl border border-foreground/10 bg-background p-8">
            <div className="text-4xl font-semibold text-amber-600 dark:text-amber-400">24 hrs</div>
            <p className="mt-1 text-sm text-foreground/65">
              From inquiry to first response — guaranteed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
