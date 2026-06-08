import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { RobotMascot, type RobotPose } from "./RobotMascot";
import { ChatPanel } from "./ChatPanel";

const TIPS = [
  "Hey there! Need a hand? 👋",
  "Psst… ask me anything about TEO.",
  "I can guide you to services, pricing, or contact.",
  "Tap me to chat — I'm your AI sidekick!",
  "Found something cool? Keep scrolling ✨",
  "Looking for a free consultation? I got you.",
  "Let me show you around 🤖",
];

const GREETINGS = [
  "Hi! 👋",
  "Hello!",
  "Hey friend!",
  "Need help? 🤖",
];

const ROBOT_SIZE = 110;

/**
 * Site-wide Teo robot agent. Walks horizontally across the bottom of the
 * viewport, stops to wave/point, surfaces contextual tips on scroll, and
 * opens the chat panel on click.
 */
export function SiteAgent() {
  const [open, setOpen] = useState(false);
  const [x, setX] = useState(40);
  const [facing, setFacing] = useState<1 | -1>(1); // 1 = right, -1 = left
  const [pose, setPose] = useState<RobotPose>("wave");
  const [tip, setTip] = useState<string | null>("Hi, I'm Teo! 🤖 Tap to chat.");
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

  // Walking loop — pick a new horizontal destination, walk to it, pause, repeat.
  useEffect(() => {
    if (open) return;
    let cancelled = false;

    const step = () => {
      if (cancelled) return;
      const w = viewportW.current;
      const margin = 24;
      const maxX = Math.max(margin, w - ROBOT_SIZE - margin);
      // pick a target reasonably far from current position
      let target = margin + Math.random() * (maxX - margin);
      if (Math.abs(target - x) < w * 0.25) {
        target = x < w / 2 ? maxX - Math.random() * 80 : margin + Math.random() * 80;
      }
      setFacing(target > x ? 1 : -1);
      setPose("walk");
      setX(target);

      // Distance-based travel time
      const distance = Math.abs(target - x);
      const travelMs = Math.min(8000, Math.max(2500, distance * 9));

      moveTimer.current = setTimeout(() => {
        if (cancelled) return;
        // arrived — strike a pose
        const poses: RobotPose[] = ["wave", "happy", "point", "wave"];
        const nextPose = poses[Math.floor(Math.random() * poses.length)];
        setPose(nextPose);
        // occasional greeting
        if (Math.random() < 0.55) {
          showTip(GREETINGS[Math.floor(Math.random() * GREETINGS.length)], 2600);
        } else if (Math.random() < 0.5) {
          showTip(TIPS[Math.floor(Math.random() * TIPS.length)], 3800);
        }
        // pause then walk again
        moveTimer.current = setTimeout(step, 2400 + Math.random() * 2200);
      }, travelMs);
    };

    moveTimer.current = setTimeout(step, 1800);
    return () => {
      cancelled = true;
      if (moveTimer.current) clearTimeout(moveTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Scroll awareness — react with a quick tip + pose change
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastScrollY.current;
      if (Math.abs(dy) > 300) {
        lastScrollY.current = y;
        setPose(dy > 0 ? "point" : "happy");
        showTip(TIPS[Math.floor(Math.random() * TIPS.length)], 3600);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const hello = setTimeout(() => setTip(null), 6500);
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

      {/* Walking robot pinned to the bottom of the viewport */}
      <motion.div
        className="pointer-events-none fixed bottom-4 left-0 z-50 hidden sm:block"
        animate={{ x }}
        transition={{ type: "tween", ease: "easeInOut", duration: 0 }}
        style={{
          transition: "transform 3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <motion.div
          animate={{ scaleX: facing }}
          transition={{ duration: 0.35 }}
          className="pointer-events-auto relative"
          style={{ width: ROBOT_SIZE }}
        >
          {/* Tip bubble */}
          <AnimatePresence>
            {tip && !open && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
                style={{ transform: facing === -1 ? "scaleX(-1)" : undefined }}
                className="absolute -top-2 left-full ml-2 w-max max-w-[220px] rounded-2xl rounded-bl-sm border border-white/40 bg-white/70 px-3 py-2 text-xs font-medium text-foreground shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)] backdrop-blur-xl backdrop-saturate-150 dark:border-white/15 dark:bg-white/10"
              >
                {tip}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Walk wobble */}
          <motion.button
            type="button"
            onClick={toggle}
            aria-label={open ? "Close Teo chat" : "Open Teo chat"}
            className="group block cursor-pointer focus:outline-none"
            animate={
              pose === "walk"
                ? { y: [0, -5, 0, -5, 0], rotate: [0, -2, 0, 2, 0] }
                : { y: [0, -3, 0], rotate: 0 }
            }
            transition={{
              duration: pose === "walk" ? 0.55 : 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <RobotMascot pose={pose} size={ROBOT_SIZE} />
          </motion.button>

          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ transform: facing === -1 ? "translateX(-50%) scaleX(-1)" : "translateX(-50%)" }}
            className="pointer-events-none absolute -bottom-1 left-1/2 flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/40 bg-white/60 px-2.5 py-1 text-[10px] font-medium text-foreground/80 shadow-sm backdrop-blur-xl dark:border-white/15 dark:bg-white/10"
          >
            <MessageCircle className="h-3 w-3 text-sky-500" />
            {open ? "Chatting" : "Chat with me"}
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
