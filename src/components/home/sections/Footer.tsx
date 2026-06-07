import { Link } from "@tanstack/react-router";

const columns = [
  {
    title: "Services",
    links: [
      ["Web Development", "/services/web-development"],
      ["SaaS", "/services/saas"],
      ["CRM", "/services/crm"],
      ["AI & Automation", "/services/ai-automation"],
      ["Digital Marketing", "/services/digital-marketing"],
    ],
  },
  {
    title: "Partner",
    links: [
      ["Partner as Agency", "/partner/agency"],
      ["Partner as Influencer", "/partner/influencer"],
      ["Career", "/partner/career"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About us", "/about"],
      ["Portfolio", "/portfolio"],
      ["Contact us", "/contact"],
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-foreground/10 bg-card py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <div className="text-2xl font-semibold tracking-tight">+co</div>
          <p className="mt-3 max-w-sm text-sm text-foreground/60">
            A full-stack digital studio building products, platforms and growth engines
            for ambitious teams.
          </p>
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
        <span>© {new Date().getFullYear()} +co Studio. All rights reserved.</span>
        <span>Made with care.</span>
      </div>
    </footer>
  );
}
