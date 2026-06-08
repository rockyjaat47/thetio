import { useCallback, useRef } from "react";
import { motion, useAnimationControls, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { CatMascot } from "./CatMascot";
import mountainLeft from "@/assets/mountain-left.png.asset.json";
import mountainRight from "@/assets/mountain-right.png.asset.json";
import { FloatingShowcase } from "./FloatingShowcase";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    damping: 32,
    stiffness: 140,
    mass: 0.55,
  });

  // Mountains: door-open + drift out (start flush to edges, overlap in center)
  const mLeftX = useTransform(smooth, [0, 0.6], ["0%", "-110%"]);
  const mRightX = useTransform(smooth, [0, 0.6], ["0%", "110%"]);
  const mScale = useTransform(smooth, [0, 0.6], [1.05, 1.3]);
  const mOpacity = useTransform(smooth, [0.55, 0.78], [1, 0]);

  // Sky / sun
  const sunY = useTransform(smooth, [0, 1], [0, -160]);
  const sunScale = useTransform(smooth, [0, 0.6], [1, 1.15]);
  const skyOpacity = useTransform(smooth, [0, 0.6], [1, 0.85]);

  // Headline: stays then floats up between the mountains as they part
  const titleScale = useTransform(smooth, [0, 0.55], [0.98, 1.04]);
  const titleY = useTransform(smooth, [0, 0.6], [0, -40]);
  const titleOpacity = useTransform(smooth, [0, 0.55, 0.75], [1, 1, 0]);

  // Dashboard emerges as door opens
  const dashScale = useTransform(smooth, [0.25, 0.7], [0.55, 1]);
  const dashY = useTransform(smooth, [0.25, 0.7, 1], [120, 0, -80]);
  const dashOpacity = useTransform(smooth, [0.25, 0.5], [0, 1]);
  const dashRotate = useTransform(smooth, [0.25, 0.7], [10, 0]);

  // Birds + clouds drift
  const cloudsX = useTransform(smooth, [0, 1], [0, -180]);
  const birdsX = useTransform(smooth, [0, 1], [0, 240]);

  const tugCtrl = useAnimationControls();
  const handleTug = useCallback(
    (intensity: number) => {
      tugCtrl.start(
        intensity > 0
          ? { y: 14, rotate: -0.6, transition: { type: "spring", stiffness: 220, damping: 14 } }
          : { y: 0, rotate: 0, transition: { type: "spring", stiffness: 180, damping: 10 } },
      );
    },
    [tugCtrl],
  );

  return (
    <section ref={ref} className="relative isolate h-screen overflow-hidden" aria-label="Hero">
      {/* Sun / glow disc */}
      <motion.div
        style={{ y: sunY, scale: sunScale }}
        className="pointer-events-none absolute left-1/2 top-[28vh] -z-10 -translate-x-1/2 will-change-transform"
        aria-hidden
      >
        <div className="relative h-[36vmin] w-[36vmin]">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,#fff7ea_0%,#ffd9a8_38%,#f59e0b_60%,rgba(245,158,11,0)_72%)]" />
          <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(255,220,170,0.45),transparent_70%)] blur-2xl" />
        </div>
      </motion.div>

      {/* Atmospheric haze */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[55vh] bg-gradient-to-t from-white/80 via-white/30 to-transparent dark:from-black/60 dark:via-black/20" />

      {/* Drifting clouds */}
      <motion.div
        style={{ x: cloudsX }}
        className="pointer-events-none absolute inset-x-0 top-[14vh] -z-10 h-[40vh] will-change-transform"
      >
        <Cloud className="left-[6%] top-[8%] h-14 w-44" delay={0} />
        <Cloud className="right-[10%] top-[18%] h-12 w-40" delay={1.4} />
        <Cloud className="left-[34%] top-[44%] h-10 w-32" delay={2.6} />
        <Cloud className="right-[28%] top-[58%] h-12 w-36" delay={0.8} />
      </motion.div>

      {/* Birds silhouettes */}
      <motion.div
        style={{ x: birdsX }}
        className="pointer-events-none absolute left-[20%] top-[22vh] -z-10 will-change-transform"
        aria-hidden
      >
        <svg width="160" height="40" viewBox="0 0 160 40" className="opacity-60">
          <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-foreground/70">
            <path d="M5 18 q6 -8 12 0 q6 -8 12 0" />
            <path d="M55 28 q5 -7 10 0 q5 -7 10 0" />
            <path d="M100 14 q5 -6 10 0 q5 -6 10 0" />
            <path d="M135 24 q4 -5 8 0 q4 -5 8 0" />
          </g>
        </svg>
      </motion.div>

      {/* Sticky stage */}
      <div className="sticky top-0 flex h-screen items-center justify-center">
        {/* Mountains: behind everything */}
        <motion.div
          style={{ opacity: mOpacity }}
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden will-change-transform"
          aria-hidden
        >
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-white/95 via-white/55 to-transparent dark:from-white/20 dark:via-white/5 dark:to-transparent" />
          <motion.img
            src={mountainLeft.url}
            alt=""
            style={{ x: mLeftX, scale: mScale }}
            className="absolute left-0 top-0 h-full w-[60%] origin-bottom-left object-cover object-right drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)] will-change-transform"
            draggable={false}
          />
          <motion.img
            src={mountainRight.url}
            alt=""
            style={{ x: mRightX, scale: mScale }}
            className="absolute right-0 top-0 h-full w-[60%] origin-bottom-right object-cover object-left drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)] will-change-transform"
            draggable={false}
          />
        </motion.div>

        {/* Decorative floating cards — pushed to background behind mountains */}
        <div className="pointer-events-none absolute inset-0 -z-10 hidden opacity-25 blur-[1px] lg:block">
          <FloatingShowcase />
        </div>

        {/* Centered headline */}
        <div className="relative z-20 mx-auto w-full max-w-6xl px-4 sm:px-6">
          <motion.div
            style={{ scale: titleScale, y: titleY, opacity: titleOpacity }}
            className="mx-auto max-w-4xl text-center will-change-transform"
          >
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/30 px-3 py-1 text-xs font-medium text-foreground/85 backdrop-blur-md dark:border-white/10 dark:bg-white/10">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span className="whitespace-nowrap">Want Great Tech, Welcome to</span>
            </div>
            <h1 className="mt-5 text-balance text-5xl font-semibold leading-[0.95] tracking-tight text-foreground drop-shadow-[0_2px_18px_rgba(255,255,255,0.35)] sm:mt-6 sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem]">
              Build. Brand.
              <br />
              <span className="bg-gradient-to-br from-amber-500 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                Grow.
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm text-foreground/80 sm:mt-6 sm:text-base lg:text-lg">
              Beyond the horizon — websites, software, automation and marketing, engineered to move businesses forward.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground py-2 pl-5 pr-2 text-sm font-medium text-background shadow-[0_10px_30px_-10px_rgba(0,0,0,0.55)] transition-transform hover:scale-[1.02]"
              >
                Get Free Consultation
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-background">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/30 px-6 py-2.5 text-sm font-medium text-foreground backdrop-blur-md transition-transform hover:scale-[1.02] dark:border-white/15 dark:bg-white/10"
              >
                View Portfolio
              </Link>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-foreground/80 sm:mt-6 sm:text-sm">
              <span className="inline-flex items-center gap-2">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> Premium agency delivery
              </span>
              <span className="hidden h-4 w-px bg-foreground/30 sm:block" />
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" /> Fast & reliable
              </span>
              <span className="hidden h-4 w-px bg-foreground/30 sm:block" />
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" /> Lead-generation focused
              </span>
            </div>
          </motion.div>
        </div>

        {/* Cat mascot — desktop only, anchored bottom right so it never overlaps text */}
        <div className="pointer-events-none absolute bottom-4 right-4 z-30 hidden lg:block">
          <div className="pointer-events-auto">
            <CatMascot onTug={handleTug} />
          </div>
        </div>

        {/* Bottom valley fade into next section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-b from-transparent to-background" />
      </div>
    </section>
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
        animate={{ x: [0, 22, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay }}
        className="h-full w-full rounded-full bg-white/85 blur-2xl dark:bg-white/15"
      />
    </motion.div>
  );
}

function DashboardMock() {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/40 bg-white/95 shadow-[0_50px_120px_-30px_rgba(20,40,80,0.6)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center gap-1.5 border-b border-black/5 bg-white/80 px-4 py-2.5 dark:border-white/10 dark:bg-white/5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        <span className="ml-3 text-xs text-foreground/50">teomarketing.com/dashboard</span>
      </div>
      <div className="grid grid-cols-12 gap-4 p-4 text-left sm:p-6">
        <aside className="col-span-12 rounded-2xl bg-foreground p-4 text-background sm:col-span-3">
          <div className="flex items-center gap-2">
            <Logo variant="dark" className="h-6 w-auto" alt="TEO Marketing" />
          </div>
          <ul className="mt-4 space-y-1.5 text-xs text-background/70">
            {["Overview", "Clients", "Campaigns", "Leads", "Automations", "Team"].map((t, i) => (
              <li key={t} className={`rounded-lg px-2.5 py-1.5 ${i === 0 ? "bg-amber-500/20 text-background" : ""}`}>
                {t}
              </li>
            ))}
          </ul>
        </aside>
        <div className="col-span-12 sm:col-span-9">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { l: "Active clients", v: "48", t: "+18%", c: "bg-amber-100 text-amber-700" },
              { l: "Leads this month", v: "1,284", t: "+24%", c: "bg-emerald-100 text-emerald-700" },
              { l: "Avg. delivery", v: "14d", t: "-22%", c: "bg-blue-100 text-blue-700" },
              { l: "Client rating", v: "4.9", t: "★", c: "bg-orange-100 text-orange-700" },
            ].map((k) => (
              <div
                key={k.l}
                className="rounded-xl border border-black/5 bg-white p-3 dark:border-white/10 dark:bg-white/5"
              >
                <div className={`mb-2 inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-medium ${k.c}`}>{k.t}</div>
                <div className="text-[11px] text-foreground/50">{k.l}</div>
                <div className="text-lg font-semibold text-foreground">{k.v}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-black/5 bg-white p-3 sm:col-span-2 dark:border-white/10 dark:bg-white/5">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-xs font-medium text-foreground">Lead generation performance</div>
                <div className="text-[10px] text-foreground/50">Last 6 months</div>
              </div>
              <svg viewBox="0 0 300 100" className="h-24 w-full">
                <defs>
                  <linearGradient id="ar" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,80 C40,60 60,70 90,50 C120,30 150,55 180,35 C210,20 240,40 300,15 L300,100 L0,100 Z"
                  fill="url(#ar)"
                />
                <path
                  d="M0,80 C40,60 60,70 90,50 C120,30 150,55 180,35 C210,20 240,40 300,15"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="rounded-xl border border-black/5 bg-white p-3 dark:border-white/10 dark:bg-white/5">
              <div className="text-xs font-medium text-foreground">Service mix</div>
              <div className="mt-3 flex items-center justify-center">
                <div
                  className="h-20 w-20 rounded-full"
                  style={{ background: "conic-gradient(#f59e0b 0 45%, #10b981 45% 75%, #3b82f6 75% 100%)" }}
                />
              </div>
              <div className="mt-2 grid grid-cols-3 gap-1 text-center text-[10px] text-foreground/60">
                <div>Web 45%</div>
                <div>Marketing 30%</div>
                <div>AI 25%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
