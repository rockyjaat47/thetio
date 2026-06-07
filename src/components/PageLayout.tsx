import type { ReactNode } from "react";
import { Navbar } from "./Navbar";

export function PageLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#b8c8e0] dark:bg-background">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 pb-20 pt-32 sm:px-6 sm:pt-36">
        <header className="mb-10">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-base text-foreground/70 sm:text-lg">
              {subtitle}
            </p>
          )}
        </header>
        <section className="rounded-3xl border border-border bg-card/60 p-6 text-card-foreground shadow-sm backdrop-blur-md sm:p-10">
          {children}
        </section>
      </main>
    </div>
  );
}
