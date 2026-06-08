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
      playWhoosh();
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

function playWhoosh() {
  if (typeof window === "undefined") return;
  try {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    const duration = 1.2;
    const now = ctx.currentTime;

    // Whoosh: filtered noise sweep
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.value = 1.2;
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.exponentialRampToValueAtTime(3200, now + 0.5);
    filter.frequency.exponentialRampToValueAtTime(300, now + duration);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.15);
    gain.gain.linearRampToValueAtTime(0, now + duration);

    noise.connect(filter).connect(gain).connect(ctx.destination);
    noise.start(now);
    noise.stop(now + duration);
    setTimeout(() => ctx.close(), (duration + 0.1) * 1000);
  } catch {
    /* ignore */
  }
}
