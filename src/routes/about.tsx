import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Sparkles, ShieldCheck, TrendingUp, Layers, Handshake } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Navora Digital" },
      { name: "description", content: "A full-stack marketing, technology and creative company based in Lucknow. One team engineering software, AI, mobile and marketing under one roof." },
      { property: "og:title", content: "About — Navora Digital" },
      { property: "og:description", content: "One team beats five vendors. Marketing, software, AI and creative — engineered together." },
    ],
  }),
  component: AboutPage,
});

const beliefs = [
  { icon: Handshake, t: "One team beats five vendors", d: "Every handoff between agencies is a place where your message, your data or your deadline gets lost." },
  { icon: TrendingUp, t: "A campaign without a system is just spend", d: "Traffic without a CRM, follow-up flow and a real offer is money burned, not invested." },
  { icon: Sparkles, t: "Technology should remove work", d: "Not add another login. Automation exists to give your team hours back." },
  { icon: ShieldCheck, t: "Creative that doesn't sell is decoration", d: "Every asset we ship is measured against the number that matters — revenue." },
];

const differentiators = [
  { t: "One Team, Four Disciplines", d: "Marketing, technology, automation and creative production sit under one roof and one contract." },
  { t: "Built Like a Business, Not a Campaign", d: "Every engagement starts with your unit economics, not a mood board." },
  { t: "Technology-Led Execution", d: "We build the CRM, the automation and the software your growth depends on — not just the campaign that points at it." },
  { t: "Full Accountability", d: "One point of contact. One monthly report. One team that owns the result." },
];

function AboutPage() {
  return (
    <PageLayout
      title="About Navora Digital"
      subtitle="We started Navora Digital because every growing business we spoke to had the same problem: too many vendors, too little ownership, and no one accountable for the number that matters — revenue."
    >
      <div className="space-y-12">
        <section>
          <h2 className="mb-3 text-2xl font-semibold text-foreground">Who We Are</h2>
          <p className="text-foreground/80">
            Navora Digital is a full-stack marketing, technology and creative company based in Lucknow,
            built by a team with backgrounds spanning law, technology and private equity. We are not a
            marketing agency that also does some technology on the side, and we are not a software shop
            that dabbles in ads. We are one integrated operating team — engineers, strategists,
            marketers, editors, art directors and account leads — sitting under one roof, one contract,
            and one shared P&amp;L for every client we take on.
          </p>
          <p className="mt-3 text-foreground/80">
            We engineer software, AI and mobile infrastructure, and the marketing that drives demand
            for all of it. That means the same team writes your positioning, builds your website,
            wires your CRM, launches your ads, produces your creative and answers to the number at
            the end of the quarter. No vendor chain. No finger-pointing. No "that's not our scope."
          </p>
          <p className="mt-3 text-foreground/80">
            Most of the businesses we work with have been burned before — by an agency that handed
            them a beautiful deck and no pipeline, by a developer who shipped a site nobody visits,
            or by a freelancer who disappeared the week the campaign went live. Navora exists to be
            the last partner they hire, because we own the whole stack.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {[
            ["50+", "Brands scaled across India, GCC and UK"],
            ["4", "Disciplines under one roof — no vendor chain"],
            ["24/7", "AI &amp; concierge coverage on every retainer"],
          ].map(([n, l]) => (
            <div key={l} className="rounded-2xl border border-border bg-background/40 p-5 text-center">
              <div className="text-3xl font-semibold text-foreground" dangerouslySetInnerHTML={{ __html: n }} />
              <div className="mt-1 text-sm text-foreground/65" dangerouslySetInnerHTML={{ __html: l }} />
            </div>
          ))}
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-foreground">What We Believe</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {beliefs.map((b) => (
              <div key={b.t} className="rounded-2xl border border-border bg-background/40 p-5">
                <b.icon className="mb-2 h-5 w-5 text-amber-500" />
                <div className="font-medium text-foreground">{b.t}</div>
                <div className="mt-1 text-sm text-foreground/65">{b.d}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-foreground">What Makes Us Different</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {differentiators.map((d) => (
              <div key={d.t} className="rounded-2xl border border-border bg-background/40 p-6">
                <Layers className="mb-3 h-6 w-6 text-amber-500" />
                <h3 className="text-lg font-semibold text-foreground">{d.t}</h3>
                <p className="mt-2 text-foreground/75">{d.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-foreground">How We Work</h2>
          <ol className="grid gap-3 sm:grid-cols-2">
            {[
              ["01 · Understand the Business", "We learn your model, market, audience and goals before recommending a single channel. Every engagement opens with a working session on unit economics, funnel maths and the offer itself."],
              ["02 · Build the Right Strategy", "A roadmap covering priorities, messaging, channels and the systems needed to execute — sequenced against your quarter, not a generic playbook."],
              ["03 · Execute With Focus", "Campaigns, creative, platforms and automation, built by the same team that planned them. Weekly stand-ups, shared dashboards, real deadlines."],
              ["04 · Improve and Scale", "Monthly review of what worked, what didn't, and what changes next. Every quarter we resequence the roadmap against fresh data."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-2xl border border-border bg-background/40 p-5">
                <div className="text-sm font-semibold text-amber-600 dark:text-amber-400">{t}</div>
                <p className="mt-1 text-sm text-foreground/75">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Industries We Serve</h2>
          <p className="text-foreground/80">
            Our team ships across a wide surface area — real estate, healthcare, education,
            hospitality, DTC and e-commerce, professional services, B2B SaaS, political campaigns,
            and family offices building new-age brands. The common thread is not the sector; it's
            the ambition. We work best with founders and operators who want a partner accountable
            to revenue, not to hours logged.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Where We Are</h2>
          <p className="text-foreground/80">
            Headquartered in Lucknow with an extended team across Delhi, Mumbai, Bengaluru and the
            GCC. We run engagements globally — remote-first delivery, on-site whenever the work
            demands it, and always available on WhatsApp.
          </p>
        </section>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link to="/contact" className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background">
            Book a Call with Navora
          </Link>
          <Link to="/portfolio" className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground">
            View Portfolio
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
