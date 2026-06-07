import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimationControls, useMotionValue } from "framer-motion";

type Props = {
  className?: string;
  onTug?: (intensity: number) => void;
};

/**
 * Semi-realistic white Persian cat mascot (pure SVG, no external assets).
 * Layered fur gradients, detailed eyes with reflections, soft drop shadow.
 *
 * Behavior loop (autonomous):
 *  - Blinks, twitches ears, sways tail, looks around toward cursor.
 *  - Periodically reaches up and tugs the popup (calls onTug with intensity 0..1).
 *  - Occasionally stretches / lies down / grooms paws on its own.
 *  - Click: synthesized meow + one random reaction animation, debounced.
 */
export function CatMascot({ className = "", onTug }: Props) {
  const [blink, setBlink] = useState(false);
  const [busy, setBusy] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Pupil tracking (cursor)
  const pupilX = useMotionValue(0);
  const pupilY = useMotionValue(0);

  const tailCtrl = useAnimationControls();
  const earLCtrl = useAnimationControls();
  const earRCtrl = useAnimationControls();
  const pawLCtrl = useAnimationControls();
  const pawRCtrl = useAnimationControls();
  const bodyCtrl = useAnimationControls();
  const headCtrl = useAnimationControls();
  const tongueCtrl = useAnimationControls();

  // Cursor tracking — pupils drift toward mouse
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX / window.innerWidth - 0.5;
      const dy = e.clientY / window.innerHeight - 0.5;
      pupilX.set(Math.max(-2.2, Math.min(2.2, dx * 4)));
      pupilY.set(Math.max(-1.4, Math.min(1.4, dy * 3)));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [pupilX, pupilY]);

  // Blink loop
  useEffect(() => {
    let alive = true;
    (async () => {
      while (alive) {
        await new Promise((r) => setTimeout(r, 2500 + Math.random() * 2500));
        if (!alive) return;
        setBlink(true);
        await new Promise((r) => setTimeout(r, 110));
        setBlink(false);
        // Occasional double blink
        if (Math.random() < 0.3) {
          await new Promise((r) => setTimeout(r, 140));
          setBlink(true);
          await new Promise((r) => setTimeout(r, 110));
          setBlink(false);
        }
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Continuous idle: tail sway + ear twitches
  useEffect(() => {
    tailCtrl.start({
      rotate: [0, 16, -6, 12, 0],
      transition: { duration: 3.8, repeat: Infinity, ease: "easeInOut" },
    });
    let alive = true;
    (async () => {
      while (alive) {
        await new Promise((r) => setTimeout(r, 1800 + Math.random() * 2200));
        if (!alive) return;
        await earLCtrl.start({ rotate: [-3, 0], transition: { duration: 0.25 } });
        await new Promise((r) => setTimeout(r, 500));
        await earRCtrl.start({ rotate: [3, 0], transition: { duration: 0.22 } });
      }
    })();
    return () => {
      alive = false;
    };
  }, [tailCtrl, earLCtrl, earRCtrl]);

  // Tug popup loop + spontaneous behaviors
  useEffect(() => {
    let alive = true;
    (async () => {
      while (alive) {
        await new Promise((r) => setTimeout(r, 5500 + Math.random() * 4500));
        if (!alive || busy) continue;

        const roll = Math.random();
        if (roll < 0.55) {
          // Reach up + tug the popup
          setBusy(true);
          await Promise.all([
            pawLCtrl.start({ y: -26, rotate: -16, transition: { duration: 0.55, ease: "easeOut" } }),
            pawRCtrl.start({ y: -22, rotate: 12, transition: { duration: 0.55, ease: "easeOut" } }),
            bodyCtrl.start({ y: -6, transition: { duration: 0.55 } }),
          ]);
          onTug?.(1);
          await bodyCtrl.start({ y: 2, transition: { duration: 0.35, ease: "easeOut" } });
          await new Promise((r) => setTimeout(r, 320));
          onTug?.(0);
          await Promise.all([
            pawLCtrl.start({ y: 0, rotate: 0, transition: { duration: 0.5, ease: "easeInOut" } }),
            pawRCtrl.start({ y: 0, rotate: 0, transition: { duration: 0.5, ease: "easeInOut" } }),
            bodyCtrl.start({ y: 0, transition: { duration: 0.5, ease: "easeInOut" } }),
          ]);
          setBusy(false);
        } else if (roll < 0.8) {
          // Stretch
          setBusy(true);
          await bodyCtrl.start({ scaleX: 1.08, scaleY: 0.94, transition: { duration: 0.4 } });
          await bodyCtrl.start({ scaleX: 1, scaleY: 1, transition: { duration: 0.4 } });
          setBusy(false);
        } else {
          // Head tilt — watching something
          setBusy(true);
          await headCtrl.start({ rotate: -8, transition: { duration: 0.4 } });
          await new Promise((r) => setTimeout(r, 700));
          await headCtrl.start({ rotate: 0, transition: { duration: 0.4 } });
          setBusy(false);
        }
      }
    })();
    return () => {
      alive = false;
    };
  }, [pawLCtrl, pawRCtrl, bodyCtrl, headCtrl, onTug, busy]);

  const playMeow = useCallback(() => {
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return;
      const ctx = audioCtxRef.current || new AC();
      audioCtxRef.current = ctx;
      if (ctx.state === "suspended") ctx.resume();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 950;
      filter.Q.value = 5;
      osc.type = "sawtooth";
      osc2.type = "triangle";
      osc.frequency.setValueAtTime(580, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.18);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.6);
      osc2.frequency.setValueAtTime(290, now);
      osc2.frequency.exponentialRampToValueAtTime(440, now + 0.2);
      osc2.frequency.exponentialRampToValueAtTime(210, now + 0.6);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.22, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.18, now + 0.35);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);
      osc.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc2.start(now);
      osc.stop(now + 0.8);
      osc2.stop(now + 0.8);
    } catch {
      /* ignore */
    }
  }, []);

  const handleClick = useCallback(async () => {
    if (busy) return;
    setBusy(true);
    playMeow();
    try {
      const reactions = ["groom", "roll", "look", "stretch", "wag"] as const;
      const pick = reactions[Math.floor(Math.random() * reactions.length)];

      if (pick === "stretch") {
        await bodyCtrl.start({ scaleX: 1.1, scaleY: 0.92, transition: { duration: 0.35 } });
        await bodyCtrl.start({ scaleX: 1, scaleY: 1, transition: { duration: 0.4 } });
      } else if (pick === "look") {
        await headCtrl.start({ rotate: -12, transition: { duration: 0.35 } });
        await new Promise((r) => setTimeout(r, 600));
        await headCtrl.start({ rotate: 0, transition: { duration: 0.35 } });
      } else if (pick === "wag") {
        await tailCtrl.start({
          rotate: [0, 30, -20, 30, -20, 0],
          transition: { duration: 1.4, ease: "easeInOut" },
        });
      } else if (pick === "roll") {
        await bodyCtrl.start({ rotate: -10, y: 4, transition: { duration: 0.4 } });
        await bodyCtrl.start({ rotate: 8, transition: { duration: 0.4 } });
        await bodyCtrl.start({ rotate: 0, y: 0, transition: { duration: 0.4 } });
      } else {
        // groom: lick paw + clean face
        await Promise.all([
          pawRCtrl.start({ x: -10, y: -30, rotate: -25, transition: { duration: 0.45 } }),
          headCtrl.start({ rotate: -10, x: -4, transition: { duration: 0.45 } }),
        ]);
        for (let i = 0; i < 3; i++) {
          await tongueCtrl.start({ scaleY: 1, opacity: 1, transition: { duration: 0.12 } });
          await tongueCtrl.start({ scaleY: 0, opacity: 0, transition: { duration: 0.18 } });
        }
        await pawRCtrl.start({ y: -36, x: -2, rotate: -8, transition: { duration: 0.3 } });
        await pawRCtrl.start({ y: -32, x: -16, rotate: -30, transition: { duration: 0.35 } });
        await Promise.all([
          pawRCtrl.start({ x: 0, y: 0, rotate: 0, transition: { duration: 0.4 } }),
          headCtrl.start({ rotate: 0, x: 0, transition: { duration: 0.4 } }),
        ]);
      }
    } finally {
      setBusy(false);
    }
  }, [busy, pawRCtrl, headCtrl, tongueCtrl, bodyCtrl, tailCtrl, playMeow]);

  return (
    <motion.button
      type="button"
      aria-label="Pet the Persian cat"
      onClick={handleClick}
      className={`group select-none ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.svg
        viewBox="0 0 220 240"
        className="h-44 w-44 drop-shadow-[0_22px_28px_rgba(0,0,0,0.28)] sm:h-56 sm:w-56"
        animate={bodyCtrl}
        style={{ originX: 0.5, originY: 1 }}
      >
        <defs>
          {/* Multi-stop fur for soft volume */}
          <radialGradient id="furBody" cx="50%" cy="35%" r="75%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#f4f0e8" />
            <stop offset="85%" stopColor="#dad3c5" />
            <stop offset="100%" stopColor="#a89e8a" />
          </radialGradient>
          <radialGradient id="furHead" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#f6f2ea" />
            <stop offset="100%" stopColor="#c8c0ad" />
          </radialGradient>
          <radialGradient id="eyeIris" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#b6e3ff" />
            <stop offset="45%" stopColor="#4ea3e0" />
            <stop offset="85%" stopColor="#1e5a92" />
            <stop offset="100%" stopColor="#0a2b4a" />
          </radialGradient>
          <radialGradient id="nosePink" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffc4bf" />
            <stop offset="100%" stopColor="#b96e6a" />
          </radialGradient>
          <linearGradient id="contactShadow" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#000" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </linearGradient>
          <filter id="softBlur"><feGaussianBlur stdDeviation="1.4" /></filter>
        </defs>

        {/* Contact shadow under cat */}
        <ellipse cx="110" cy="222" rx="68" ry="8" fill="url(#contactShadow)" />

        {/* Tail */}
        <motion.g animate={tailCtrl} style={{ originX: 0.32, originY: 0.92 }}>
          <path
            d="M62 200 C 28 188, 16 152, 30 118 C 42 88, 66 86, 70 110 C 62 132, 52 156, 74 182 Z"
            fill="url(#furBody)"
            stroke="#b8ad97"
            strokeOpacity="0.5"
            strokeWidth="1"
          />
          {/* Fur tufts */}
          <path d="M30 118 q -6 -4 -8 -10 M36 108 q -8 -2 -10 -8 M44 100 q -6 -3 -8 -9" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.8" />
        </motion.g>

        {/* Body */}
        <g>
          <ellipse cx="112" cy="178" rx="62" ry="42" fill="url(#furBody)" />
          {/* Fluffy chest */}
          <ellipse cx="112" cy="158" rx="34" ry="22" fill="#ffffff" opacity="0.85" filter="url(#softBlur)" />
          {/* Soft side shading */}
          <ellipse cx="150" cy="190" rx="28" ry="22" fill="#000" opacity="0.06" filter="url(#softBlur)" />
        </g>

        {/* Back feet */}
        <ellipse cx="78" cy="210" rx="15" ry="9" fill="url(#furBody)" />
        <ellipse cx="146" cy="210" rx="15" ry="9" fill="url(#furBody)" />

        {/* Front paws (animated) */}
        <motion.g animate={pawLCtrl} style={{ originX: 0.5, originY: 1 }}>
          <ellipse cx="92" cy="208" rx="12" ry="9" fill="url(#furBody)" />
          <circle cx="87" cy="206" r="1.5" fill="#e8b5b0" />
          <circle cx="92" cy="208" r="1.5" fill="#e8b5b0" />
          <circle cx="97" cy="206" r="1.5" fill="#e8b5b0" />
        </motion.g>
        <motion.g animate={pawRCtrl} style={{ originX: 0.5, originY: 1 }}>
          <ellipse cx="128" cy="208" rx="12" ry="9" fill="url(#furBody)" />
          <circle cx="123" cy="206" r="1.5" fill="#e8b5b0" />
          <circle cx="128" cy="208" r="1.5" fill="#e8b5b0" />
          <circle cx="133" cy="206" r="1.5" fill="#e8b5b0" />
        </motion.g>

        {/* Head group */}
        <motion.g animate={headCtrl} style={{ originX: 0.5, originY: 0.72 }}>
          {/* Ears */}
          <motion.g animate={earLCtrl} style={{ originX: "70px", originY: "100px" }}>
            <path d="M64 112 L72 76 L92 102 Z" fill="url(#furHead)" stroke="#bcb29b" strokeOpacity="0.5" strokeWidth="0.8" />
            <path d="M74 102 L78 84 L88 100 Z" fill="#f4b5b1" opacity="0.85" />
            {/* Ear fluff */}
            <path d="M72 76 q -3 6 -1 12 M68 86 q -3 4 -1 10" stroke="#fff" strokeWidth="0.8" fill="none" opacity="0.9" />
          </motion.g>
          <motion.g animate={earRCtrl} style={{ originX: "150px", originY: "100px" }}>
            <path d="M156 112 L148 76 L128 102 Z" fill="url(#furHead)" stroke="#bcb29b" strokeOpacity="0.5" strokeWidth="0.8" />
            <path d="M146 102 L142 84 L132 100 Z" fill="#f4b5b1" opacity="0.85" />
            <path d="M148 76 q 3 6 1 12 M152 86 q 3 4 1 10" stroke="#fff" strokeWidth="0.8" fill="none" opacity="0.9" />
          </motion.g>

          {/* Face (fluffy round Persian) */}
          <ellipse cx="110" cy="124" rx="50" ry="44" fill="url(#furHead)" />
          {/* Cheek fluff */}
          <ellipse cx="72" cy="142" rx="14" ry="10" fill="#ffffff" opacity="0.85" filter="url(#softBlur)" />
          <ellipse cx="148" cy="142" rx="14" ry="10" fill="#ffffff" opacity="0.85" filter="url(#softBlur)" />
          {/* Forehead mark (subtle) */}
          <ellipse cx="110" cy="100" rx="14" ry="6" fill="#fff" opacity="0.7" filter="url(#softBlur)" />

          {/* Eyes — large round Persian-style */}
          <g>
            {/* Eye whites */}
            <ellipse cx="92" cy="124" rx="10" ry={blink ? 0.6 : 10.5} fill="#fff" />
            <ellipse cx="128" cy="124" rx="10" ry={blink ? 0.6 : 10.5} fill="#fff" />
            {/* Iris */}
            {!blink && (
              <>
                <motion.g style={{ x: pupilX, y: pupilY }}>
                  <circle cx="92" cy="124" r="9" fill="url(#eyeIris)" />
                  <circle cx="128" cy="124" r="9" fill="url(#eyeIris)" />
                  {/* Slit pupils */}
                  <ellipse cx="92" cy="125" rx="1.6" ry="7" fill="#0a1530" />
                  <ellipse cx="128" cy="125" rx="1.6" ry="7" fill="#0a1530" />
                  {/* Catchlights */}
                  <circle cx="89" cy="120" r="2" fill="#ffffff" />
                  <circle cx="125" cy="120" r="2" fill="#ffffff" />
                  <circle cx="94" cy="127" r="0.9" fill="#ffffff" opacity="0.7" />
                  <circle cx="130" cy="127" r="0.9" fill="#ffffff" opacity="0.7" />
                </motion.g>
              </>
            )}
            {/* Eye rim shadow */}
            <ellipse cx="92" cy="124" rx="10" ry="10.5" fill="none" stroke="#000" strokeOpacity="0.12" strokeWidth="0.8" />
            <ellipse cx="128" cy="124" rx="10" ry="10.5" fill="none" stroke="#000" strokeOpacity="0.12" strokeWidth="0.8" />
          </g>

          {/* Flat Persian nose bridge shadow */}
          <ellipse cx="110" cy="136" rx="9" ry="5" fill="#000" opacity="0.05" />
          {/* Nose */}
          <path d="M105 140 L115 140 L110 146 Z" fill="url(#nosePink)" stroke="#9a5552" strokeWidth="0.6" />
          {/* Mouth */}
          <path d="M110 146 Q103 152 99 149" fill="none" stroke="#6e5f55" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M110 146 Q117 152 121 149" fill="none" stroke="#6e5f55" strokeWidth="1.2" strokeLinecap="round" />

          {/* Tongue */}
          <motion.ellipse
            cx="110"
            cy="152"
            rx="2.6"
            ry="3.2"
            fill="#ff8aa3"
            animate={tongueCtrl}
            initial={{ scaleY: 0, opacity: 0 }}
            style={{ originX: 0.5, originY: 0 }}
          />

          {/* Whiskers */}
          <g stroke="#b8aea2" strokeWidth="0.7" strokeLinecap="round" opacity="0.9">
            <line x1="78" y1="142" x2="52" y2="138" />
            <line x1="78" y1="146" x2="52" y2="148" />
            <line x1="78" y1="150" x2="52" y2="156" />
            <line x1="142" y1="142" x2="168" y2="138" />
            <line x1="142" y1="146" x2="168" y2="148" />
            <line x1="142" y1="150" x2="168" y2="156" />
          </g>
        </motion.g>
      </motion.svg>
    </motion.button>
  );
}
