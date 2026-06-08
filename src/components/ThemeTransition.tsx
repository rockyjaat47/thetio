import { useEffect } from "react";

export function ThemeTransition({
  to,
  onDone,
}: {
  to: "light" | "dark";
  onDone: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onDone, 1600);
    return () => clearTimeout(t);
  }, [onDone]);

  const isDark = to === "dark";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
      aria-hidden
    >
      {/* Soft color wash */}
      <div
        className={`absolute inset-0 animate-[themeWash_1.5s_ease-out_forwards] ${
          isDark
            ? "bg-gradient-to-b from-slate-900/30 via-slate-900/10 to-transparent"
            : "bg-gradient-to-b from-sky-200/40 via-sky-100/20 to-transparent"
        }`}
      />

      {/* Drifting cloud trio */}
      <Cloud className="left-[-20%] top-[18%] h-16 w-56" delay={0} />
      <Cloud className="left-[-30%] top-[36%] h-12 w-40" delay={0.2} />
      <Cloud className="left-[-25%] top-[58%] h-20 w-72" delay={0.05} />

      {/* Airplane */}
      <div className="absolute left-[-15%] top-[28%] animate-[planeFly_1.5s_cubic-bezier(0.22,1,0.36,1)_forwards]">
        <div className="relative">
          {/* Trail */}
          <span className="absolute right-full top-1/2 h-[3px] w-40 -translate-y-1/2 rounded-full bg-gradient-to-l from-foreground/60 to-transparent blur-[1px]" />
          <Plane isDark={isDark} />
        </div>
      </div>
    </div>
  );
}

function Cloud({ className, delay }: { className: string; delay: number }) {
  return (
    <div
      className={`absolute will-change-transform ${className}`}
      style={{
        animation: `cloudDrift 1.6s cubic-bezier(0.22,1,0.36,1) ${delay}s forwards`,
        opacity: 0,
      }}
    >
      <svg viewBox="0 0 200 80" className="h-full w-full text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] dark:text-slate-300/80">
        <path
          fill="currentColor"
          d="M40 60 Q20 60 20 45 Q20 30 40 32 Q44 16 64 18 Q78 6 96 16 Q116 6 132 22 Q156 18 162 38 Q182 38 182 52 Q182 64 162 64 Z"
        />
      </svg>
    </div>
  );
}

function Plane({ isDark }: { isDark: boolean }) {
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 64 64"
      className={isDark ? "text-slate-100" : "text-slate-800"}
    >
      <g fill="currentColor">
        <path d="M2 32 L46 22 L58 18 Q62 17 62 20 L52 32 L62 44 Q62 47 58 46 L46 42 L2 32 Z" />
        <path d="M22 30 L14 16 L20 16 L34 28 Z" opacity="0.85" />
        <path d="M22 34 L14 48 L20 48 L34 36 Z" opacity="0.85" />
      </g>
    </svg>
  );
}
