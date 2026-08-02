import type { ToolPageContent } from "@/lib/tools/content"
import { SectionHeading } from "@/components/tools/content/section-heading"
import { FeatureList } from "@/components/tools/content/feature-list"
import { StepGuide } from "@/components/tools/content/step-guide"
import { ExampleBlock } from "@/components/tools/content/example-block"
import { FaqSection } from "@/components/tools/content/faq-section"
import { RelatedTools } from "@/components/tools/content/related-tools"

export function ToolContentSections({ content }: { content: ToolPageContent }) {
  return (
    <div className="flex flex-col gap-16">
      {content.introduction && (
        <p className="mx-auto max-w-2xl text-center text-muted-foreground">
          {content.introduction}
        </p>
      )}

      {content.features.length > 0 && (
        <section className="flex flex-col gap-8">
          <SectionHeading title="Features" />
          <FeatureList features={content.features} />
        </section>
      )}

      {content.howToUse.length > 0 && (
        <section className="flex flex-col gap-8">
          <SectionHeading title="How to Use" />
          <StepGuide steps={content.howToUse} />
        </section>
      )}

      {content.example && (
        <section className="flex flex-col gap-8">
          <SectionHeading title="Example" />
          <ExampleBlock example={content.example} />
        </section>
      )}

      {content.useCases.length > 0 && (
        <section className="flex flex-col gap-8">
          <SectionHeading title="Common Use Cases" />
          <FeatureList features={content.useCases} />
        </section>
      )}

      {content.faqs.length > 0 && (
        <section className="flex flex-col gap-8">
          <SectionHeading title="Frequently Asked Questions" />
          <FaqSection faqs={content.faqs} />
        </section>
      )}

      {content.relatedTools.length > 0 && (
        <section className="flex flex-col gap-8">
          <SectionHeading title="Related Tools" />
          <RelatedTools hrefs={content.relatedTools} />
        </section>
      )}
    </div>
  )
}
