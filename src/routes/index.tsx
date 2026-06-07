import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Home } from "@/components/home/Home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TEO Marketing — Build. Brand. Grow." },
      {
        name: "description",
        content:
          "TEO Marketing is your digital growth agency — websites, SaaS, CRM, AI automation and performance marketing under one roof.",
      },
      { property: "og:title", content: "TEO Marketing — Build. Brand. Grow." },
      { property: "og:description", content: "Helping businesses scale through websites, automation, marketing and digital solutions." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-[#b8c8e0] text-foreground dark:bg-background">
      <Navbar />
      <Home />
    </div>
  );
}
