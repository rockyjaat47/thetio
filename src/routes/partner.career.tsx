import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";

export const Route = createFileRoute("/partner/career")({
  head: () => ({ meta: [{ title: "Career — +co" }] }),
  component: () => (
    <PageLayout
      title="Career"
      subtitle="Join a small, senior team building serious things — remote-first, async-friendly."
    >
      <p className="text-foreground/80">
        We're always open to hearing from product engineers, designers and AI specialists. Send
        us your work and we'll be in touch.
      </p>
    </PageLayout>
  ),
});
