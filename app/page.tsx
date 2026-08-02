import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";

const badges = ["No Login", "Privacy First", "Fast", "Browser-based"];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-background">
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:py-32">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Clean, Format &amp; Transform Text Instantly
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Free browser-based text tools for developers, students, analysts
          and creators. No sign-up required.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button render={<a href="#tools" />} nativeButton={false} size="lg">
            Browse Tools
          </Button>

          <span title="Coming Soon" className="inline-block">
            <Button variant="secondary" size="lg" disabled>
              View Categories
            </Button>
          </span>
        </div>

        <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
          {badges.map((badge) => (
            <li key={badge} className="flex items-center gap-1.5">
              <Check aria-hidden="true" className="size-4 text-foreground/70" />
              {badge}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
