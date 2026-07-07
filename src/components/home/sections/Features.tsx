import { motion } from "framer-motion";
import { Bot, Code2, Megaphone, Palette, Smartphone, Workflow } from "lucide-react";
import { Link } from "@tanstack/react-router";

const features = [
  {
    icon: Megaphone,
    title: "Digital Marketing",
    desc: "SEO, GEO & AEO, Google Ads, Meta Ads, social media, influencer and political campaigns. The demand engine.",
    tag: "The demand engine",
    to: "/services/digital-marketing",
  },
  {
    icon: Code2,
    title: "Software & AI",
    desc: "Custom software, websites, CRM & ERP, AI chatbots and workflow automation. The infrastructure behind the marketing.",
    tag: "Infrastructure",
    to: "/services/saas",
  },
  {
    icon: Smartphone,
    title: "Mobile Engagement",
    desc: "WhatsApp Business API, bulk SMS and AI voice calling — channels that reach customers directly, not through a feed algorithm.",
    tag: "Direct-to-customer",
    to: "/services/ai-automation",
  },
  {
    icon: Palette,
    title: "Creative Production",
    desc: "Branding, identity, motion graphics, reels, photoshoots and video editing. The content that makes the other three worth looking at.",
    tag: "Content system",
    to: "/services/crm",
  },
  {
    icon: Bot,
    title: "AI Chatbots & Voice",
    desc: "Conversational AI on web and WhatsApp, plus AI voice outreach — engineered for lead capture and query resolution.",
    tag: "24/7 automation",
    to: "/services/ai-automation",
  },
  {
    icon: Workflow,
    title: "CRM & Automation",
    desc: "Automated lead routing, workflow automation across systems, and reporting your team will actually open.",
    tag: "Sales & Ops",
    to: "/services/crm",
  },
];

export function Features() {
  return (
    <section className="bg-card py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
            The Four Pillars
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            The whole business — not four separate products
          </h2>
          <p className="mt-4 text-foreground/65">
            Marketing, technology, automation and creative production sit under one roof and one contract.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Link
                to={f.to}
                className="group relative block overflow-hidden rounded-3xl border border-foreground/10 bg-background p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/5 blur-2xl transition-opacity group-hover:opacity-90" />
                <div className="relative">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-foreground text-background">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-foreground/65">{f.desc}</p>
                  <div className="mt-5 inline-flex rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-700 dark:text-amber-300">
                    {f.tag}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
