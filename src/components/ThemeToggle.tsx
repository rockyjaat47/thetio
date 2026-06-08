import { Sun, Moon } from "lucide-react";

export function ThemeToggle({
  theme,
  toggle,
}: {
  theme: "light" | "dark";
  toggle: () => void;
}) {
  const isDark = theme === "dark";
  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
      className="group relative inline-flex h-9 w-[88px] shrink-0 items-center rounded-full border border-white/40 bg-white/20 px-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),inset_0_-1px_0_0_rgba(255,255,255,0.1),0_4px_14px_-4px_rgba(15,23,42,0.25)] backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-white/5 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_4px_14px_-4px_rgba(0,0,0,0.5)]"
    >
      {/* Sheen */}
      <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/40 via-transparent to-white/5 dark:from-white/10" />

      {/* Label */}
      <span
        className={`pointer-events-none absolute inset-y-0 flex items-center text-[11px] font-medium tracking-wide text-foreground/80 transition-all ${
          isDark ? "left-3" : "right-3"
        }`}
      >
        {isDark ? "Dark" : "Light"}
      </span>

      {/* Knob */}
      <span
        className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/70 text-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),inset_0_-2px_4px_0_rgba(15,23,42,0.15),0_4px_10px_-2px_rgba(15,23,42,0.35)] ring-1 ring-white/60 backdrop-blur-md transition-transform duration-300 ease-out dark:bg-white/15 dark:ring-white/20 ${
          isDark ? "translate-x-[52px]" : "translate-x-0"
        }`}
      >
        {isDark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
      </span>
    </button>
  );
}
