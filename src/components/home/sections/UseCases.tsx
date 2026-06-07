import { motion } from "framer-motion";
import {
  Building2,
  Stethoscope,
  GraduationCap,
  UtensilsCrossed,
  Briefcase,
  Rocket,
  Handshake,
  ShoppingBag,
  Store,
} from "lucide-react";

const industries = [
  { t: "Real Estate", i: Building2 },
  { t: "Healthcare", i: Stethoscope },
  { t: "Education", i: GraduationCap },
  { t: "Restaurants", i: UtensilsCrossed },
  { t: "Consultants", i: Briefcase },
  { t: "Startups", i: Rocket },
  { t: "Agencies", i: Handshake },
  { t: "E-commerce", i: ShoppingBag },
  { t: "Local Businesses", i: Store },
];

export function UseCases() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
            Industries we serve
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            Trusted across every industry
          </h2>
          <p className="mt-4 text-foreground/65">
            We've built websites, software and marketing engines for businesses of
            every size, across every category.
          </p>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((c, i) => (
            <motion.div
              key={c.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group relative overflow-hidden rounded-3xl border border-foreground/10 bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-amber-400/15 to-amber-600/5 blur-2xl transition-opacity group-hover:opacity-90" />
              <div className="relative flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-foreground text-background">
                  <c.i className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-semibold tracking-tight">{c.t}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
