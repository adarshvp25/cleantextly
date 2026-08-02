"use client"

import { Collapsible } from "@base-ui/react/collapsible"
import { ChevronDown } from "lucide-react"

import type { ToolFaq } from "@/lib/tools/content"

export function FaqSection({ faqs }: { faqs: ToolFaq[] }) {
  if (faqs.length === 0) {
    return null
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <div className="flex flex-col gap-3">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqs.map((faq) => (
        <Collapsible.Root
          key={faq.question}
          className="rounded-xl border border-border bg-card p-4"
        >
          <Collapsible.Trigger className="group flex w-full items-center justify-between gap-4 rounded-md text-left font-medium text-card-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
            {faq.question}
            <ChevronDown
              aria-hidden="true"
              className="size-4 shrink-0 text-muted-foreground transition-transform duration-150 ease-out group-data-panel-open:rotate-180"
            />
          </Collapsible.Trigger>
          <Collapsible.Panel
            keepMounted
            className="h-[var(--collapsible-panel-height)] overflow-hidden transition-[height] duration-150 ease-out data-ending-style:h-0 data-starting-style:h-0"
          >
            <p className="pt-2 text-sm text-muted-foreground">{faq.answer}</p>
          </Collapsible.Panel>
        </Collapsible.Root>
      ))}
    </div>
  )
}
