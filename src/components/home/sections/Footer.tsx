import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Phone, Mail, Clock } from "lucide-react";

const columns = [
  {
    title: "Services",
    links: [
      ["Web Development", "/services/web-development"],
      ["SaaS Solutions", "/services/saas"],
      ["CRM Systems", "/services/crm"],
      ["AI & Automation", "/services/ai-automation"],
      ["Digital Marketing", "/services/digital-marketing"],
    ],
  },
  {
    title: "Partner",
    links: [
      ["Partner as Agency", "/partner/agency"],
      ["Partner as Influencer", "/partner/influencer"],
      ["Careers", "/partner/career"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About Us", "/about"],
      ["Portfolio", "/portfolio"],
      ["Contact Us", "/contact"],
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-foreground/10 bg-card py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <Logo className="h-8 w-auto" alt="TEO Marketing" />
          <p className="mt-3 max-w-sm text-sm text-foreground/60">
            TEO Marketing is your digital growth partner — websites, SaaS, CRM, AI and
            performance marketing under one roof.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-foreground/70">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-amber-500" /> 7828902023</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-amber-500" /> hello@teomarketing.com</li>
            <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-amber-500" /> Mon – Sat · 10 AM – 7 PM</li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {columns.map((c) => (
            <div key={c.title}>
              <div className="text-sm font-semibold">{c.title}</div>
              <ul className="mt-3 space-y-2">
                {c.links.map(([l, to]) => (
                  <li key={to}>
                    <Link to={to} className="text-sm text-foreground/60 hover:text-foreground">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-start justify-between gap-3 border-t border-foreground/10 px-4 pt-6 text-xs text-foreground/50 sm:flex-row sm:items-center sm:px-6">
        <span>© {new Date().getFullYear()} TEO Marketing. All rights reserved.</span>
        <span>Build. Brand. Grow.</span>
      </div>
    </footer>
  );
}
