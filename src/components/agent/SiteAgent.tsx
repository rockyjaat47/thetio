import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { CatMascot } from "@/components/home/sections/CatMascot";
import { ChatPanel } from "./ChatPanel";

type Anchor = { x: number; y: number; flip: boolean };

const TIPS = [
  "Psst… need a tour? 🐾",
  "Keep scrolling — the good stuff is below! ✨",
  "Curious about TEO? Just ask me.",
  "I can help you find services, prices, contact… meow.",
  "Tap me to chat. I'm fluent in cat & marketing.",
  "Almost there — keep going! 🐾",
];

/**
 * Site-wide Mochi agent. The cat wanders the viewport between anchor points,
 * surfaces contextual tips on scroll, and opens the chat panel on click.
 */
export function SiteAgent() {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<Anchor>({ x: 16, y: 16, flip: false });
  const [tip, setTip] = useState<string | null>("Hi, I'm Mochi! 🐾 Tap to chat.");
  const lastScrollY = useRef(0);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Resting spots — computed from viewport so left-side anchors work
  const [spots, setSpots] = useState<Anchor[]>([{ x: 16, y: 16, flip: false }]);
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      const leftX = Math.max(16, w - 240);
      setSpots([
        { x: 16, y: 16, flip: false },
        { x: 16, y: 140, flip: false },
        { x: 16, y: 260, flip: false },
        { x: leftX, y: 16, flip: true },
        { x: leftX, y: 200, flip: true },
      ]);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // Wander between spots every 9–15s when idle
  useEffect(() => {
    if (open) return;
    const loop = () => {
      const next = spots[Math.floor(Math.random() * spots.length)];
      setAnchor(next);
    };
    const id = setInterval(loop, 9000 + Math.random() * 6000);
    return () => clearInterval(id);
  }, [open, spots]);

  // Scroll-aware: react when user scrolls a lot
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastScrollY.current;
      if (Math.abs(dy) > 250) {
        lastScrollY.current = y;
        // Show a contextual tip
        const msg = TIPS[Math.floor(Math.random() * TIPS.length)];
        setTip(msg);
        if (tipTimer.current) clearTimeout(tipTimer.current);
        tipTimer.current = setTimeout(() => setTip(null), 4500);
        // Hop to a new anchor
        if (scrollTimer.current) clearTimeout(scrollTimer.current);
        scrollTimer.current = setTimeout(() => {
          const next = spots[Math.floor(Math.random() * spots.length)];
          setAnchor(next);
        }, 120);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // hide initial greeting after a bit
    const t = setTimeout(() => setTip(null), 6500);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
      if (tipTimer.current) clearTimeout(tipTimer.current);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, [spots]);

  const toggle = useCallback(() => {
    setTip(null);
    setOpen((o) => !o);
  }, []);

  // When chat opens, pin Mochi to the bottom-right
  useEffect(() => {
    if (open) setAnchor({ x: 16, y: 16, flip: false });
  }, [open]);

  return (
    <>
      <ChatPanel open={open} onClose={() => setOpen(false)} />

      {/* Wandering mascot */}
      <motion.div
        className="pointer-events-none fixed z-50 hidden sm:block"
        initial={false}
        animate={{
          right: anchor.x,
          bottom: anchor.y,
          scaleX: anchor.flip ? -1 : 1,
        }}
        transition={{
          right: { type: "spring", stiffness: 35, damping: 14, mass: 1.2 },
          bottom: { type: "spring", stiffness: 35, damping: 14, mass: 1.2 },
          scaleX: { duration: 0.4 },
        }}
      >
        <div className="pointer-events-auto relative">
          {/* Contextual tip bubble */}
          <AnimatePresence>
            {tip && !open && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
                style={{ transform: anchor.flip ? "scaleX(-1)" : undefined }}
                className="absolute -top-3 right-32 max-w-[210px] rounded-2xl rounded-br-sm border border-white/40 bg-white/40 px-3 py-2 text-xs font-medium text-foreground shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.6)] backdrop-blur-xl backdrop-saturate-150 dark:border-white/15 dark:bg-white/10"
              >
                {tip}
                <span className="absolute -bottom-1.5 right-3 h-3 w-3 rotate-45 border-b border-r border-white/40 bg-white/40 backdrop-blur dark:border-white/15 dark:bg-white/10" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Walk wobble while moving between anchors */}
          <motion.div
            animate={{ y: [0, -3, 0, -2, 0], rotate: [0, -1.5, 0, 1.5, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <button
              type="button"
              onClick={toggle}
              aria-label={open ? "Close Mochi chat" : "Open Mochi chat"}
              className="group block focus:outline-none"
            >
              <CatMascot />
            </button>
          </motion.div>

          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ transform: anchor.flip ? "translateX(-50%) scaleX(-1)" : "translateX(-50%)" }}
            className="pointer-events-none absolute -bottom-1 left-1/2 flex items-center gap-1.5 rounded-full border border-white/40 bg-white/40 px-2.5 py-1 text-[10px] font-medium text-foreground/80 shadow-sm backdrop-blur-xl dark:border-white/15 dark:bg-white/10"
          >
            <MessageCircle className="h-3 w-3 text-amber-500" />
            {open ? "Chatting" : "Chat with me"}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
