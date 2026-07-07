import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { z } from "zod";
import { Mail, Clock, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Navora Digital" },
      { name: "description", content: "Tell us where growth is stalling. We'll tell you, in writing, what we'd do about it — before you commit to anything." },
      { property: "og:title", content: "Contact — Navora Digital" },
      { property: "og:description", content: "Book a free strategy call with Navora Digital." },
    ],
  }),
  component: ContactPage,
});

const services = [
  "Digital Marketing (SEO, Ads, Social)",
  "Software & AI (Web, CRM, ERP)",
  "AI Chatbots & Automation",
  "Mobile Engagement (WhatsApp, SMS, Voice)",
  "Creative Production (Reels, Photo, Branding)",
  "Full Ecosystem (Navora Command / Apex)",
  "Other",
];

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(7, "Valid phone required").max(20),
  email: z.string().trim().email("Invalid email").max(255),
  business: z.string().trim().max(150).optional().or(z.literal("")),
  service: z.string().min(1, "Select a service"),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    const text = encodeURIComponent(
      `Hi Navora Digital,\n\nName: ${parsed.data.name}\nEmail: ${parsed.data.email}\nPhone: ${parsed.data.phone}\nBusiness: ${parsed.data.business || "-"}\nInterested in: ${parsed.data.service}\n\n${parsed.data.message}`,
    );
    window.open(`https://wa.me/916261302023?text=${text}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const input =
    "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring";

  return (
    <PageLayout
      title="Book a Free Strategy Call"
      subtitle="Tell us where growth is stalling. We'll tell you, in writing, what we'd do about it — before you commit to anything."
    >
      <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
        <form onSubmit={onSubmit} className="grid gap-3">
          <div>
            <input name="name" placeholder="Your name" className={input} />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <input name="phone" placeholder="Phone" className={input} />
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
            </div>
            <div>
              <input name="email" type="email" placeholder="Email" className={input} />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>
          </div>
          <input name="business" placeholder="Business name (optional)" className={input} />
          <div>
            <select name="service" defaultValue="" className={input}>
              <option value="" disabled>What are you interested in?</option>
              {services.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.service && <p className="mt-1 text-xs text-red-500">{errors.service}</p>}
          </div>
          <div>
            <textarea name="message" rows={5} placeholder="Tell us about your business and where growth is stalling" className={input} />
            {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
          </div>
          <button
            type="submit"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:scale-[1.02] transition-transform"
          >
            Send Message
          </button>
          {sent && <p className="text-sm text-emerald-600">Thanks! Opening WhatsApp to confirm your message…</p>}
        </form>

        <aside className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
          <a href="mailto:hello@navoradigital.com" className="flex items-start gap-3 rounded-2xl border border-border bg-background/40 p-4">
            <Mail className="mt-0.5 h-5 w-5 text-amber-500" />
            <div>
              <div className="text-xs uppercase tracking-wide text-foreground/50">Email</div>
              <div className="font-medium text-foreground">hello@navoradigital.com</div>
            </div>
          </a>
          <div className="flex items-start gap-3 rounded-2xl border border-border bg-background/40 p-4">
            <MapPin className="mt-0.5 h-5 w-5 text-amber-500" />
            <div>
              <div className="text-xs uppercase tracking-wide text-foreground/50">Studio</div>
              <div className="font-medium text-foreground">Lucknow, India</div>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-border bg-background/40 p-4">
            <Clock className="mt-0.5 h-5 w-5 text-amber-500" />
            <div>
              <div className="text-xs uppercase tracking-wide text-foreground/50">Business Hours</div>
              <div className="font-medium text-foreground">Mon – Sat · 10 AM – 7 PM</div>
            </div>
          </div>
        </aside>
      </div>
    </PageLayout>
  );
}
