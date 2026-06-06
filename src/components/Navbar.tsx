import { useState } from "react";
import { ArrowRight, Menu, Moon, Sun, X } from "lucide-react";
import logoLight from "@/assets/logo-light.png.asset.json";
import logoDark from "@/assets/logo-dark.png.asset.json";
import { useTheme } from "./ThemeProvider";

const links = [
  { label: "Products", href: "#products" },
  { label: "Features", href: "#features" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Pricing", href: "#pricing" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-border bg-card/95 px-3 py-2 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] backdrop-blur-md sm:px-4">
        {/* Logo */}
        <a href="/" className="flex shrink-0 items-center pl-2">
          <img
            src={theme === "dark" ? logoDark.url : logoLight.url}
            alt="Company logo"
            className="h-7 w-auto sm:h-8"
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <a
            href="#cta"
            className="group hidden items-center gap-2 rounded-full bg-foreground py-1.5 pl-5 pr-1.5 text-sm font-medium text-background transition-transform hover:scale-[1.02] sm:inline-flex"
          >
            Try it free
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-background text-foreground">
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-border bg-card p-4 shadow-lg md:hidden">
          <ul className="flex flex-col gap-3">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="sm:hidden">
              <a
                href="#cta"
                className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background"
              >
                Try it free
                <ArrowRight className="h-4 w-4" />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
