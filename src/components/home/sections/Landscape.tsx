import { motion } from "framer-motion";

/**
 * Premium semi-realistic landscape: layered hills, two grass zones,
 * individual swaying grass blades, scattered flowers, and a reflective pond.
 */
export function Landscape() {
  return (
    <>
      {/* Distant hills (deep background) */}
      <svg
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-56 -z-10 h-72 w-full sm:bottom-64 sm:h-80 md:h-96"
      >
        <defs>
          <linearGradient id="lsHillsBack" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#a8c98a" />
            <stop offset="100%" stopColor="#557a4a" />
          </linearGradient>
          <filter id="lsHillsBlur"><feGaussianBlur stdDeviation="1.2" /></filter>
        </defs>
        <path
          filter="url(#lsHillsBlur)"
          d="M0,260 C220,140 380,310 620,220 C880,120 1080,300 1440,180 L1440,400 L0,400 Z"
          fill="url(#lsHillsBack)"
        />
      </svg>

      {/* Mid hills */}
      <svg
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-32 -z-10 h-80 w-full sm:bottom-40 sm:h-96 md:h-[28rem]"
      >
        <defs>
          <linearGradient id="lsHillsMid" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#9bc474" />
            <stop offset="100%" stopColor="#447a36" />
          </linearGradient>
        </defs>
        <path
          d="M0,280 C260,200 460,340 760,260 C1020,200 1220,320 1440,250 L1440,400 L0,400 Z"
          fill="url(#lsHillsMid)"
        />
      </svg>

      {/* Pond — left side, with ripples & shoreline */}
      <div className="pointer-events-none absolute -z-10 bottom-20 left-[6%] h-32 w-72 sm:bottom-24 sm:h-40 sm:w-96 md:bottom-28 md:h-48 md:w-[28rem]">
        <svg viewBox="0 0 400 200" className="h-full w-full overflow-visible">
          <defs>
            <radialGradient id="pondWater" cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#bfe2f3" />
              <stop offset="55%" stopColor="#5fa8c9" />
              <stop offset="100%" stopColor="#1e5d7a" />
            </radialGradient>
            <linearGradient id="pondShore" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#5e7a3a" stopOpacity="0.0" />
              <stop offset="100%" stopColor="#3b5a25" stopOpacity="0.85" />
            </linearGradient>
            <filter id="pondGlow"><feGaussianBlur stdDeviation="0.6" /></filter>
          </defs>
          {/* Shoreline halo */}
          <ellipse cx="200" cy="120" rx="190" ry="78" fill="url(#pondShore)" />
          {/* Water */}
          <ellipse cx="200" cy="115" rx="170" ry="62" fill="url(#pondWater)" filter="url(#pondGlow)" />
          {/* Specular highlight */}
          <ellipse cx="155" cy="95" rx="60" ry="10" fill="#ffffff" opacity="0.35" />
          <ellipse cx="240" cy="105" rx="32" ry="5" fill="#ffffff" opacity="0.25" />

          {/* Animated ripples */}
          {[0, 1, 2].map((i) => (
            <motion.ellipse
              key={i}
              cx="210"
              cy="120"
              rx="20"
              ry="6"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.55"
              strokeWidth="1.1"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: [0.4, 2.4], opacity: [0.6, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 1.3, ease: "easeOut" }}
              style={{ transformOrigin: "210px 120px" }}
            />
          ))}

          {/* Sparkles */}
          {[
            { x: 130, y: 90, d: 0 },
            { x: 250, y: 110, d: 1.4 },
            { x: 195, y: 130, d: 2.1 },
            { x: 290, y: 100, d: 0.7 },
          ].map((s, i) => (
            <motion.circle
              key={i}
              cx={s.x}
              cy={s.y}
              r="1.4"
              fill="#ffffff"
              animate={{ opacity: [0, 1, 0], scale: [0.6, 1.6, 0.6] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: s.d }}
            />
          ))}

          {/* Reeds */}
          <g stroke="#3d5a22" strokeWidth="1.6" strokeLinecap="round">
            <line x1="60" y1="140" x2="58" y2="105" />
            <line x1="66" y1="142" x2="68" y2="110" />
            <line x1="340" y1="140" x2="342" y2="108" />
            <line x1="346" y1="142" x2="344" y2="112" />
          </g>
          {/* Lily pad */}
          <ellipse cx="280" cy="135" rx="14" ry="5" fill="#3f7a3a" />
          <circle cx="280" cy="132" r="2.4" fill="#f6a8c0" />
        </svg>
      </div>

      {/* Lower grass band — large foreground with individual blades */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56 sm:h-64 md:h-72">
        <div className="absolute inset-0 bg-gradient-to-t from-[#345f25] via-[#4f8a3a]/90 to-transparent" />
        {/* Texture blades */}
        <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="bladeG" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#9ed46a" />
              <stop offset="100%" stopColor="#3d6b22" />
            </linearGradient>
          </defs>
          {Array.from({ length: 160 }).map((_, i) => {
            const x = (i * 9.1) % 1440;
            const h = 14 + ((i * 13) % 28);
            const skew = ((i * 7) % 10) - 5;
            return (
              <motion.path
                key={i}
                d={`M${x},220 Q${x + skew},${220 - h / 2} ${x + skew * 1.4},${220 - h}`}
                stroke="url(#bladeG)"
                strokeWidth={1 + ((i * 3) % 2)}
                strokeLinecap="round"
                fill="none"
                animate={{ rotate: [0, 2.2, -1.2, 0] }}
                transition={{
                  duration: 3.2 + (i % 5) * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (i % 7) * 0.15,
                }}
                style={{ transformOrigin: `${x}px 220px` }}
              />
            );
          })}
        </svg>
        {/* Scattered flowers */}
        <div className="relative h-full w-full">
          {Array.from({ length: 50 }).map((_, i) => {
            const left = (i * 137.5) % 100;
            const bottom = (i * 41) % 70;
            const palette = ["#f9c1d1", "#fff2a8", "#c4a8ff", "#ffd4a8", "#ffffff"];
            const color = palette[i % palette.length];
            const size = 5 + (i % 3) * 2;
            return (
              <span
                key={i}
                aria-hidden
                className="absolute rounded-full shadow-sm"
                style={{
                  left: `${left}%`,
                  bottom: `${bottom}%`,
                  width: size,
                  height: size,
                  background: color,
                  opacity: 0.92,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Butterfly drifting across */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -z-10 left-0 bottom-[38%] text-2xl"
        animate={{
          x: ["-5vw", "105vw"],
          y: [0, -30, 10, -20, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="28" height="22" viewBox="0 0 28 22">
          <motion.g
            animate={{ scaleX: [1, 0.4, 1] }}
            transition={{ duration: 0.35, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "14px 11px" }}
          >
            <ellipse cx="8" cy="8" rx="6" ry="7" fill="#ff85b3" opacity="0.85" />
            <ellipse cx="20" cy="8" rx="6" ry="7" fill="#ff85b3" opacity="0.85" />
            <ellipse cx="8" cy="15" rx="4.5" ry="5" fill="#ffb3cf" opacity="0.85" />
            <ellipse cx="20" cy="15" rx="4.5" ry="5" fill="#ffb3cf" opacity="0.85" />
            <rect x="13.3" y="5" width="1.4" height="14" rx="0.7" fill="#3a2a1a" />
          </motion.g>
        </svg>
      </motion.div>
    </>
  );
}
