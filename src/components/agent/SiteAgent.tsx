import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatPanel } from "./ChatPanel";
import type { TeoPose } from "./TeoModel";

const TeoCanvas = lazy(() =>
  import("./TeoCanvas").then((m) => ({ default: m.TeoCanvas })),
);

const TIPS = [
  "Hey there! Need a hand? 👋",
  "Psst… ask me anything about TEO.",
  "I can guide you to services, pricing, or contact.",
  "Tap me to chat — I'm your AI sidekick!",
  "Want a free consultation? I got you.",
  "Let me show you around ✨",
];

const GREETINGS = ["Hi! 👋", "Hello!", "Hey friend!", "Need help?"];

const TEO_SIZE = 140;

export function SiteAgent() {
  const [open, setOpen] = useState(false);
  const [x, setX] = useState(60);
  const [facing, setFacing] = useState<1 | -1>(1);
  const [tip, setTip] = useState<string | null>("Hi, I'm Teo ✨");
  const [pose, setPose] = useState<TeoPose>("idle");
  const [look, setLook] = useState({ x: 0, y: 0 });
  const lastScrollY = useRef(0);
  const tipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const moveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const viewportW = useRef(typeof window !== "undefined" ? window.innerWidth : 1280);

  useEffect(() => {
    const onResize = () => {
      viewportW.current = window.innerWidth;
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const showTip = useCallback((msg: string, ms = 4200) => {
    setTip(msg);
    if (tipTimer.current) clearTimeout(tipTimer.current);
    tipTimer.current = setTimeout(() => setTip(null), ms);
  }, []);

  // Wander loop
  useEffect(() => {
    if (open) return;
    let cancelled = false;

    const step = () => {
      if (cancelled) return;
      const w = viewportW.current;
      const margin = 32;
      const maxX = Math.max(margin, w - TEO_SIZE - margin);

      setX((current) => {
        let target = margin + Math.random() * (maxX - margin);
        if (Math.abs(target - current) < w * 0.3) {
          target = current < w / 2 ? maxX - Math.random() * 120 : margin + Math.random() * 120;
        }
        setFacing(target > current ? 1 : -1);
        return target;
      });
      setPose("walk");

      moveTimer.current = setTimeout(() => {
        if (cancelled) return;
        const willWave = Math.random() < 0.55;
        setPose(willWave ? "wave" : "idle");
        if (willWave) {
          showTip(
            Math.random() < 0.5
              ? GREETINGS[Math.floor(Math.random() * GREETINGS.length)]
              : TIPS[Math.floor(Math.random() * TIPS.length)],
            3200,
          );
          setTimeout(() => setPose("idle"), 1600);
        }
        moveTimer.current = setTimeout(step, 3000 + Math.random() * 2500);
      }, 5200);
    };

    moveTimer.current = setTimeout(step, 2200);
    return () => {
      cancelled = true;
      if (moveTimer.current) clearTimeout(moveTimer.current);
    };
  }, [open, showTip]);

  // Scroll awareness
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastScrollY.current;
      if (Math.abs(dy) > 400) {
        lastScrollY.current = y;
        showTip(TIPS[Math.floor(Math.random() * TIPS.length)], 3200);
        setPose("wave");
        setTimeout(() => setPose("walk"), 1400);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const hello = setTimeout(() => setTip(null), 5500);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(hello);
      if (tipTimer.current) clearTimeout(tipTimer.current);
    };
  }, [showTip]);

  // Cursor tracking → look target
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = wrapperRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / 400));
      const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / 400));
      setLook({ x: nx, y: ny });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const toggle = useCallback(() => {
    setTip(null);
    setOpen((o) => !o);
  }, []);

  return (
    <>
      <ChatPanel open={open} onClose={() => setOpen(false)} />

      <motion.div
        ref={wrapperRef}
        className="pointer-events-none fixed bottom-4 left-0 z-50 hidden sm:block"
        animate={{ x }}
        transition={{ type: "spring", stiffness: 18, damping: 22, mass: 2.4 }}
        style={{ width: TEO_SIZE }}
      >
        <div className="pointer-events-auto relative" style={{ width: TEO_SIZE }}>
          {/* Tip bubble */}
          <AnimatePresence>
            {tip && !open && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="absolute -top-2 left-full ml-2 w-max max-w-[220px] rounded-2xl rounded-bl-md border border-white/50 bg-white/80 px-3.5 py-2 text-xs font-medium text-foreground shadow-[0_12px_32px_-12px_rgba(30,80,200,0.35)] backdrop-blur-xl backdrop-saturate-150 dark:border-white/15 dark:bg-white/10 dark:text-white"
              >
                {tip}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={toggle}
            aria-label={open ? "Close Teo chat" : "Open Teo chat"}
            className="group block cursor-pointer focus:outline-none"
          >
            <Suspense
              fallback={
                <div
                  style={{ width: TEO_SIZE, height: TEO_SIZE }}
                  className="rounded-full bg-sky-200/40 blur-xl"
                />
              }
            >
              <TeoCanvas pose={pose} facing={facing} lookTarget={look} size={TEO_SIZE} />
            </Suspense>
          </button>
        </div>
      </motion.div>
    </>
  );
}
