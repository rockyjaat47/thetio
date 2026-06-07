import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { z } from "zod";
import { Phone, Mail, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — TEO Marketing" },
      { name: "description", content: "Let's build something amazing together. Get in touch with TEO Marketing." },
    ],
  }),
  component: ContactPage,
});

const services = [
  "Web Development",
  "SaaS Solutions",
  "CRM Systems",
  "AI Agents & Automation",
  "Digital Marketing",
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
      `Hi TEO Marketing,\n\nName: ${parsed.data.name}\nEmail: ${parsed.data.email}\nPhone: ${parsed.data.phone}\nBusiness: ${parsed.data.business || "-"}\nService: ${parsed.data.service}\n\n${parsed.data.message}`,
    );
    window.open(`https://wa.me/917828902023?text=${text}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const input =
    "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring";

  return (
    <PageLayout title="Let's Build Something Amazing Together" subtitle="Tell us about your project — we reply within 24 hours.">
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
              <option value="" disabled>Service required</option>
              {services.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.service && <p className="mt-1 text-xs text-red-500">{errors.service}</p>}
          </div>
          <div>
            <textarea name="message" rows={5} placeholder="Tell us about your project" className={input} />
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
          <a href="tel:+917828902023" className="flex items-start gap-3 rounded-2xl border border-border bg-background/40 p-4">
            <Phone className="mt-0.5 h-5 w-5 text-amber-500" />
            <div>
              <div className="text-xs uppercase tracking-wide text-foreground/50">Phone</div>
              <div className="font-medium text-foreground">7828902023</div>
            </div>
          </a>
          <a href="mailto:hello@teomarketing.com" className="flex items-start gap-3 rounded-2xl border border-border bg-background/40 p-4">
            <Mail className="mt-0.5 h-5 w-5 text-amber-500" />
            <div>
              <div className="text-xs uppercase tracking-wide text-foreground/50">Email</div>
              <div className="font-medium text-foreground">hello@teomarketing.com</div>
            </div>
          </a>
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
