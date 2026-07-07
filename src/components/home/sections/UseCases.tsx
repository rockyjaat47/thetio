import { motion } from "framer-motion";
import {
  Building2,
  Stethoscope,
  GraduationCap,
  Hotel,
  Rocket,
  Vote,
  ShoppingBag,
  Briefcase,
  Store,
} from "lucide-react";

const industries = [
  { t: "Startups & Founders", i: Rocket, d: "Building a first true digital presence" },
  { t: "Schools & Institutions", i: GraduationCap, d: "Need to be found and trusted" },
  { t: "Hospitals & Healthcare", i: Stethoscope, d: "Trust-driven, high-intent audiences" },
  { t: "Real Estate", i: Building2, d: "Competing on visibility" },
  { t: "Hospitality", i: Hotel, d: "Booking-driven brand growth" },
  { t: "Retail & E-commerce", i: ShoppingBag, d: "Performance marketing at scale" },
  { t: "Political Campaigns", i: Vote, d: "Message discipline at speed" },
  { t: "Service Businesses", i: Briefcase, d: "Convert better online than referrals" },
  { t: "Local Businesses", i: Store, d: "GBP, ads and reviews, done right" },
];

export function UseCases() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
            Who we work with
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            Built for brands that are ready to scale
          </h2>
          <p className="mt-4 text-foreground/65">
            From a first digital presence to a fully engineered ecosystem — Navora Digital meets you
            wherever growth is happening.
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
              <div className="relative flex items-start gap-4">
                <span className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-foreground text-background">
                  <c.i className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">{c.t}</h3>
                  <p className="mt-1 text-sm text-foreground/60">{c.d}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
