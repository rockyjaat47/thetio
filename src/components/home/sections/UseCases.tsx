import { motion } from "framer-motion";

const cases = [
  {
    t: "Founders & Startups",
    d: "Go from idea to launched product with one accountable studio behind you.",
    s: "+32% faster GTM",
    g: "from-blue-500 to-violet-600",
  },
  {
    t: "Growth-stage SaaS",
    d: "Modernise your product surface, automate ops, and unlock the next S-curve.",
    s: "Real-time analytics",
    g: "from-emerald-500 to-teal-600",
  },
  {
    t: "Agencies & Brands",
    d: "White-label engineering and AI talent that ships under your name.",
    s: "10+ partner agencies",
    g: "from-orange-500 to-rose-600",
  },
  {
    t: "Operators & Teams",
    d: "Custom CRMs and internal tools that finally match how you actually work.",
    s: "Built around you",
    g: "from-amber-500 to-pink-500",
  },
];

export function UseCases() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/70">
            Use cases
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            Who we work with
          </h2>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {cases.map((c, i) => (
            <motion.div
              key={c.t}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-foreground/10 bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${c.g} opacity-15 blur-2xl transition-opacity group-hover:opacity-30`} />
              <div className="relative">
                <h3 className="text-2xl font-semibold tracking-tight">{c.t}</h3>
                <p className="mt-3 max-w-sm text-foreground/65">{c.d}</p>
                <div className="mt-8 inline-flex rounded-full bg-foreground text-background px-3 py-1 text-xs font-medium">
                  {c.s}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
