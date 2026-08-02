import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ToolGrid } from "@/components/tools/tool-grid";
import { tools } from "@/lib/tools";

const badges = ["No Login", "Privacy First", "Fast", "Browser-based"];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-background">
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

      <section
        id="tools"
        aria-labelledby="tools-heading"
        className="w-full border-t border-border bg-muted/30 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-5xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="tools-heading"
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Popular Tools
            </h2>
            <p className="mt-3 text-muted-foreground">
              A growing library of fast, free browser-based text tools.
            </p>
          </div>

          <div className="mt-12">
            <ToolGrid tools={tools} />
          </div>
        </div>
      </section>
    </main>
  );
}
