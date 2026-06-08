import { useEffect, useMemo } from "react";

export function ThemeTransition({
  to,
  onDone,
}: {
  to: "light" | "dark";
  onDone: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onDone, 1700);
    return () => clearTimeout(t);
  }, [onDone]);

  const isDark = to === "dark";

  // Generate parallax cloud layers
  const clouds = useMemo(
    () => [
      // back layer (small, slow, soft)
      { top: "8%",  size: 90,  delay: 0.0,  blur: 2,   opacity: 0.55, dur: 1.7 },
      { top: "22%", size: 130, delay: 0.15, blur: 1.5, opacity: 0.65, dur: 1.7 },
      { top: "62%", size: 110, delay: 0.05, blur: 2,   opacity: 0.5,  dur: 1.7 },
      // mid layer
      { top: "34%", size: 180, delay: 0.0,  blur: 0.6, opacity: 0.85, dur: 1.5 },
      { top: "70%", size: 200, delay: 0.2,  blur: 0.4, opacity: 0.9,  dur: 1.5 },
      // front layer (large, fast, crisp)
      { top: "48%", size: 260, delay: 0.1,  blur: 0,   opacity: 1,    dur: 1.3 },
      { top: "84%", size: 230, delay: 0.25, blur: 0,   opacity: 0.95, dur: 1.3 },
    ],
    []
  );

  // Stars (only when going to dark)
  const stars = useMemo(
    () =>
      Array.from({ length: 28 }, () => ({
        top: Math.random() * 80 + 5,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 0.6,
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden" aria-hidden>
      {/* Sky color wash */}
      <div
        className="absolute inset-0 animate-[themeWash_1.7s_ease-out_forwards]"
        style={{
          background: isDark
            ? "linear-gradient(180deg, oklch(0.18 0.05 265) 0%, oklch(0.13 0.04 265) 60%, transparent 100%)"
            : "linear-gradient(180deg, oklch(0.92 0.06 230) 0%, oklch(0.96 0.03 230) 55%, transparent 100%)",
        }}
      />

      {/* Stars on dark */}
      {isDark &&
        stars.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-[starTwinkle_1.7s_ease-out_forwards]"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
              boxShadow: "0 0 6px rgba(255,255,255,0.9)",
            }}
          />
        ))}

      {/* Cloud layers with parallax */}
      {clouds.map((c, i) => (
        <Cloud
          key={i}
          top={c.top}
          size={c.size}
          delay={c.delay}
          blur={c.blur}
          opacity={c.opacity}
          duration={c.dur}
          isDark={isDark}
        />
      ))}

      {/* Airplane */}
      <div
        className="absolute left-[-20%] top-[40%] will-change-transform"
        style={{
          animation: "planeFly 1.7s cubic-bezier(0.22, 0.61, 0.36, 1) forwards",
        }}
      >
        <div className="relative">
          {/* Long, soft contrail */}
          <span
            className="absolute right-full top-1/2 h-[6px] w-[280px] -translate-y-1/2 rounded-full"
            style={{
              background: isDark
                ? "linear-gradient(to left, rgba(226,232,240,0.85), rgba(226,232,240,0))"
                : "linear-gradient(to left, rgba(255,255,255,0.95), rgba(255,255,255,0))",
              filter: "blur(3px)",
              opacity: 0.9,
            }}
          />
          <span
            className="absolute right-full top-1/2 h-[2px] w-[140px] -translate-y-1/2 rounded-full"
            style={{
              background: isDark
                ? "linear-gradient(to left, rgba(255,255,255,0.9), rgba(255,255,255,0))"
                : "linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))",
            }}
          />
          <Plane isDark={isDark} />
        </div>
      </div>
    </div>
  );
}

function Cloud({
  top,
  size,
  delay,
  blur,
  opacity,
  duration,
  isDark,
}: {
  top: string;
  size: number;
  delay: number;
  blur: number;
  opacity: number;
  duration: number;
  isDark: boolean;
}) {
  return (
    <div
      className="absolute left-[-30%] will-change-transform"
      style={{
        top,
        width: size,
        height: size * 0.5,
        opacity: 0,
        filter: `blur(${blur}px)`,
        animation: `cloudDrift ${duration}s cubic-bezier(0.22,0.61,0.36,1) ${delay}s forwards`,
        ["--cloud-opacity" as any]: opacity,
      }}
    >
      <svg viewBox="0 0 200 100" className="h-full w-full">
        <defs>
          <radialGradient id={`cg-${size}-${delay}`} cx="50%" cy="40%" r="60%">
            <stop
              offset="0%"
              stopColor={isDark ? "#cbd5e1" : "#ffffff"}
              stopOpacity="1"
            />
            <stop
              offset="100%"
              stopColor={isDark ? "#64748b" : "#e0e7ef"}
              stopOpacity="0.85"
            />
          </radialGradient>
        </defs>
        <path
          fill={`url(#cg-${size}-${delay})`}
          d="M30 75 Q10 75 12 55 Q14 38 34 40 Q40 18 64 22 Q80 6 102 18 Q124 4 142 22 Q166 18 174 42 Q194 44 192 62 Q190 78 168 78 Z"
          style={{
            filter: isDark
              ? "drop-shadow(0 6px 14px rgba(0,0,0,0.35))"
              : "drop-shadow(0 8px 18px rgba(15,23,42,0.18))",
          }}
        />
      </svg>
    </div>
  );
}

function Plane({ isDark }: { isDark: boolean }) {
  return (
    <svg width="96" height="60" viewBox="0 0 160 90" style={{ filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.25))" }}>
      <defs>
        <linearGradient id="fuselage" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={isDark ? "#f1f5f9" : "#ffffff"} />
          <stop offset="55%" stopColor={isDark ? "#cbd5e1" : "#e2e8f0"} />
          <stop offset="100%" stopColor={isDark ? "#64748b" : "#94a3b8"} />
        </linearGradient>
        <linearGradient id="wing" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={isDark ? "#94a3b8" : "#cbd5e1"} />
          <stop offset="100%" stopColor={isDark ? "#475569" : "#64748b"} />
        </linearGradient>
        <linearGradient id="stripe" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      {/* Tail fin */}
      <path d="M18 45 L4 22 L18 28 L34 45 Z" fill="url(#wing)" />
      {/* Lower wing (back) */}
      <path d="M58 52 L40 78 L62 70 L86 54 Z" fill="url(#wing)" opacity="0.9" />
      {/* Upper wing (back) */}
      <path d="M58 38 L40 12 L62 20 L86 36 Z" fill="url(#wing)" opacity="0.95" />
      {/* Fuselage */}
      <path
        d="M10 45 Q14 36 30 34 L120 32 Q146 32 154 45 Q146 58 120 58 L30 56 Q14 54 10 45 Z"
        fill="url(#fuselage)"
      />
      {/* Accent stripe */}
      <path
        d="M30 46 L150 46 Q150 49 148 49 L30 49 Z"
        fill="url(#stripe)"
        opacity="0.9"
      />
      {/* Windows */}
      <g fill={isDark ? "#0f172a" : "#1e293b"} opacity="0.85">
        {Array.from({ length: 8 }).map((_, i) => (
          <circle key={i} cx={42 + i * 11} cy={42} r="2" />
        ))}
      </g>
      {/* Cockpit */}
      <path
        d="M138 40 Q150 41 152 45 Q150 49 138 50 Z"
        fill={isDark ? "#1e3a8a" : "#3b82f6"}
        opacity="0.85"
      />
      {/* Nose highlight */}
      <path d="M150 44 Q154 45 150 46 Z" fill="#ffffff" opacity="0.6" />
    </svg>
  );
}
