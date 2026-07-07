const pillars = [
  "Digital Marketing",
  "Software Engineering",
  "AI & Automation",
  "Mobile Engagement",
  "Creative Production",
  "SEO · GEO · AEO",
  "Meta & Google Ads",
  "WhatsApp Business API",
  "CRM & ERP",
  "Custom Software",
  "Motion & Reels",
  "Branding & Identity",
];

export function LogoMarquee() {
  return (
    <section className="border-y border-foreground/10 bg-background py-12">
      <p className="mb-8 text-center text-sm text-foreground/60">
        One team. Every discipline your growth depends on.
      </p>
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-[marquee_60s_linear_infinite] items-center gap-8 pr-8">
          {[...pillars, ...pillars].map((p, i) => (
            <span
              key={i}
              className="flex-none whitespace-nowrap rounded-full border border-foreground/10 bg-card px-5 py-2 text-sm font-medium text-foreground/70"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
