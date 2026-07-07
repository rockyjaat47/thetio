import navoraLogo from "@/assets/navora-logo.png.asset.json";
import { useTheme } from "./ThemeProvider";

export function Logo({
  className = "",
  alt = "Navora Digital",
  variant,
}: {
  className?: string;
  alt?: string;
  variant?: "light" | "dark";
}) {
  const { theme } = useTheme();
  const useDark = variant ? variant === "dark" : theme === "dark";
  // Logo is black text on transparent — invert for dark mode so it reads on dark surfaces.
  return (
    <img
      src={navoraLogo.url}
      alt={alt}
      className={`${className} ${useDark ? "invert" : ""}`}
      draggable={false}
    />
  );
}
