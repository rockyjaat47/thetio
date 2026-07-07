import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "@tanstack/react-router";

const reasons = [
  "One Team, Four Disciplines",
  "Built Like a Business, Not a Campaign",
  "Technology-Led Execution",
  "Full Accountability",
  "One Contract, One Report",
  "In-house Creative Production",
  "AI & Automation From Day One",
  "Strategy Rooted in Unit Economics",
];

export function Platform() {
  return (
    <section id="platform" className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.15),transparent_60%)]" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
            Why Navora Digital
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            Engineered for brands done managing vendors
          </h2>
          <p className="mt-4 text-foreground/65">
            We don't outsource the parts that matter. The people who plan your strategy also build
            the platform it runs on. One team to call, not four.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground py-2 pl-5 pr-2 text-sm font-medium text-background"
            >
              Book a Free Strategy Call
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-background">
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mt-14 max-w-5xl rounded-3xl border border-foreground/10 bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] p-2 shadow-2xl shadow-amber-900/20"
        >
          <div className="rounded-[20px] bg-[#0a0a0a] p-6 text-white sm:p-10">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {reasons.map((r) => (
                <div key={r} className="flex items-center gap-3 rounded-2xl bg-white/5 p-4">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-amber-500/20 text-amber-400">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium">{r}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {[
                { v: "4", l: "Pillars, one roof" },
                { v: "1", l: "Team, one contract" },
                { v: "24/7", l: "Strategic support" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl bg-white/5 p-5">
                  <div className="text-3xl font-semibold text-amber-400">{s.v}</div>
                  <div className="mt-1 text-xs text-white/60">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
