import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Sparkles, Eye, Target, ShieldCheck, TrendingUp, Heart, Zap } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — TEO Marketing" },
      { name: "description", content: "TEO Marketing is your digital growth partner — websites, automation, CRM, AI and marketing under one roof." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Sparkles, t: "Innovation", d: "We adopt the latest tech to keep your business ahead." },
  { icon: ShieldCheck, t: "Transparency", d: "Clear timelines, clear pricing, clear communication." },
  { icon: TrendingUp, t: "Growth", d: "Every decision is measured against business outcomes." },
  { icon: Zap, t: "Reliability", d: "On-time delivery and dependable long-term support." },
  { icon: Heart, t: "Customer Success", d: "Your win is our win — we stay invested after launch." },
];

function AboutPage() {
  return (
    <PageLayout title="About TEO Marketing" subtitle="Your Digital Growth Partner">
      <div className="space-y-10">
        <section>
          <h2 className="mb-3 text-2xl font-semibold text-foreground">Our Story</h2>
          <p className="text-foreground/80">
            TEO Marketing was founded with a mission to help businesses build a powerful digital
            presence through professional websites, automation systems and marketing strategies.
          </p>
          <p className="mt-3 text-foreground/80">
            We believe every business deserves access to modern technology, professional branding
            and scalable growth solutions.
          </p>
        </section>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-background/40 p-6">
            <Target className="mb-3 h-6 w-6 text-amber-500" />
            <h3 className="text-lg font-semibold text-foreground">Mission</h3>
            <p className="mt-2 text-foreground/75">
              To empower businesses through digital innovation and measurable growth.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background/40 p-6">
            <Eye className="mb-3 h-6 w-6 text-amber-500" />
            <h3 className="text-lg font-semibold text-foreground">Vision</h3>
            <p className="mt-2 text-foreground/75">
              To become a leading global agency for web development, automation and digital
              transformation.
            </p>
          </div>
        </div>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Core Values</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.t} className="rounded-2xl border border-border bg-background/40 p-5">
                <v.icon className="mb-2 h-5 w-5 text-amber-500" />
                <div className="font-medium text-foreground">{v.t}</div>
                <div className="text-sm text-foreground/65">{v.d}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link to="/contact" className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background">
            Get Free Consultation
          </Link>
          <Link to="/portfolio" className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground">
            View Portfolio
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
