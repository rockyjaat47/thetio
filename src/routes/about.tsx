import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About us — teo" }, { name: "description", content: "Learn about teo." }] }),
  component: () => (
    <PageLayout
      title="About us"
      subtitle="We're a digital studio building products, brands and growth engines for ambitious teams."
    >
      <p className="text-foreground/80">
        teo partners with founders and operators to design, build and scale modern digital
        products. From early-stage SaaS to enterprise AI workflows, we bring strategy,
        engineering and design under one roof.
      </p>
    </PageLayout>
  ),
});
