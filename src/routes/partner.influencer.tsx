import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";

export const Route = createFileRoute("/partner/influencer")({
  head: () => ({ meta: [{ title: "Partner as Influencer — +co" }] }),
  component: () => (
    <PageLayout
      title="Partner as Influencer"
      subtitle="Earn while you refer — generous commissions for creators with engaged audiences."
    >
      <p className="text-foreground/80">
        If your audience builds, ships or sells online, our influencer program rewards you for
        every project we close together.
      </p>
    </PageLayout>
  ),
});
