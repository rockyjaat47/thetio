import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import teoAsset from "@/assets/robot/teo-mascot.asset.json";
import { ChatPanel } from "./ChatPanel";

const TIPS = [
  "Hey there! Need a hand? 👋",
  "Psst… ask me anything about TEO.",
  "I can guide you to services, pricing, or contact.",
  "Tap me to chat — I'm your AI sidekick!",
  "Want a free consultation? I got you.",
  "Let me show you around ✨",
];

const GREETINGS = ["Hi! 👋", "Hello!", "Hey friend!", "Need help?"];

const ROBOT_SIZE = 120;

/**
 * Site-wide Teo agent. Glides smoothly across the bottom of the viewport
 * with spring physics, occasional pauses, gentle floating, and contextual
 * tip bubbles. Tap to open the chat panel.
 */
export function SiteAgent() {
  const [open, setOpen] = useState(false);
  const [x, setX] = useState(60);
  const [facing, setFacing] = useState<1 | -1>(1);
  const [tip, setTip] = useState<string | null>("Hi, I'm Teo 🤖");
  const [isWalking, setIsWalking] = useState(true);
  const lastScrollY = useRef(0);
  const tipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const moveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
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

  // Smooth wander loop
  useEffect(() => {
    if (open) return;
    let cancelled = false;

    const step = () => {
      if (cancelled) return;
      const w = viewportW.current;
      const margin = 32;
      const maxX = Math.max(margin, w - ROBOT_SIZE - margin);

      setX((current) => {
        let target = margin + Math.random() * (maxX - margin);
        // ensure meaningful travel distance
        if (Math.abs(target - current) < w * 0.3) {
          target = current < w / 2 ? maxX - Math.random() * 120 : margin + Math.random() * 120;
        }
        setFacing(target > current ? 1 : -1);
        return target;
      });
      setIsWalking(true);

      // arrival pause
      moveTimer.current = setTimeout(() => {
        if (cancelled) return;
        setIsWalking(false);
        if (Math.random() < 0.45) {
          showTip(
            Math.random() < 0.5
              ? GREETINGS[Math.floor(Math.random() * GREETINGS.length)]
              : TIPS[Math.floor(Math.random() * TIPS.length)],
            3200,
          );
        }
        // resume walking
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

  const toggle = useCallback(() => {
    setTip(null);
    setOpen((o) => !o);
  }, []);

  return (
    <>
      <ChatPanel open={open} onClose={() => setOpen(false)} />

      {/* Smoothly gliding mascot */}
      <motion.div
        className="pointer-events-none fixed bottom-6 left-0 z-50 hidden sm:block"
        animate={{ x }}
        transition={{ type: "spring", stiffness: 18, damping: 22, mass: 2.4 }}
      >
        <motion.div
          animate={{ scaleX: facing }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
          className="pointer-events-auto relative"
          style={{ width: ROBOT_SIZE }}
        >
          {/* Tip bubble */}
          <AnimatePresence>
            {tip && !open && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                style={{ transform: facing === -1 ? "scaleX(-1)" : undefined }}
                className="absolute -top-3 left-full ml-3 w-max max-w-[220px] rounded-2xl rounded-bl-md border border-white/50 bg-white/80 px-3.5 py-2 text-xs font-medium text-foreground shadow-[0_12px_32px_-12px_rgba(30,80,200,0.35)] backdrop-blur-xl backdrop-saturate-150 dark:border-white/15 dark:bg-white/10 dark:text-white"
              >
                {tip}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating + walk-bob */}
          <motion.button
            type="button"
            onClick={toggle}
            aria-label={open ? "Close Teo chat" : "Open Teo chat"}
            className="group block cursor-pointer focus:outline-none"
            animate={
              isWalking
                ? { y: [0, -6, 0, -6, 0], rotate: [0, -2, 0, 2, 0] }
                : { y: [0, -8, 0], rotate: [0, 1, 0, -1, 0] }
            }
            transition={{
              duration: isWalking ? 0.9 : 3.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
          >
            {/* Soft glow under the bot */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-2 -bottom-2 h-4 rounded-full bg-sky-400/30 blur-xl"
            />
            <img
              src={teoAsset.url}
              alt="Teo the AI assistant"
              width={ROBOT_SIZE}
              height={ROBOT_SIZE}
              draggable={false}
              className="relative select-none drop-shadow-[0_18px_30px_rgba(30,90,200,0.35)]"
              style={{ width: ROBOT_SIZE, height: ROBOT_SIZE, objectFit: "contain" }}
            />
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
}
