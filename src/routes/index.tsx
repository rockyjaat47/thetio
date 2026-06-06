import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "+co" },
      { name: "description", content: "Welcome to +co" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-[#b8c8e0] dark:bg-background">
      <Navbar />
      <main className="pt-32" />
    </div>
  );
}
