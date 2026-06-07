import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact us — +co" }, { name: "description", content: "Get in touch with +co." }] }),
  component: () => (
    <PageLayout title="Contact us" subtitle="Tell us about your project — we'll reply within 24 hours.">
      <form className="grid gap-4 sm:max-w-lg">
        <input
          type="text"
          placeholder="Your name"
          className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
        />
        <textarea
          rows={5}
          placeholder="How can we help?"
          className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="button"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
        >
          Send message
        </button>
      </form>
    </PageLayout>
  ),
});
