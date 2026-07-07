import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";

export const Route = createFileRoute("/articles")({
  head: () => ({
    meta: [
      { title: "Articles — Navora Digital" },
      {
        name: "description",
        content:
          "Field notes on marketing, AI, software and growth from the Navora Digital team.",
      },
      { property: "og:title", content: "Articles — Navora Digital" },
      {
        property: "og:description",
        content: "Field notes on marketing, AI, software and growth.",
      },
    ],
    links: [{ rel: "canonical", href: "https://navora.placeory.store/articles" }],
  }),
  component: ArticlesPage,
});

const articles = [
  {
    tag: "Growth",
    title: "Why your marketing agency and your software vendor should be the same team",
    excerpt:
      "The handoff between the people running ads and the people running your site is where most revenue leaks. Here's how to close it.",
    read: "6 min read",
  },
  {
    tag: "AI",
    title: "AI chatbots that actually qualify leads (and don't sound like a form)",
    excerpt:
      "A practical playbook for deploying WhatsApp and web chat agents that book meetings while your team sleeps.",
    read: "8 min read",
  },
  {
    tag: "SEO",
    title: "GEO & AEO: optimising for ChatGPT, Perplexity and Google's AI answers",
    excerpt:
      "Ranking on page one isn't enough anymore. Here's how to show up when AI answers the question directly.",
    read: "7 min read",
  },
  {
    tag: "CRM",
    title: "The follow-up gap: where 40% of qualified leads quietly disappear",
    excerpt:
      "How to design an automation layer that guarantees every lead gets three human-quality touches in the first 48 hours.",
    read: "5 min read",
  },
  {
    tag: "Creative",
    title: "Editorial-grade creative on a performance-marketing budget",
    excerpt:
      "Why the highest-performing ads in 2026 look nothing like ads — and how to produce them without a Hollywood retainer.",
    read: "6 min read",
  },
  {
    tag: "Platform",
    title: "Custom software vs. off-the-shelf SaaS: a decision framework for founders",
    excerpt:
      "When to buy, when to build, and when to buy-then-extend. A checklist we use with every new engagement.",
    read: "9 min read",
  },
];

function ArticlesPage() {
  return (
    <PageLayout
      title="Field notes from the ecosystem"
      subtitle="How marketing, software and AI actually work together — written by the people building it every day."
    >
      <div className="mb-10 space-y-3 text-foreground/80">
        <p>
          We write for operators — founders, marketing leads and heads of growth who don't have
          time for another 3,000-word "ultimate guide." Every piece here comes from a real client
          engagement, a real experiment we ran, or a real mistake we made and would rather you
          didn't repeat.
        </p>
        <p>
          New pieces drop roughly every fortnight. If you want them in your inbox before they hit
          the site, drop us a line on{" "}
          <Link to="/contact" className="underline">the contact page</Link>.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {articles.map((a) => (
          <article
            key={a.title}
            className="group flex flex-col rounded-2xl border border-border bg-background/40 p-6 transition hover:border-amber-500/40 hover:bg-background/60"
          >
            <span className="mb-3 inline-flex w-fit rounded-full bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-300">
              {a.tag}
            </span>
            <h3 className="text-xl font-semibold text-foreground group-hover:text-amber-700 dark:group-hover:text-amber-300">
              {a.title}
            </h3>
            <p className="mt-3 text-sm text-foreground/75">{a.excerpt}</p>
            <div className="mt-5 flex items-center justify-between text-xs text-foreground/60">
              <span>{a.read}</span>
              <Link to="/contact" className="font-medium text-foreground/80 hover:text-foreground">
                Request full piece →
              </Link>
            </div>
          </article>
        ))}
      </div>

      <section className="mt-14">
        <h2 className="mb-4 text-2xl font-semibold text-foreground">Topics we cover</h2>
        <div className="flex flex-wrap gap-2">
          {[
            "Growth strategy",
            "Performance marketing",
            "SEO & GEO",
            "AI agents",
            "CRM & automation",
            "Creative production",
            "Web platforms",
            "Custom software",
            "Political campaigns",
            "Founder playbooks",
          ].map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-foreground/80"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      <div className="mt-10 rounded-2xl border border-border bg-background/40 p-6 text-sm text-foreground/75">
        Want us to write about a specific challenge you're facing? Tell us the question and we'll
        publish an answer — with your permission, we'll even feature the case study.{" "}
        <Link to="/contact" className="font-medium text-foreground underline">
          Send us the topic →
        </Link>
      </div>
    </PageLayout>
  );
}
