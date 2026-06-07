import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Home } from "@/components/home/Home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "teo — Digital studio for ambitious brands" },
      {
        name: "description",
        content:
          "We design, build and scale digital products — web, SaaS, CRM, AI automation and growth marketing, in one studio.",
      },
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
