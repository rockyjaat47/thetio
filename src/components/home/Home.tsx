import { Hero } from "./sections/Hero";
import { LogoMarquee } from "./sections/LogoMarquee";
import { Problem } from "./sections/Problem";
import { Features } from "./sections/Features";
import { Plans } from "./sections/Plans";
import { Platform } from "./sections/Platform";
import { HowItWorks } from "./sections/HowItWorks";
import { UseCases } from "./sections/UseCases";
import { Security } from "./sections/Security";
import { CTA } from "./sections/CTA";
import { Footer } from "./sections/Footer";

export function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <LogoMarquee />
      <Problem />
      <Features />
      <Plans />
      <Platform />
      <HowItWorks />
      <UseCases />
      <Security />
      <CTA />
      <Footer />
    </main>
  );
}
