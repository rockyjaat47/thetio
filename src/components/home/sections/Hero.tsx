import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Star } from "lucide-react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { damping: 30, stiffness: 120, mass: 0.6 });

  // Dashboard zoom: 0.6 -> 1.15
  const dashScale = useTransform(smooth, [0, 0.55, 1], [0.62, 1, 1.15]);
  const dashY = useTransform(smooth, [0, 1], [40, -60]);
  const dashRotate = useTransform(smooth, [0, 0.55], [6, 0]);

  // Hero text fade out
  const textOpacity = useTransform(smooth, [0, 0.4], [1, 0]);
  const textY = useTransform(smooth, [0, 0.5], [0, -80]);

  // Parallax layers
  const cloudsY = useTransform(smooth, [0, 1], [0, -120]);
  const hillsBackY = useTransform(smooth, [0, 1], [0, 80]);
  const hillsFrontY = useTransform(smooth, [0, 1], [0, 160]);
  const flowersY = useTransform(smooth, [0, 1], [0, 220]);

  return (
    <section
      ref={ref}
      className="relative isolate min-h-[180vh] overflow-hidden pt-28 sm:pt-32"
    >
      {/* Sky gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#cfe0f5] via-[#b8c8e0] to-[#e8efe0] dark:from-[#0b1428] dark:via-[#0a1020] dark:to-[#0e1a14]" />

      {/* Clouds (parallax) */}
      <motion.div style={{ y: cloudsY }} className="pointer-events-none absolute inset-x-0 top-0 h-[100vh] will-change-transform">
        <Cloud className="left-[5%] top-[12%] h-16 w-40 opacity-80" delay={0} />
        <Cloud className="right-[8%] top-[18%] h-14 w-36 opacity-70" delay={1.2} />
        <Cloud className="left-[20%] top-[42%] h-10 w-28 opacity-60" delay={2.4} />
        <Cloud className="right-[18%] top-[55%] h-12 w-32 opacity-65" delay={0.8} />
        <Cloud className="left-[60%] top-[8%] h-12 w-44 opacity-70" delay={1.8} />
      </motion.div>

      {/* Sticky stage */}
      <div className="sticky top-0 flex h-screen items-center justify-center">
        <div className="mx-auto w-full max-w-6xl px-4 text-center sm:px-6">
          <motion.div style={{ opacity: textOpacity, y: textY }} className="will-change-transform">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/30 px-3 py-1 text-xs font-medium text-foreground/80 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
              <Sparkles className="h-3.5 w-3.5" /> A full-stack digital studio
            </div>

            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-foreground sm:text-7xl md:text-8xl">
              Digital{" "}
              <span className="relative inline-block align-middle">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-foreground to-foreground/70 text-background shadow-2xl shadow-foreground/30 sm:h-20 sm:w-20 md:h-24 md:w-24">
                  <Sparkles className="h-7 w-7 sm:h-10 sm:w-10 md:h-12 md:w-12" />
                </span>
              </span>{" "}
              Growth
            </h1>
            <h1 className="text-5xl font-semibold tracking-tight text-foreground sm:text-7xl md:text-8xl">
              Studio
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base text-foreground/70 sm:text-lg">
              We design, build and scale modern web platforms, SaaS, CRMs and AI
              automations — paired with marketing that actually converts.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://wa.me/6261302023"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#4f8dff] to-[#1f5be6] py-2 pl-5 pr-2 text-sm font-medium text-white shadow-[0_10px_30px_-10px_rgba(31,91,230,0.7),inset_0_1px_0_rgba(255,255,255,0.4)] transition-transform hover:scale-[1.02]"
              >
                Get started now
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
              <a
                href="#platform"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-foreground shadow-md transition-transform hover:scale-[1.02] dark:bg-white/10 dark:text-foreground"
              >
                View our work
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-foreground/75">
              <span className="inline-flex items-center gap-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> 4.9/5 client rating
              </span>
              <span className="hidden h-4 w-px bg-foreground/20 sm:block" />
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" /> Enterprise-grade delivery
              </span>
              <span className="hidden h-4 w-px bg-foreground/20 sm:block" />
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-500" /> AI-native workflows
              </span>
            </div>
          </motion.div>

          {/* Dashboard mock - scroll-linked zoom */}
          <motion.div
            style={{
              scale: dashScale,
              y: dashY,
              rotateX: dashRotate,
              transformPerspective: 1200,
            }}
            className="relative mx-auto mt-10 max-w-5xl will-change-transform"
          >
            <DashboardMock />
          </motion.div>
        </div>
      </div>

      {/* Parallax grass hills - back */}
      <motion.svg
        style={{ y: hillsBackY }}
        viewBox="0 0 1440 220"
        className="absolute inset-x-0 bottom-32 -z-10 h-40 w-full will-change-transform sm:h-56"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="hb" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#9ec97a" />
            <stop offset="100%" stopColor="#3f7a3a" />
          </linearGradient>
        </defs>
        <path d="M0,160 C220,80 380,200 620,140 C880,70 1080,200 1440,120 L1440,220 L0,220 Z" fill="url(#hb)" />
      </motion.svg>

      {/* Parallax grass hills - front */}
      <motion.svg
        style={{ y: hillsFrontY }}
        viewBox="0 0 1440 220"
        className="absolute inset-x-0 bottom-12 -z-10 h-40 w-full will-change-transform sm:h-56"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="hf" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#b6d684" />
            <stop offset="100%" stopColor="#5a9a4a" />
          </linearGradient>
        </defs>
        <path d="M0,190 C260,140 460,220 760,170 C1020,130 1220,210 1440,170 L1440,220 L0,220 Z" fill="url(#hf)" />
      </motion.svg>

      {/* Flower field (closest) */}
      <motion.div
        style={{ y: flowersY }}
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24 will-change-transform"
      >
        <div className="relative h-full w-full">
          {Array.from({ length: 36 }).map((_, i) => (
            <Flower key={i} i={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function Flower({ i }: { i: number }) {
  const left = (i * 137.5) % 100;
  const bottom = (i * 53) % 60;
  const palette = ["#f9c1d1", "#fff2a8", "#c4a8ff", "#ffd4a8", "#ffffff"];
  const color = palette[i % palette.length];
  const size = 6 + (i % 3) * 2;
  return (
    <span
      aria-hidden
      className="absolute rounded-full shadow-sm"
      style={{
        left: `${left}%`,
        bottom: `${bottom}%`,
        width: size,
        height: size,
        background: color,
        opacity: 0.85,
      }}
    />
  );
}

function Cloud({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, delay }}
      className={`pointer-events-none absolute ${className}`}
    >
      <motion.div
        animate={{ x: [0, 18, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay }}
        className="h-full w-full rounded-full bg-white/80 blur-2xl dark:bg-white/10"
      />
    </motion.div>
  );
}

function DashboardMock() {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/40 bg-white/90 shadow-[0_40px_80px_-20px_rgba(20,40,80,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center gap-1.5 border-b border-black/5 bg-white/70 px-4 py-2.5 dark:border-white/10 dark:bg-white/5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        <span className="ml-3 text-xs text-foreground/50">app.teo.studio/dashboard</span>
      </div>
      <div className="grid grid-cols-12 gap-4 p-4 text-left sm:p-6">
        <aside className="col-span-12 rounded-2xl bg-foreground p-4 text-background sm:col-span-3">
          <div className="text-sm font-semibold">teo Studio</div>
          <ul className="mt-4 space-y-1.5 text-xs text-background/70">
            {["Overview", "Projects", "Pipeline", "Insights", "Automations", "Team"].map(
              (t, i) => (
                <li
                  key={t}
                  className={`rounded-lg px-2.5 py-1.5 ${i === 0 ? "bg-white/15 text-background" : ""}`}
                >
                  {t}
                </li>
              ),
            )}
          </ul>
        </aside>
        <div className="col-span-12 sm:col-span-9">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { l: "Active projects", v: "24", t: "+12%", c: "bg-blue-100 text-blue-700" },
              { l: "Pipeline value", v: "$182k", t: "+8%", c: "bg-emerald-100 text-emerald-700" },
              { l: "Avg. delivery", v: "21d", t: "-15%", c: "bg-purple-100 text-purple-700" },
              { l: "NPS score", v: "72", t: "+4", c: "bg-orange-100 text-orange-700" },
            ].map((k) => (
              <div key={k.l} className="rounded-xl border border-black/5 bg-white p-3 dark:border-white/10 dark:bg-white/5">
                <div className={`mb-2 inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-medium ${k.c}`}>
                  {k.t}
                </div>
                <div className="text-[11px] text-foreground/50">{k.l}</div>
                <div className="text-lg font-semibold text-foreground">{k.v}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-black/5 bg-white p-3 sm:col-span-2 dark:border-white/10 dark:bg-white/5">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-xs font-medium text-foreground">Growth performance</div>
                <div className="text-[10px] text-foreground/50">Last 6 months</div>
              </div>
              <svg viewBox="0 0 300 100" className="h-24 w-full">
                <defs>
                  <linearGradient id="ar" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,80 C40,60 60,70 90,50 C120,30 150,55 180,35 C210,20 240,40 300,15 L300,100 L0,100 Z" fill="url(#ar)" />
                <path d="M0,80 C40,60 60,70 90,50 C120,30 150,55 180,35 C210,20 240,40 300,15" fill="none" stroke="#3b82f6" strokeWidth="2" />
              </svg>
            </div>
            <div className="rounded-xl border border-black/5 bg-white p-3 dark:border-white/10 dark:bg-white/5">
              <div className="text-xs font-medium text-foreground">Channel mix</div>
              <div className="mt-3 flex items-center justify-center">
                <div
                  className="h-20 w-20 rounded-full"
                  style={{ background: "conic-gradient(#3b82f6 0 55%, #10b981 55% 80%, #f59e0b 80% 100%)" }}
                />
              </div>
              <div className="mt-2 grid grid-cols-3 gap-1 text-center text-[10px] text-foreground/60">
                <div>Web 55%</div>
                <div>SaaS 25%</div>
                <div>AI 20%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Silence unused import linter — MotionValue used implicitly via useTransform return types
export type _Unused = MotionValue<number>;
