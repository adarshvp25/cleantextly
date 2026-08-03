import { tools } from "@/lib/tools"
import type { ToolFeature, ToolGuideStep, ToolFaq } from "@/lib/tools/content"

export const benefits: ToolFeature[] = [
  {
    title: "Free to Use",
    description: "No hidden fees, no premium tiers. Every tool is completely free.",
  },
  {
    title: "Privacy-First",
    description: "Your text never leaves your browser. Nothing is uploaded, logged, or stored.",
  },
  {
    title: "Instant Processing",
    description: "Every tool works live as you type — no waiting, no processing delays.",
  },
  {
    title: "Works in Any Browser",
    description: "No installs or plugins required. Everything runs directly in your browser.",
  },
  {
    title: "No Registration",
    description: "Start using any tool immediately. No sign-up and no account required.",
  },
  {
    title: "Mobile Friendly",
    description: "Every tool is fully responsive and works great on phones and tablets.",
  },
]

export const howItWorks: ToolGuideStep[] = [
  {
    title: "Paste Your Text",
    description: "Copy your text, code, CSV, or JSON and paste it into any tool's input box.",
  },
  {
    title: "Choose & Process",
    description: "Pick the tool or option you need — formatting happens instantly as you type.",
  },
  {
    title: "Copy Your Result",
    description: "Copy the finished result with one click and use it wherever you need it.",
  },
]

export const useCases: ToolFeature[] = [
  {
    title: "Developers",
    description: "Format JSON, convert case styles, and clean up code snippets and config files.",
  },
  {
    title: "Students",
    description: "Fix messy notes, clean up citations, and count words for assignments.",
  },
  {
    title: "Writers",
    description: "Polish drafts with case conversion, word counts, and reading-time estimates.",
  },
  {
    title: "Content Creators",
    description: "Clean up scripts, captions, and social copy before publishing.",
  },
  {
    title: "Data Analysts",
    description: "Convert CSV exports to JSON and deduplicate messy data rows.",
  },
  {
    title: "SEO Professionals",
    description: "Format meta descriptions, sort keyword lists, and check character counts.",
  },
]

export const homeFaqs: ToolFaq[] = [
  {
    question: "Is CleanTextly really free?",
    answer:
      "Yes. Every tool on CleanTextly is completely free to use, with no hidden fees, premium tiers, or usage limits.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. There's no sign-up or login required — every tool works immediately, right in your browser.",
  },
  {
    question: "Is my text or data uploaded anywhere?",
    answer:
      "No. All processing happens locally in your browser. Your text is never sent to a server, logged, or stored.",
  },
  {
    question: "Does CleanTextly work on mobile devices?",
    answer:
      "Yes. Every tool is fully responsive and works on phones, tablets, and desktop browsers alike.",
  },
  {
    question: "How many tools does CleanTextly offer?",
    answer: `CleanTextly currently offers ${tools.length} free tools — ${tools.map((tool) => tool.name).join(", ")} — with more added regularly.`,
  },
  {
    question: "Can I use CleanTextly tools together?",
    answer:
      "Yes. Many tools pair well together — for example, convert CSV to JSON and then format the result, or remove duplicates before sorting a list.",
  },
]
