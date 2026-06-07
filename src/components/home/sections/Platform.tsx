import { motion } from "framer-motion";
import { ArrowRight, Focus, Layers, Zap } from "lucide-react";

export function Platform() {
  return (
    <section id="platform" className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_60%)]" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/70">
            Platform overview
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            One workspace for product, growth & ops
          </h2>
          <p className="mt-4 text-foreground/65">
            Track every project, every campaign and every automation from a single
            real-time view.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://wa.me/6261302023"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground py-2 pl-5 pr-2 text-sm font-medium text-background"
            >
              Book a walkthrough
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-background text-foreground">
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mt-14 max-w-5xl rounded-3xl border border-foreground/10 bg-gradient-to-br from-[#0a0f1f] to-[#1a2444] p-2 shadow-2xl shadow-blue-900/20"
        >
          <div className="rounded-[20px] bg-[#0a0f1f] p-6 text-white sm:p-10">
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { v: "$2.4M", l: "Tracked pipeline" },
                { v: "184", l: "Live automations" },
                { v: "99.98%", l: "Platform uptime" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl bg-white/5 p-5">
                  <div className="text-3xl font-semibold">{s.v}</div>
                  <div className="mt-1 text-xs text-white/60">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/5 p-5">
                <div className="mb-3 text-xs text-white/60">Revenue trend</div>
                <svg viewBox="0 0 300 100" className="h-24 w-full">
                  <path
                    d="M0,80 C40,70 70,50 110,55 C150,60 180,30 220,25 C250,22 280,15 300,10"
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>
              <div className="rounded-2xl bg-white/5 p-5">
                <div className="mb-3 text-xs text-white/60">Active workstreams</div>
                <div className="space-y-2">
                  {[
                    ["Acme website refresh", 82],
                    ["Helio CRM rollout", 64],
                    ["Quanta AI agent", 48],
                  ].map(([n, p]) => (
                    <div key={n as string}>
                      <div className="flex justify-between text-xs">
                        <span>{n}</span>
                        <span className="text-white/60">{p}%</span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full bg-gradient-to-r from-blue-400 to-emerald-400" style={{ width: `${p}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-3">
          {[
            { i: Layers, t: "All work in one place", d: "Projects, campaigns and automations unified." },
            { i: Zap, t: "Move faster", d: "Real-time signals, fewer status meetings." },
            { i: Focus, t: "Built for focus", d: "A clean interface for clear decisions." },
          ].map((x) => (
            <div key={x.t} className="text-center sm:text-left">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-foreground/5">
                <x.i className="h-4 w-4" />
              </div>
              <div className="mt-3 text-sm font-semibold">{x.t}</div>
              <p className="mt-1 text-sm text-foreground/60">{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
