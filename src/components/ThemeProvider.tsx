import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { ThemeTransition } from "./ThemeTransition.tsx";

type Theme = "light" | "dark";

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "light",
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [transition, setTransition] = useState<{ to: Theme; id: number } | null>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial: Theme = stored ?? (prefersDark ? "dark" : "light");
    setTheme(initial);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => {
    setTheme((t) => {
      const next: Theme = t === "dark" ? "light" : "dark";
      setTransition({ to: next, id: Date.now() });
      playWhoosh(next);
      return next;
    });
  };


  useEffect(() => {
    firstRender.current = false;
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
      {transition && (
        <ThemeTransition
          key={transition.id}
          to={transition.to}
          onDone={() => setTransition(null)}
        />
      )}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

function playWhoosh(to: Theme) {
  if (typeof window === "undefined") return;
  try {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    const now = ctx.currentTime;
    const duration = 1.5;
    const isDark = to === "dark";

    // Master bus with gentle limiter-style compressor
    const master = ctx.createGain();
    master.gain.value = 0.85;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.knee.value = 24;
    comp.ratio.value = 4;

    comp.attack.value = 0.005;
    comp.release.value = 0.2;
    master.connect(comp).connect(ctx.destination);

    // --- Layer 1: Pink-ish filtered noise whoosh (the wind/jet pass-by) ---
    const noiseLen = Math.floor(ctx.sampleRate * duration);
    const noiseBuf = ctx.createBuffer(1, noiseLen, ctx.sampleRate);
    const nd = noiseBuf.getChannelData(0);
    // pinkish noise via simple running average
    let last = 0;
    for (let i = 0; i < noiseLen; i++) {
      const w = Math.random() * 2 - 1;
      last = (last + w * 0.25) / 1.18;
      nd[i] = last * 2.2;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuf;

    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.Q.value = 0.9;
    bp.frequency.setValueAtTime(220, now);
    bp.frequency.exponentialRampToValueAtTime(2600, now + 0.55);
    bp.frequency.exponentialRampToValueAtTime(180, now + duration);

    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 90;

    // Stereo doppler pan: left -> right
    const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    if (panner) {
      panner.pan.setValueAtTime(-0.9, now);
      panner.pan.linearRampToValueAtTime(0.9, now + duration);
    }

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.0001, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.32, now + 0.35);
    noiseGain.gain.exponentialRampToValueAtTime(0.18, now + 0.85);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    let chain: AudioNode = noise;
    chain = chain.connect(hp);
    chain = chain.connect(bp);
    chain = chain.connect(noiseGain);
    if (panner) chain = chain.connect(panner);
    chain.connect(master);

    noise.start(now);
    noise.stop(now + duration);

    // --- Layer 2: Sub rumble (engine body) ---
    const sub = ctx.createOscillator();
    sub.type = "sine";
    sub.frequency.setValueAtTime(55, now);
    sub.frequency.exponentialRampToValueAtTime(85, now + 0.5);
    sub.frequency.exponentialRampToValueAtTime(45, now + duration);
    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(0.0001, now);
    subGain.gain.exponentialRampToValueAtTime(0.18, now + 0.3);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    sub.connect(subGain).connect(master);
    sub.start(now);
    sub.stop(now + duration);

    // --- Layer 3: Soft chime (theme arrival) - bell-like FM ---
    const chimeStart = now + 0.08;
    const chimeDur = 1.0;
    const baseFreq = isDark ? 392.0 : 587.33; // G4 for dark, D5 for light
    const partials = [
      { ratio: 1, gain: 0.22 },
      { ratio: 2, gain: 0.12 },
      { ratio: 3, gain: 0.06 },
      { ratio: 4.2, gain: 0.03 },
    ];
    partials.forEach((p) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = baseFreq * p.ratio;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, chimeStart);
      g.gain.exponentialRampToValueAtTime(p.gain, chimeStart + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, chimeStart + chimeDur);
      osc.connect(g).connect(master);
      osc.start(chimeStart);
      osc.stop(chimeStart + chimeDur + 0.05);
    });

    // Reverb-ish tail via short feedback delay
    const delay = ctx.createDelay(0.5);
    delay.delayTime.value = 0.18;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.28;
    const wet = ctx.createGain();
    wet.gain.value = 0.25;
    master.connect(delay);
    delay.connect(feedback).connect(delay);
    delay.connect(wet).connect(comp);

    setTimeout(() => ctx.close(), (duration + 0.4) * 1000);
  } catch {
    /* ignore */
  }
}
