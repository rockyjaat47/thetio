import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { z } from "zod";
import { Briefcase } from "lucide-react";

export const Route = createFileRoute("/partner/career")({
  head: () => ({
    meta: [
      { title: "Careers — Navora Digital" },
      { name: "description", content: "Build your career at Navora Digital. Open roles across engineering, AI, marketing, creative and sales." },
      { property: "og:title", content: "Careers — Navora Digital" },
      { property: "og:description", content: "Ship premium software, AI and creative under one roof." },
    ],
  }),
  component: CareerPage,
});

const positions = [
  { title: "Web Developer", desc: "Build production-grade web apps with React & modern stacks." },
  { title: "Designer", desc: "Craft premium UI/UX for websites, SaaS and marketing." },
  { title: "Video Editor", desc: "Produce performance creatives for paid social campaigns." },
  { title: "Marketing Executive", desc: "Run Meta & Google campaigns and content engines." },
  { title: "Sales Executive", desc: "Close inbound leads and grow agency partnerships." },
];

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(20),
  position: z.string().min(1),
  about: z.string().trim().min(1).max(800),
});

function CareerPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [resumeName, setResumeName] = useState<string>("");
  const [sent, setSent] = useState(false);

  const input =
    "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring";

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
    if (!resumeName) {
      setErrors({ resume: "Please attach your resume" });
      return;
    }
    setErrors({});
    setSent(true);
  };

  return (
    <PageLayout title="Build Your Career at Navora Digital" subtitle="Join a team shipping software, AI, mobile and creative — all under one roof.">
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold text-foreground">Open Positions</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {positions.map((p) => (
            <div key={p.title} className="rounded-2xl border border-border bg-background/40 p-5">
              <Briefcase className="mb-2 h-5 w-5 text-amber-500" />
              <div className="font-medium text-foreground">{p.title}</div>
              <p className="mt-1 text-sm text-foreground/65">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-foreground">Application Form</h2>
        <form onSubmit={onSubmit} className="grid gap-3 sm:max-w-2xl">
          <div>
            <input name="name" placeholder="Full name" className={input} />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <input name="email" type="email" placeholder="Email" className={input} />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>
            <div>
              <input name="phone" placeholder="Phone" className={input} />
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
            </div>
          </div>
          <div>
            <select name="position" defaultValue="" className={input}>
              <option value="" disabled>Position</option>
              {positions.map((p) => <option key={p.title} value={p.title}>{p.title}</option>)}
            </select>
            {errors.position && <p className="mt-1 text-xs text-red-500">{errors.position}</p>}
          </div>
          <div>
            <textarea name="about" rows={4} placeholder="Tell us about yourself" className={input} />
            {errors.about && <p className="mt-1 text-xs text-red-500">{errors.about}</p>}
          </div>
          <label className="flex flex-col gap-2 rounded-xl border border-dashed border-border bg-background/40 p-4 text-sm text-foreground/70 cursor-pointer">
            <span>Upload your resume (PDF, DOC)</span>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResumeName(e.target.files?.[0]?.name ?? "")}
              className="text-xs"
            />
            {resumeName && <span className="text-xs text-amber-600 dark:text-amber-400">Selected: {resumeName}</span>}
            {errors.resume && <p className="text-xs text-red-500">{errors.resume}</p>}
          </label>
          <button
            type="submit"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
          >
            Submit Application
          </button>
          {sent && <p className="text-sm text-emerald-600">Thanks! Your application has been recorded. We'll be in touch shortly.</p>}
        </form>
      </section>
    </PageLayout>
  );
}
