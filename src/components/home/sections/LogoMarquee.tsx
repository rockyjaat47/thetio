const logos = [
  "Northwind",
  "Lumenly",
  "Acme Co",
  "Vertex",
  "Helio",
  "Quanta",
  "Orbital",
  "Forge",
  "Atlas",
  "Nexus",
];

export function LogoMarquee() {
  return (
    <section className="border-y border-foreground/10 bg-background py-12">
      <p className="mb-8 text-center text-sm text-foreground/60">
        Trusted by ambitious teams and operators
      </p>
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-max animate-[marquee_30s_linear_infinite] gap-12 pr-12">
          {[...logos, ...logos].map((l, i) => (
            <span
              key={i}
              className="whitespace-nowrap text-2xl font-semibold tracking-tight text-foreground/40"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </section>
  );
}
