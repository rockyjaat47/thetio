import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  ChevronDown,
  Handshake,
  Info,
  Mail,
  Menu,
  Moon,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import logoLight from "@/assets/logo-light.png.asset.json";
import logoDark from "@/assets/logo-dark.png.asset.json";
import { useTheme } from "./ThemeProvider";

type SubItem = { label: string; to: string };
type NavItem = {
  label: string;
  to?: string;
  icon: typeof Info;
  children?: SubItem[];
};

const navItems: NavItem[] = [
  { label: "About us", to: "/about", icon: Info },
  { label: "Portfolio", to: "/portfolio", icon: Briefcase },
  {
    label: "Services",
    icon: Sparkles,
    children: [
      { label: "Web Development", to: "/services/web-development" },
      { label: "SaaS", to: "/services/saas" },
      { label: "CRM", to: "/services/crm" },
      { label: "AI Agent & Automation", to: "/services/ai-automation" },
      { label: "Digital Marketing", to: "/services/digital-marketing" },
    ],
  },
  {
    label: "Partner",
    icon: Handshake,
    children: [
      { label: "Partner as Agency", to: "/partner/agency" },
      { label: "Partner as Influencer", to: "/partner/influencer" },
      { label: "Career", to: "/partner/career" },
    ],
  },
  { label: "Contact us", to: "/contact", icon: Mail },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState<string | null>(null);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:px-4">
      <nav className="relative mx-auto flex max-w-3xl items-center justify-between gap-2 overflow-visible rounded-full border border-white/30 bg-white/15 px-2 py-1.5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.18),inset_0_1px_0_0_rgba(255,255,255,0.45),inset_0_-1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-2xl backdrop-saturate-150 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.12)]">
        {/* Sheen overlay (non-blocking) */}
        <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-transparent to-white/5 dark:from-white/10 dark:to-white/[0.02]" />

        {/* Logo */}
        <Link to="/" className="relative flex shrink-0 items-center pl-1.5">
          <img
            src={theme === "dark" ? logoDark.url : logoLight.url}
            alt="Company logo"
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        {/* Desktop icon links */}
        <ul className="relative hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.label} className="group relative">
              {item.to ? (
                <Link
                  to={item.to}
                  aria-label={item.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                >
                  <item.icon className="h-4 w-4" />
                </Link>
              ) : (
                <button
                  type="button"
                  aria-label={item.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                >
                  <item.icon className="h-4 w-4" />
                </button>
              )}

              {/* Tooltip */}
              <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-foreground px-2.5 py-1 text-xs font-medium text-background opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                {item.label}
              </span>

              {/* Dropdown */}
              {item.children && (
                <div className="invisible absolute left-1/2 top-full z-10 mt-8 w-56 -translate-x-1/2 rounded-2xl border border-border bg-popover p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">
                  <ul className="flex flex-col">
                    {item.children.map((c) => (
                      <li key={c.to}>
                        <Link
                          to={c.to}
                          className="block rounded-lg px-3 py-2 text-sm text-popover-foreground/80 transition-colors hover:bg-accent hover:text-popover-foreground"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="relative flex items-center gap-1">
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <a
            href="https://wa.me/6261302023"
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden items-center gap-2 rounded-full bg-foreground py-1.5 pl-4 pr-1.5 text-sm font-medium text-background transition-transform hover:scale-[1.02] sm:inline-flex"
          >
            <span className="hidden lg:inline">Connect</span>
            <span className="lg:hidden">Connect</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-background text-foreground">
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="mx-auto mt-2 max-w-3xl rounded-2xl border border-border bg-card/95 p-3 shadow-xl backdrop-blur-xl md:hidden">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <>
                    <button
                      onClick={() =>
                        setMobileSub((s) => (s === item.label ? null : item.label))
                      }
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
                    >
                      <span className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          mobileSub === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {mobileSub === item.label && (
                      <ul className="ml-6 mt-1 flex flex-col border-l border-border pl-3">
                        {item.children.map((c) => (
                          <li key={c.to}>
                            <Link
                              to={c.to}
                              onClick={() => setOpen(false)}
                              className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.to!}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li className="mt-2 sm:hidden">
              <a
                href="https://wa.me/6261302023"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background"
              >
                Connect
                <ArrowRight className="h-4 w-4" />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
