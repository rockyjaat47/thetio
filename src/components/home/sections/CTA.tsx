import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="bg-background px-4 py-24 sm:px-6 sm:py-32">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0a0f1f] via-[#13204a] to-[#1f3aa3] p-10 text-white sm:p-16">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-400/30 blur-3xl" />
        <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="relative">
          <h2 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">
            Ready to build something people remember?
          </h2>
          <p className="mt-5 max-w-xl text-white/70">
            Tell us where you want to be in six months. We'll show you how to get there
            — and ship it with you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://wa.me/6261302023"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-white py-2 pl-5 pr-2 text-sm font-medium text-[#0a0f1f]"
            >
              Start a project
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0a0f1f] text-white">
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
            <a
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium backdrop-blur"
            >
              View case studies
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
