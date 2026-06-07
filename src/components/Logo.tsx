import logoLight from "@/assets/logo-light.png.asset.json";
import logoDark from "@/assets/logo-dark.png.asset.json";
import { useTheme } from "./ThemeProvider";

export function Logo({
  className = "",
  alt = "Logo",
  variant,
}: {
  className?: string;
  alt?: string;
  variant?: "light" | "dark";
}) {
  const { theme } = useTheme();
  const useDark = variant ? variant === "dark" : theme === "dark";
  const src = useDark ? logoDark.url : logoLight.url;
  return <img src={src} alt={alt} className={className} draggable={false} />;
}
