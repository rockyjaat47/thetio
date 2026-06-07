import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";

export const Route = createFileRoute("/partner/agency")({
  head: () => ({ meta: [{ title: "Partner as Agency — teo" }] }),
  component: () => (
    <PageLayout
      title="Partner as Agency"
      subtitle="White-label our engineering and design team to expand what your agency can deliver."
    >
      <p className="text-foreground/80">
        Bring our team in as your silent build partner. We work behind the scenes so your
        clients see only your brand — and you ship faster, with more capacity.
      </p>
    </PageLayout>
  ),
});
