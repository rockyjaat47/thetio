import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Home } from "@/components/home/Home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Navora Digital — One Ecosystem. One Team. One Result." },
      {
        name: "description",
        content:
          "Software, AI, mobile and marketing engineered under one roof. Navora Digital removes the handoffs between agencies, developers and creatives.",
      },
      { property: "og:title", content: "Navora Digital — One Ecosystem. One Team. One Result." },
      { property: "og:description", content: "Marketing, technology and creative production for brands done managing vendors and ready to manage results." },
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
