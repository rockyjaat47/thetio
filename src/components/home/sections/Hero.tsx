import { useCallback, useRef } from "react";
import {
  motion,
  useAnimationControls,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { CatMascot } from "./CatMascot";
import { Landscape } from "./Landscape";
import mountainLeft from "@/assets/mountain-left.png.asset.json";
import mountainRight from "@/assets/mountain-right.png.asset.json";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { damping: 30, stiffness: 120, mass: 0.6 });

  const dashScale = useTransform(smooth, [0, 0.55, 1], [0.62, 1, 1.15]);
  const dashY = useTransform(smooth, [0, 1], [40, -60]);
  const dashRotate = useTransform(smooth, [0, 0.55], [6, 0]);

  const textOpacity = useTransform(smooth, [0, 0.4], [1, 0]);
  const textY = useTransform(smooth, [0, 0.5], [0, -80]);

  const cloudsY = useTransform(smooth, [0, 1], [0, -120]);
  const landscapeY = useTransform(smooth, [0, 1], [0, 140]);

  // Door-opening mountain reveal
  const mountainLeftX = useTransform(smooth, [0, 0.55], ["18%", "-95%"]);
  const mountainRightX = useTransform(smooth, [0, 0.55], ["-18%", "95%"]);
  const mountainScale = useTransform(smooth, [0, 0.55], [1.15, 1.35]);
  const mountainOpacity = useTransform(smooth, [0.5, 0.7], [1, 0]);

  const tugCtrl = useAnimationControls();
  const handleTug = useCallback(
    (intensity: number) => {
      if (intensity > 0) {
        tugCtrl.start({
          y: 14,
          rotate: -0.6,
          transition: { type: "spring", stiffness: 220, damping: 14 },
        });
      } else {
        tugCtrl.start({
          y: 0,
          rotate: 0,
          transition: { type: "spring", stiffness: 180, damping: 10 },
        });
      }
    },
    [tugCtrl],
  );

  return (
    <section
      ref={ref}
      className="relative isolate min-h-[180vh] overflow-hidden pt-28 sm:pt-32"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#cfe0f5] via-[#b8c8e0] to-[#e8efe0] dark:from-[#0b1428] dark:via-[#0a1020] dark:to-[#0e1a14]" />

      <motion.div style={{ y: cloudsY }} className="pointer-events-none absolute inset-x-0 top-0 h-[100vh] will-change-transform">
        <Cloud className="left-[5%] top-[12%] h-16 w-40 opacity-80" delay={0} />
        <Cloud className="right-[8%] top-[18%] h-14 w-36 opacity-70" delay={1.2} />
        <Cloud className="left-[20%] top-[42%] h-10 w-28 opacity-60" delay={2.4} />
        <Cloud className="right-[18%] top-[55%] h-12 w-32 opacity-65" delay={0.8} />
        <Cloud className="left-[60%] top-[8%] h-12 w-44 opacity-70" delay={1.8} />
      </motion.div>

      <div className="sticky top-0 flex h-screen items-center justify-center">
        <div className="mx-auto w-full max-w-7xl px-4 text-center sm:px-6">
          <motion.div style={{ opacity: textOpacity, y: textY }} className="will-change-transform">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/30 px-3 py-1 text-xs font-medium text-foreground/80 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" /> TEO Marketing — Digital Growth Agency
            </div>

            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-foreground sm:text-7xl md:text-8xl">
              Build.{" "}
              <span className="relative inline-block align-middle">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-background shadow-2xl shadow-amber-500/40 sm:h-20 sm:w-20 md:h-24 md:w-24">
                  <Sparkles className="h-7 w-7 sm:h-10 sm:w-10 md:h-12 md:w-12" />
                </span>
              </span>{" "}
              Brand.
            </h1>
            <h1 className="text-5xl font-semibold tracking-tight text-foreground sm:text-7xl md:text-8xl">
              Grow.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base text-foreground/70 sm:text-lg">
              Helping businesses scale through websites, automation, marketing and
              digital solutions — all under one roof.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground py-2 pl-5 pr-2 text-sm font-medium text-background shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-transform hover:scale-[1.02]"
              >
                Get Free Consultation
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-background">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-foreground shadow-md transition-transform hover:scale-[1.02] dark:bg-white/10 dark:text-foreground"
              >
                View Portfolio
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-foreground/75">
              <span className="inline-flex items-center gap-2">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> Premium agency delivery
              </span>
              <span className="hidden h-4 w-px bg-foreground/20 sm:block" />
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" /> Fast & reliable
              </span>
              <span className="hidden h-4 w-px bg-foreground/20 sm:block" />
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" /> Lead-generation focused
              </span>
            </div>
          </motion.div>

          <motion.div
            style={{
              scale: dashScale,
              y: dashY,
              rotateX: dashRotate,
              transformPerspective: 1200,
            }}
            className="relative mx-auto mt-10 w-full max-w-[1400px] will-change-transform"
          >
            <motion.div animate={tugCtrl} className="will-change-transform">
              <DashboardMock />
            </motion.div>

            <div className="pointer-events-none absolute -bottom-10 right-2 sm:-bottom-14 sm:right-6 md:-bottom-16 md:right-10">
              <div className="pointer-events-auto">
                <CatMascot onTug={handleTug} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Door-opening mountain reveal — sits on top, slides apart on scroll */}
        <motion.div
          style={{ opacity: mountainOpacity }}
          className="pointer-events-none absolute inset-0 z-20 overflow-hidden will-change-transform"
          aria-hidden
        >
          {/* Soft cloud gradient layer behind mountains */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-white/95 via-white/70 to-transparent dark:from-white/30 dark:via-white/10 dark:to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[radial-gradient(ellipse_at_30%_100%,rgba(255,255,255,0.9),transparent_60%),radial-gradient(ellipse_at_75%_100%,rgba(255,255,255,0.85),transparent_55%)] blur-xl" />

          <motion.img
            src={mountainLeft.url}
            alt=""
            style={{ x: mountainLeftX, scale: mountainScale }}
            className="absolute left-0 top-0 h-full w-1/2 origin-left object-cover object-right will-change-transform"
            draggable={false}
          />
          <motion.img
            src={mountainRight.url}
            alt=""
            style={{ x: mountainRightX, scale: mountainScale }}
            className="absolute right-0 top-0 h-full w-1/2 origin-right object-cover object-left will-change-transform"
            draggable={false}
          />
        </motion.div>
      </div>

      <motion.div style={{ y: landscapeY }} className="pointer-events-none absolute inset-0 -z-10 will-change-transform">
        <Landscape />
      </motion.div>
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
        <span className="ml-3 text-xs text-foreground/50">teomarketing.com/dashboard</span>
      </div>
      <div className="grid grid-cols-12 gap-4 p-4 text-left sm:p-6">
        <aside className="col-span-12 rounded-2xl bg-foreground p-4 text-background sm:col-span-3">
          <div className="flex items-center gap-2">
            <Logo variant="dark" className="h-6 w-auto" alt="TEO Marketing" />
          </div>
          <ul className="mt-4 space-y-1.5 text-xs text-background/70">
            {["Overview", "Clients", "Campaigns", "Leads", "Automations", "Team"].map(
              (t, i) => (
                <li
                  key={t}
                  className={`rounded-lg px-2.5 py-1.5 ${i === 0 ? "bg-amber-500/20 text-background" : ""}`}
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
              { l: "Active clients", v: "48", t: "+18%", c: "bg-amber-100 text-amber-700" },
              { l: "Leads this month", v: "1,284", t: "+24%", c: "bg-emerald-100 text-emerald-700" },
              { l: "Avg. delivery", v: "14d", t: "-22%", c: "bg-blue-100 text-blue-700" },
              { l: "Client rating", v: "4.9", t: "★", c: "bg-orange-100 text-orange-700" },
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
                <path d="M0,80 C40,60 60,70 90,50 C120,30 150,55 180,35 C210,20 240,40 300,15 L300,100 L0,100 Z" fill="url(#ar)" />
                <path d="M0,80 C40,60 60,70 90,50 C120,30 150,55 180,35 C210,20 240,40 300,15" fill="none" stroke="#f59e0b" strokeWidth="2" />
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
