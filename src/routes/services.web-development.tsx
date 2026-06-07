import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";

export const Route = createFileRoute("/services/web-development")({
  head: () => ({ meta: [{ title: "Web Development — teo" }] }),
  component: () => (
    <PageLayout
      title="Web Development"
      subtitle="High-performance websites and web apps built with modern stacks."
    >
      <p className="text-foreground/80">
        We craft responsive, accessible, and conversion-focused web experiences using React,
        TypeScript and the best of the modern web platform.
      </p>
    </PageLayout>
  ),
});
