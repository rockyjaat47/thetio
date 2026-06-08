import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { CatMascot } from "@/components/home/sections/CatMascot";
import { ChatPanel } from "./ChatPanel";

/**
 * Site-wide AI agent (Mochi the cat).
 * Renders the animated mascot in the bottom-right of every page and toggles
 * a chat panel powered by Lovable AI. Independent: handles its own state,
 * idle motions (via CatMascot), and conversation persistence.
 */
export function SiteAgent() {
  const [open, setOpen] = useState(false);
  const [hint, setHint] = useState(true);

  // Hide the welcome hint after first interaction or 12s
  useEffect(() => {
    const t = setTimeout(() => setHint(false), 12000);
    return () => clearTimeout(t);
  }, []);

  const toggle = useCallback(() => {
    setHint(false);
    setOpen((o) => !o);
  }, []);

  return (
    <>
      <ChatPanel open={open} onClose={() => setOpen(false)} />

      {/* Mascot anchor — bottom right, above everything */}
      <div className="pointer-events-none fixed bottom-2 right-2 z-50 hidden sm:block">
        <div className="pointer-events-auto relative">
          {/* Hint speech bubble */}
          <AnimatePresence>
            {hint && !open && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="absolute -top-2 right-32 max-w-[200px] rounded-2xl rounded-br-sm border border-border bg-background px-3 py-2 text-xs font-medium text-foreground shadow-lg"
              >
                <span className="block">Psst… I'm Mochi 🐾</span>
                <span className="block text-muted-foreground">Tap me to chat!</span>
                <span className="absolute -bottom-1.5 right-3 h-3 w-3 rotate-45 border-b border-r border-border bg-background" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* The mascot itself — clickable */}
          <button
            type="button"
            onClick={toggle}
            aria-label={open ? "Close Mochi chat" : "Open Mochi chat"}
            className="group block focus:outline-none"
          >
            <CatMascot />
          </button>

          {/* Subtle "chat" pill under the cat */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="pointer-events-none absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-border bg-background/90 px-2.5 py-1 text-[10px] font-medium text-foreground/80 shadow-sm backdrop-blur"
          >
            <MessageCircle className="h-3 w-3 text-amber-500" />
            {open ? "Chatting" : "Chat with me"}
          </motion.div>
        </div>
      </div>
    </>
  );
}
