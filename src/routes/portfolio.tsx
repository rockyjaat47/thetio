import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";

export const Route = createFileRoute("/portfolio")({
  head: () => ({ meta: [{ title: "Portfolio — +co" }, { name: "description", content: "Selected work by +co." }] }),
  component: () => (
    <PageLayout title="Portfolio" subtitle="A selection of recent work across web, SaaS and AI.">
      <div className="grid gap-4 sm:grid-cols-2">
        {["Project Atlas", "Nimbus CRM", "Forge AI", "Bloom Commerce"].map((p) => (
          <div key={p} className="rounded-2xl border border-border bg-background/40 p-6">
            <div className="mb-3 aspect-video rounded-xl bg-foreground/5" />
            <h3 className="font-medium text-foreground">{p}</h3>
            <p className="text-sm text-foreground/60">Case study coming soon.</p>
          </div>
        ))}
      </div>
    </PageLayout>
  ),
});
