import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

type Props = {
  className?: string;
  onTug?: (intensity: number) => void;
};

/**
 * Premium SVG Persian cat mascot.
 * - Continuous idle micro-animations (tail, ears, blink, look around).
 * - Periodically reaches up and tugs the popup (calls onTug with intensity 0..1).
 * - Click/tap plays a synthesized "meow" + grooming sequence (lick paw, clean face, stretch).
 */
export function CatMascot({ className = "", onTug }: Props) {
  const [blink, setBlink] = useState(false);
  const [grooming, setGrooming] = useState(false);
  const [lookDir, setLookDir] = useState<-1 | 0 | 1>(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Reusable animation controls
  const tailCtrl = useAnimationControls();
  const earLCtrl = useAnimationControls();
  const earRCtrl = useAnimationControls();
  const pawLCtrl = useAnimationControls();
  const pawRCtrl = useAnimationControls();
  const bodyCtrl = useAnimationControls();
  const headCtrl = useAnimationControls();
  const tongueCtrl = useAnimationControls();

  // Blink loop
  useEffect(() => {
    let alive = true;
    const loop = async () => {
      while (alive) {
        await new Promise((r) => setTimeout(r, 2500 + Math.random() * 2500));
        if (!alive) return;
        setBlink(true);
        await new Promise((r) => setTimeout(r, 120));
        setBlink(false);
      }
    };
    loop();
    return () => {
      alive = false;
    };
  }, []);

  // Look around loop
  useEffect(() => {
    let alive = true;
    const loop = async () => {
      while (alive) {
        await new Promise((r) => setTimeout(r, 3500 + Math.random() * 2500));
        if (!alive) return;
        const dirs: Array<-1 | 0 | 1> = [-1, 0, 1, 0];
        setLookDir(dirs[Math.floor(Math.random() * dirs.length)]);
      }
    };
    loop();
    return () => {
      alive = false;
    };
  }, []);

  // Idle continuous: tail sway + ear twitch
  useEffect(() => {
    tailCtrl.start({
      rotate: [0, 18, -8, 14, 0],
      transition: { duration: 3.6, repeat: Infinity, ease: "easeInOut" },
    });
    const earLoop = async () => {
      while (true) {
        await new Promise((r) => setTimeout(r, 1800 + Math.random() * 2000));
        await earLCtrl.start({ rotate: [-2, 0], transition: { duration: 0.25 } });
        await new Promise((r) => setTimeout(r, 600));
        await earRCtrl.start({ rotate: [2, 0], transition: { duration: 0.22 } });
      }
    };
    earLoop();
  }, [tailCtrl, earLCtrl, earRCtrl]);

  // Periodic popup tug
  useEffect(() => {
    let alive = true;
    const tugLoop = async () => {
      while (alive) {
        await new Promise((r) => setTimeout(r, 6500 + Math.random() * 4000));
        if (!alive || grooming) continue;
        // Raise paws
        await Promise.all([
          pawLCtrl.start({ y: -22, rotate: -14, transition: { duration: 0.55, ease: "easeOut" } }),
          pawRCtrl.start({ y: -18, rotate: 10, transition: { duration: 0.55, ease: "easeOut" } }),
        ]);
        // Tug down with slight body lean
        onTug?.(1);
        await bodyCtrl.start({ y: 3, transition: { duration: 0.35, ease: "easeOut" } });
        await new Promise((r) => setTimeout(r, 350));
        onTug?.(0);
        // Release
        await Promise.all([
          pawLCtrl.start({ y: 0, rotate: 0, transition: { duration: 0.5, ease: "easeInOut" } }),
          pawRCtrl.start({ y: 0, rotate: 0, transition: { duration: 0.5, ease: "easeInOut" } }),
          bodyCtrl.start({ y: 0, transition: { duration: 0.5, ease: "easeInOut" } }),
        ]);
      }
    };
    tugLoop();
    return () => {
      alive = false;
    };
  }, [pawLCtrl, pawRCtrl, bodyCtrl, onTug, grooming]);

  const playMeow = useCallback(() => {
    try {
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      if (!AC) return;
      const ctx = audioCtxRef.current || new AC();
      audioCtxRef.current = ctx;
      if (ctx.state === "suspended") ctx.resume();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 900;
      filter.Q.value = 4;
      osc.type = "sawtooth";
      // Pitch contour: meee -> ow
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.18);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.55);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.22, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.18, now + 0.35);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.75);
    } catch {
      /* ignore audio errors */
    }
  }, []);

  const handleClick = useCallback(async () => {
    if (grooming) return;
    setGrooming(true);
    playMeow();
    try {
      // Stretch
      await bodyCtrl.start({
        scaleX: 1.05,
        scaleY: 0.95,
        transition: { duration: 0.3, ease: "easeOut" },
      });
      await bodyCtrl.start({
        scaleX: 1,
        scaleY: 1,
        transition: { duration: 0.35, ease: "easeInOut" },
      });
      // Lick paw: raise right paw + head tilt + tongue
      await Promise.all([
        pawRCtrl.start({ x: -10, y: -28, rotate: -25, transition: { duration: 0.45 } }),
        headCtrl.start({ rotate: -10, x: -4, transition: { duration: 0.45 } }),
      ]);
      for (let i = 0; i < 3; i++) {
        await tongueCtrl.start({ scaleY: 1, opacity: 1, transition: { duration: 0.12 } });
        await tongueCtrl.start({ scaleY: 0, opacity: 0, transition: { duration: 0.18 } });
      }
      // Clean face: paw sweeps over face
      await pawRCtrl.start({ y: -34, x: -2, rotate: -8, transition: { duration: 0.3 } });
      await pawRCtrl.start({ y: -30, x: -16, rotate: -30, transition: { duration: 0.35 } });
      await pawRCtrl.start({ y: -30, x: 0, rotate: -10, transition: { duration: 0.35 } });
      // Return to idle
      await Promise.all([
        pawRCtrl.start({ x: 0, y: 0, rotate: 0, transition: { duration: 0.4 } }),
        headCtrl.start({ rotate: 0, x: 0, transition: { duration: 0.4 } }),
      ]);
    } finally {
      setGrooming(false);
    }
  }, [grooming, pawRCtrl, headCtrl, tongueCtrl, bodyCtrl, playMeow]);

  const pupilX = lookDir * 1.6;

  return (
    <motion.button
      type="button"
      aria-label="Pet the cat"
      onClick={handleClick}
      className={`group select-none ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.svg
        viewBox="0 0 200 220"
        className="h-40 w-40 drop-shadow-[0_18px_24px_rgba(0,0,0,0.18)] sm:h-48 sm:w-48"
        animate={bodyCtrl}
        style={{ originX: 0.5, originY: 1 }}
      >
        <defs>
          <radialGradient id="catFur" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#f4f1ec" />
            <stop offset="100%" stopColor="#d9d4cc" />
          </radialGradient>
          <radialGradient id="catEye" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#7ec8ff" />
            <stop offset="60%" stopColor="#2f8be0" />
            <stop offset="100%" stopColor="#0e4d8c" />
          </radialGradient>
        </defs>

        {/* Tail */}
        <motion.g animate={tailCtrl} style={{ originX: 0.35, originY: 0.9 }}>
          <path
            d="M60 195 C 30 180, 18 150, 30 120 C 40 95, 60 92, 64 110 C 58 130, 50 150, 70 175 Z"
            fill="url(#catFur)"
            stroke="#cfc8bd"
            strokeWidth="1.2"
          />
        </motion.g>

        {/* Body */}
        <ellipse cx="100" cy="170" rx="55" ry="38" fill="url(#catFur)" stroke="#cfc8bd" strokeWidth="1.2" />

        {/* Back legs/feet */}
        <ellipse cx="72" cy="200" rx="14" ry="9" fill="url(#catFur)" stroke="#cfc8bd" strokeWidth="1" />
        <ellipse cx="128" cy="200" rx="14" ry="9" fill="url(#catFur)" stroke="#cfc8bd" strokeWidth="1" />

        {/* Front paws (animated) */}
        <motion.g animate={pawLCtrl} style={{ originX: 0.5, originY: 1 }}>
          <ellipse cx="84" cy="198" rx="11" ry="8" fill="url(#catFur)" stroke="#cfc8bd" strokeWidth="1" />
          <circle cx="80" cy="196" r="1.4" fill="#e8b5b0" />
          <circle cx="84" cy="198" r="1.4" fill="#e8b5b0" />
          <circle cx="88" cy="196" r="1.4" fill="#e8b5b0" />
        </motion.g>
        <motion.g animate={pawRCtrl} style={{ originX: 0.5, originY: 1 }}>
          <ellipse cx="116" cy="198" rx="11" ry="8" fill="url(#catFur)" stroke="#cfc8bd" strokeWidth="1" />
          <circle cx="112" cy="196" r="1.4" fill="#e8b5b0" />
          <circle cx="116" cy="198" r="1.4" fill="#e8b5b0" />
          <circle cx="120" cy="196" r="1.4" fill="#e8b5b0" />
        </motion.g>

        {/* Head */}
        <motion.g animate={headCtrl} style={{ originX: 0.5, originY: 0.7 }}>
          {/* Ears */}
          <motion.path
            d="M62 108 L70 78 L88 100 Z"
            fill="url(#catFur)"
            stroke="#cfc8bd"
            strokeWidth="1.2"
            animate={earLCtrl}
            style={{ originX: 0.7, originY: 1 }}
          />
          <path d="M70 100 L75 86 L84 98 Z" fill="#f7c8c6" opacity="0.8" />
          <motion.path
            d="M138 108 L130 78 L112 100 Z"
            fill="url(#catFur)"
            stroke="#cfc8bd"
            strokeWidth="1.2"
            animate={earRCtrl}
            style={{ originX: 0.3, originY: 1 }}
          />
          <path d="M130 100 L125 86 L116 98 Z" fill="#f7c8c6" opacity="0.8" />

          {/* Face */}
          <ellipse cx="100" cy="120" rx="44" ry="40" fill="url(#catFur)" stroke="#cfc8bd" strokeWidth="1.2" />

          {/* Cheeks fluff */}
          <ellipse cx="68" cy="135" rx="10" ry="8" fill="#ffffff" opacity="0.7" />
          <ellipse cx="132" cy="135" rx="10" ry="8" fill="#ffffff" opacity="0.7" />

          {/* Eyes */}
          <g>
            <ellipse cx="85" cy="118" rx="8" ry={blink ? 0.6 : 9} fill="url(#catEye)" />
            <ellipse cx="115" cy="118" rx="8" ry={blink ? 0.6 : 9} fill="url(#catEye)" />
            {!blink && (
              <>
                <ellipse cx={85 + pupilX} cy="119" rx="1.6" ry="6.5" fill="#0a1530" />
                <ellipse cx={115 + pupilX} cy="119" rx="1.6" ry="6.5" fill="#0a1530" />
                <circle cx={83 + pupilX} cy="115" r="1.6" fill="#ffffff" />
                <circle cx={113 + pupilX} cy="115" r="1.6" fill="#ffffff" />
              </>
            )}
          </g>

          {/* Nose */}
          <path d="M97 132 L103 132 L100 136 Z" fill="#e8a4a0" stroke="#b87b78" strokeWidth="0.5" />
          {/* Mouth */}
          <path d="M100 136 Q95 142 92 140" fill="none" stroke="#7a6a60" strokeWidth="1.1" strokeLinecap="round" />
          <path d="M100 136 Q105 142 108 140" fill="none" stroke="#7a6a60" strokeWidth="1.1" strokeLinecap="round" />

          {/* Tongue (for grooming) */}
          <motion.ellipse
            cx="100"
            cy="143"
            rx="2.4"
            ry="3"
            fill="#ff8aa3"
            animate={tongueCtrl}
            initial={{ scaleY: 0, opacity: 0 }}
            style={{ originX: 0.5, originY: 0 }}
          />

          {/* Whiskers */}
          <g stroke="#b8aea2" strokeWidth="0.7" strokeLinecap="round">
            <line x1="70" y1="134" x2="50" y2="130" />
            <line x1="70" y1="138" x2="50" y2="140" />
            <line x1="130" y1="134" x2="150" y2="130" />
            <line x1="130" y1="138" x2="150" y2="140" />
          </g>
        </motion.g>
      </motion.svg>
    </motion.button>
  );
}
