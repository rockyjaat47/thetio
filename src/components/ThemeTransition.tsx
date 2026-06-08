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

  // Stars only when going to dark
  const stars = useMemo(
    () =>
      Array.from({ length: 36 }, () => ({
        top: Math.random() * 70 + 4,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 0.6,
      })),
    []
  );

  // Outgoing body = current theme (opposite of `to`)
  const outgoingIsSun = isDark; // going to dark, sun is leaving
  const incomingIsSun = !isDark; // going to light, sun is arriving

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden" aria-hidden>
      {/* Sky wash */}
      <div
        className="absolute inset-0 animate-[themeWash_1.7s_ease-out_forwards]"
        style={{
          background: isDark
            ? "radial-gradient(120% 80% at 50% 0%, oklch(0.22 0.07 270) 0%, oklch(0.13 0.05 265) 55%, transparent 100%)"
            : "radial-gradient(120% 80% at 50% 0%, oklch(0.95 0.08 80) 0%, oklch(0.93 0.05 230) 55%, transparent 100%)",
        }}
      />

      {/* Stars when going to dark */}
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
              animationDelay: `${0.4 + s.delay}s`,
              boxShadow: "0 0 6px rgba(255,255,255,0.9)",
            }}
          />
        ))}

      {/* Outgoing celestial body — swipes out to the right */}
      <div
        className="absolute left-1/2 top-[18%] will-change-transform"
        style={{
          animation: "celestialSwipeOut 0.75s cubic-bezier(0.55, 0.05, 0.7, 0.2) forwards",
        }}
      >
        {outgoingIsSun ? <Sun /> : <Moon />}
      </div>

      {/* Incoming celestial body — rises in from the left */}
      <div
        className="absolute left-1/2 top-[18%] will-change-transform"
        style={{
          animation: "celestialRiseIn 0.95s cubic-bezier(0.18, 0.7, 0.25, 1) 0.55s forwards",
          opacity: 0,
        }}
      >
        {incomingIsSun ? <Sun /> : <Moon />}
      </div>
    </div>
  );
}

function Sun() {
  return (
    <div
      className="-translate-x-1/2"
      style={{
        width: 180,
        height: 180,
      }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #fff8e0 0%, #ffd47a 38%, #f59e0b 62%, rgba(245,158,11,0) 78%)",
          boxShadow:
            "0 0 60px 10px rgba(255, 200, 120, 0.55), 0 0 140px 40px rgba(255, 170, 80, 0.35)",
        }}
      />
      <div
        className="absolute inset-[-30%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,220,150,0.35), transparent 65%)",
          filter: "blur(8px)",
        }}
      />
    </div>
  );
}

function Moon() {
  return (
    <div
      className="-translate-x-1/2"
      style={{
        width: 170,
        height: 170,
      }}
    >
      <div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 38% 38%, #fafbff 0%, #dbe1ef 42%, #94a3b8 70%, #475569 100%)",
          boxShadow:
            "0 0 50px 6px rgba(200, 215, 240, 0.45), 0 0 120px 30px rgba(120, 140, 180, 0.25), inset -12px -10px 30px rgba(15,23,42,0.35)",
        }}
      >
        {/* craters */}
        <span
          className="absolute rounded-full"
          style={{
            top: "28%",
            left: "55%",
            width: 22,
            height: 22,
            background:
              "radial-gradient(circle at 35% 35%, rgba(100,116,139,0.55), rgba(71,85,105,0.15) 70%, transparent)",
          }}
        />
        <span
          className="absolute rounded-full"
          style={{
            top: "58%",
            left: "30%",
            width: 16,
            height: 16,
            background:
              "radial-gradient(circle at 35% 35%, rgba(100,116,139,0.5), rgba(71,85,105,0.1) 70%, transparent)",
          }}
        />
        <span
          className="absolute rounded-full"
          style={{
            top: "68%",
            left: "62%",
            width: 12,
            height: 12,
            background:
              "radial-gradient(circle at 35% 35%, rgba(100,116,139,0.45), transparent 70%)",
          }}
        />
      </div>
      <div
        className="absolute inset-[-30%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(186,200,224,0.32), transparent 65%)",
          filter: "blur(10px)",
        }}
      />
    </div>
  );
}
