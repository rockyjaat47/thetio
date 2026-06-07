import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";

export const Route = createFileRoute("/services/saas")({
  head: () => ({ meta: [{ title: "SaaS — teo" }] }),
  component: () => (
    <PageLayout
      title="SaaS"
      subtitle="End-to-end SaaS product development — from idea to production."
    >
      <p className="text-foreground/80">
        We help founders ship reliable, scalable SaaS products with auth, billing, multi-tenancy
        and analytics baked in from day one.
      </p>
    </PageLayout>
  ),
});
