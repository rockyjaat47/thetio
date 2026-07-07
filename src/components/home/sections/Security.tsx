import { Lock, ShieldCheck, FileCheck2, KeyRound } from "lucide-react";
import { Link } from "@tanstack/react-router";

const items = [
  { i: Lock, t: "Secure code & infra", d: "Modern stacks, encrypted data, and hardened deployments." },
  { i: ShieldCheck, t: "Reliable hosting", d: "99.9% uptime on enterprise cloud infrastructure." },
  { i: KeyRound, t: "Privacy first", d: "Your data stays yours — minimal collection, clear ownership." },
  { i: FileCheck2, t: "Compliance ready", d: "GDPR-friendly, audit-ready development practices." },
];

export function Security() {
  return (
    <section className="bg-card py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="inline-flex rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
            Security & trust
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            Built to enterprise-grade standards
          </h2>
          <p className="mt-4 text-foreground/65">
            Every website, platform, automation and campaign we ship is engineered for security,
            performance and long-term reliability — so your business stays protected as it scales.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
          >
            Talk to Our Team
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((x) => (
            <div key={x.t} className="rounded-2xl border border-foreground/10 bg-background p-5">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <x.i className="h-5 w-5" />
              </div>
              <div className="mt-4 text-sm font-semibold">{x.t}</div>
              <p className="mt-1 text-sm text-foreground/60">{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
