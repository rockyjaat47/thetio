import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";

export const Route = createFileRoute("/services/ai-automation")({
  head: () => ({ meta: [{ title: "AI Agent & Automation — +co" }] }),
  component: () => (
    <PageLayout
      title="AI Agent & Automation"
      subtitle="Deploy AI agents and automations that take real work off your team's plate."
    >
      <p className="text-foreground/80">
        From customer support copilots to internal workflow agents, we design, build and deploy
        LLM-powered systems that integrate with your existing stack.
      </p>
    </PageLayout>
  ),
});
