import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { ThemeTransition } from "./ThemeTransition.tsx";
import whooshAsset from "@/assets/sfx/whoosh.mp3.asset.json";
import birdsAsset from "@/assets/sfx/birds-morning.mp3.asset.json";
import owlAsset from "@/assets/sfx/owl-night.mp3.asset.json";

type Theme = "light" | "dark";

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "light",
  toggle: () => {},
});

const TRANSITION_MS = 1700;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [transition, setTransition] = useState<{ to: Theme; id: number } | null>(null);
  const lockRef = useRef(false);
  const audioRef = useRef<{
    whoosh: HTMLAudioElement;
    birds: HTMLAudioElement;
    owl: HTMLAudioElement;
  } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial: Theme = stored ?? (prefersDark ? "dark" : "light");
    setTheme(initial);

    // Preload sounds
    const mk = (url: string) => {
      const a = new Audio(url);
      a.preload = "auto";
      a.volume = 0.55;
      return a;
    };
    audioRef.current = {
      whoosh: mk(whooshAsset.url),
      birds: mk(birdsAsset.url),
      owl: mk(owlAsset.url),
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => {
    if (lockRef.current) return;
    lockRef.current = true;
    setTheme((t) => {
      const next: Theme = t === "dark" ? "light" : "dark";
      setTransition({ to: next, id: Date.now() });
      document.documentElement.setAttribute("data-theme-transitioning", "true");
      playSwap(next, audioRef.current);
      return next;
    });
    window.setTimeout(() => {
      lockRef.current = false;
      document.documentElement.removeAttribute("data-theme-transitioning");
    }, TRANSITION_MS);
  };

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

function playSwap(
  to: Theme,
  audio: { whoosh: HTMLAudioElement; birds: HTMLAudioElement; owl: HTMLAudioElement } | null,
) {
  if (!audio) return;
  try {
    audio.whoosh.currentTime = 0;
    void audio.whoosh.play().catch(() => {});
  } catch {
    /* ignore */
  }
  const arrival = to === "dark" ? audio.owl : audio.birds;
  window.setTimeout(() => {
    try {
      arrival.currentTime = 0;
      void arrival.play().catch(() => {});
    } catch {
      /* ignore */
    }
  }, 550);
}
