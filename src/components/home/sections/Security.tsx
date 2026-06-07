import { Lock, ShieldCheck, FileCheck2, KeyRound } from "lucide-react";

const items = [
  { i: Lock, t: "End-to-end encryption", d: "Everything we ship encrypts data at rest and in transit." },
  { i: ShieldCheck, t: "Hardened infra", d: "Cloud-native, audited stacks with zero-trust defaults." },
  { i: KeyRound, t: "Privacy by default", d: "Minimal data, scoped access, transparent processing." },
  { i: FileCheck2, t: "Compliance ready", d: "GDPR, SOC2, ISO 27001 — we build to the standards you need." },
];

export function Security() {
  return (
    <section className="bg-card py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="inline-flex rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/70">
            Security & compliance
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            Your data is protected at every level
          </h2>
          <p className="mt-4 text-foreground/65">
            We treat security as a feature, not an afterthought — so your team and your
            customers can focus on what matters.
          </p>
          <a
            href="https://wa.me/6261302023"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
          >
            Talk to our team
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((x) => (
            <div key={x.t} className="rounded-2xl border border-foreground/10 bg-background p-5">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-foreground/5">
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
