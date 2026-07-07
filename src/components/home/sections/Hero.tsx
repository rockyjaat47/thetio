import { useCallback, useRef } from "react";
import { motion, useAnimationControls, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import mountainLeft from "@/assets/mountain-left.png.asset.json";
import mountainRight from "@/assets/mountain-right.png.asset.json";
import { FloatingShowcase } from "./FloatingShowcase";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { damping: 32, stiffness: 140, mass: 0.55 });

  const mLeftX = useTransform(smooth, [0, 0.6], ["0%", "-110%"]);
  const mRightX = useTransform(smooth, [0, 0.6], ["0%", "110%"]);
  const mScale = useTransform(smooth, [0, 0.6], [1.05, 1.3]);
  const mOpacity = useTransform(smooth, [0.55, 0.78], [1, 0]);

  const sunY = useTransform(smooth, [0, 1], [0, -160]);
  const sunScale = useTransform(smooth, [0, 0.6], [1, 1.15]);

  const titleScale = useTransform(smooth, [0, 0.55], [0.98, 1.04]);
  const titleY = useTransform(smooth, [0, 0.6], [0, -40]);
  const titleOpacity = useTransform(smooth, [0, 0.55, 0.75], [1, 1, 0]);

  const cloudsX = useTransform(smooth, [0, 1], [0, -180]);
  const birdsX = useTransform(smooth, [0, 1], [0, 240]);

  const tugCtrl = useAnimationControls();
  useCallback(
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
      <motion.div
        style={{ y: sunY, scale: sunScale }}
        className="pointer-events-none absolute left-1/2 top-[28vh] -z-10 -translate-x-1/2 will-change-transform"
        aria-hidden
      >
        <div className="relative h-[36vmin] w-[36vmin]">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,#fff7ea_0%,#ffd9a8_38%,#f59e0b_60%,rgba(245,158,11,0)_72%)] dark:hidden" />
          <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(255,220,170,0.45),transparent_70%)] blur-2xl dark:hidden" />
          <div className="absolute inset-0 hidden rounded-full bg-[radial-gradient(circle_at_38%_38%,#f8fafc_0%,#e2e8f0_40%,#94a3b8_65%,rgba(148,163,184,0)_75%)] dark:block" />
          <div className="absolute inset-[6%] hidden rounded-full bg-[radial-gradient(circle_at_70%_70%,rgba(15,23,42,0.55),transparent_55%)] dark:block" />
          <div className="absolute -inset-10 hidden rounded-full bg-[radial-gradient(circle,rgba(186,200,224,0.35),transparent_70%)] blur-2xl dark:block" />
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[55vh] bg-gradient-to-t from-white/80 via-white/30 to-transparent dark:from-black/60 dark:via-black/20" />

      <motion.div
        style={{ x: cloudsX }}
        className="pointer-events-none absolute inset-x-0 top-[14vh] -z-10 h-[40vh] will-change-transform"
      >
        <Cloud className="left-[6%] top-[8%] h-14 w-44" delay={0} />
        <Cloud className="right-[10%] top-[18%] h-12 w-40" delay={1.4} />
        <Cloud className="left-[34%] top-[44%] h-10 w-32" delay={2.6} />
        <Cloud className="right-[28%] top-[58%] h-12 w-36" delay={0.8} />
      </motion.div>

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

      <div className="sticky top-0 flex h-screen items-center justify-center">
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

        <div className="pointer-events-none absolute inset-0 -z-10 hidden opacity-25 blur-[1px] lg:block">
          <FloatingShowcase />
        </div>

        <div className="relative z-20 mx-auto w-full max-w-6xl px-4 sm:px-6">
          <motion.div
            style={{ scale: titleScale, y: titleY, opacity: titleOpacity }}
            className="mx-auto max-w-4xl text-center will-change-transform"
          >
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/30 px-3 py-1 text-xs font-medium text-foreground/85 backdrop-blur-md dark:border-white/10 dark:bg-white/10">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span className="whitespace-nowrap">Software · AI · Mobile · Marketing</span>
            </div>
            <div className="mx-auto mt-6 flex justify-center">
              <Logo className="h-14 w-auto sm:h-20 lg:h-24" alt="Navora Digital" />
            </div>
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1] tracking-tight text-foreground drop-shadow-[0_2px_18px_rgba(255,255,255,0.35)] sm:mt-6 sm:text-5xl md:text-6xl lg:text-7xl">
              One Ecosystem.
              <br />
              <span className="bg-gradient-to-br from-amber-500 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                One Team. One Result.
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm text-foreground/80 sm:mt-6 sm:text-base lg:text-lg">
              Marketing, technology and creative production for brands that are done managing vendors and ready to manage results.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground py-2 pl-5 pr-2 text-sm font-medium text-background shadow-[0_10px_30px_-10px_rgba(0,0,0,0.55)] transition-transform hover:scale-[1.02]"
              >
                Book a Free Strategy Call
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-background">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
              <Link
                to="/"
                hash="packages"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/30 px-6 py-2.5 text-sm font-medium text-foreground backdrop-blur-md transition-transform hover:scale-[1.02] dark:border-white/15 dark:bg-white/10"
              >
                See Our Packages
              </Link>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-foreground/80 sm:mt-6 sm:text-sm">
              <span className="inline-flex items-center gap-2">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> One team, four disciplines
              </span>
              <span className="hidden h-4 w-px bg-foreground/30 sm:block" />
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" /> Full accountability
              </span>
              <span className="hidden h-4 w-px bg-foreground/30 sm:block" />
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" /> Built like a business
              </span>
            </div>
          </motion.div>
        </div>

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
