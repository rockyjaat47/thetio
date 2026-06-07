const industries = [
  "Real Estate",
  "Healthcare",
  "Education",
  "Restaurants",
  "Consultants",
  "Startups",
  "Agencies",
  "E-commerce",
  "Local Businesses",
  "SaaS",
];

export function LogoMarquee() {
  return (
    <section className="border-y border-foreground/10 bg-background py-12">
      <p className="mb-8 text-center text-sm text-foreground/60">
        Trusted by ambitious businesses across industries
      </p>
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-max animate-[marquee_30s_linear_infinite] gap-12 pr-12">
          {[...industries, ...industries].map((l, i) => (
            <span
              key={i}
              className="whitespace-nowrap text-2xl font-semibold tracking-tight text-foreground/40"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
