import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";

export const Route = createFileRoute("/services/crm")({
  head: () => ({ meta: [{ title: "CRM — +co" }] }),
  component: () => (
    <PageLayout
      title="CRM"
      subtitle="Custom CRM solutions tailored to your sales and customer workflows."
    >
      <p className="text-foreground/80">
        Replace bloated tools with a CRM built around your team — pipelines, automations, and
        integrations designed for how you actually work.
      </p>
    </PageLayout>
  ),
});
