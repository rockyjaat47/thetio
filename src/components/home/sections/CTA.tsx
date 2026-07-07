import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function CTA() {
  return (
    <section className="bg-background px-4 py-24 sm:px-6 sm:py-32">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#2a2010] p-10 text-white sm:p-16">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-400/30 blur-3xl" />
        <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl" />
        <div className="relative">
          <h2 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">
            Ready to stop managing vendors and start managing results?
          </h2>
          <p className="mt-5 max-w-xl text-white/70">
            Tell us where growth is stalling. We'll tell you, in writing, what we'd do about it —
            before you commit to anything.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-amber-500 py-2 pl-5 pr-2 text-sm font-medium text-black"
            >
              Book a Free Strategy Call
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-amber-400">
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium backdrop-blur"
            >
              Talk to Our Team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
