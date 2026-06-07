import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";

export const Route = createFileRoute("/services/digital-marketing")({
  head: () => ({ meta: [{ title: "Digital Marketing — +co" }] }),
  component: () => (
    <PageLayout
      title="Digital Marketing"
      subtitle="Performance marketing, SEO and content engines that drive growth."
    >
      <p className="text-foreground/80">
        We run integrated growth programs across paid, organic and lifecycle channels —
        measured against revenue, not vanity metrics.
      </p>
    </PageLayout>
  ),
});
