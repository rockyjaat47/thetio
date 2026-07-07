import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Phone, Mail } from "lucide-react";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book a Call — Navora Digital" },
      {
        name: "description",
        content:
          "Book a free strategy call with Navora Digital. One team for marketing, software, AI and creative — under one roof.",
      },
      { property: "og:title", content: "Book a Call — Navora Digital" },
      {
        property: "og:description",
        content: "One conversation. One team. One plan for growth.",
      },
    ],
    links: [{ rel: "canonical", href: "https://navora.placeory.store/contact" }],
  }),
  component: BookCallPage,
});

const WHATSAPP = "https://wa.me/916261302023";
const PHONE = "+916261302023";
const EMAIL = "hello@navoradigital.com";

function BookCallPage() {
  return (
    <div className="min-h-screen bg-[#b8c8e0] dark:bg-background">
      <Navbar />
      <main className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-3xl flex-col items-center justify-center px-4 pb-20 pt-32 text-center sm:px-6 sm:pt-36">
        <span className="mb-6 inline-flex rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-foreground/70 backdrop-blur">
          Let's talk
        </span>

        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
          Book a call.
          <br />
          <span className="text-foreground/70">Skip the form.</span>
        </h1>

        <p className="mt-6 max-w-xl text-base text-foreground/70 sm:text-lg">
          One 30-minute conversation with a strategist who can actually build
          what you need — marketing, software, AI and creative, under one roof.
        </p>

        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 inline-flex items-center gap-3 rounded-full bg-foreground py-2 pl-6 pr-2 text-base font-medium text-background transition-transform hover:scale-[1.02] sm:text-lg"
        >
          <span>Book a Call Now</span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground">
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </a>

        <div className="mt-12 grid w-full gap-3 sm:grid-cols-3">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card/60 px-4 py-3 text-sm font-medium text-foreground backdrop-blur transition hover:bg-card"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <a
            href={`tel:${PHONE}`}
            className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card/60 px-4 py-3 text-sm font-medium text-foreground backdrop-blur transition hover:bg-card"
          >
            <Phone className="h-4 w-4" /> {PHONE}
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card/60 px-4 py-3 text-sm font-medium text-foreground backdrop-blur transition hover:bg-card"
          >
            <Mail className="h-4 w-4" /> Email
          </a>
        </div>
      </main>
    </div>
  );
}
