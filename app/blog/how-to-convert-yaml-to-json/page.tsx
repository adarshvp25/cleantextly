import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/tools/content/section-heading"
import { StepGuide } from "@/components/tools/content/step-guide"
import { ExampleBlock } from "@/components/tools/content/example-block"
import { FeatureList } from "@/components/tools/content/feature-list"
import { ArticleStructuredData } from "@/components/blog/article-structured-data"
import { getRequiredBlogPost } from "@/lib/blog/posts"
import { siteConfig, ogImage } from "@/lib/site"
import type { ToolGuideStep, ToolExample, ToolFeature } from "@/lib/tools/content"

const post = getRequiredBlogPost("how-to-convert-yaml-to-json")

const title = "How to Convert YAML to JSON – A Practical Guide"
const description =
  "Learn how to convert YAML to JSON with a simple example, manual steps, common conversion issues, and a free online YAML to JSON converter."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/blog/how-to-convert-yaml-to-json",
  },
  openGraph: {
    title,
    description,
    url: "/blog/how-to-convert-yaml-to-json",
    siteName: siteConfig.name,
    type: "article",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage.url],
  },
}

const whyConvert: ToolFeature[] = [
  {
    title: "Working With APIs",
    description:
      "Many APIs accept and return JSON, so YAML configuration or data often has to be converted before it can go into a request body.",
  },
  {
    title: "Configuration Migration",
    description:
      "Moving settings between tools or platforms that expect different formats, such as a YAML config into a JSON-based one.",
  },
  {
    title: "Tools That Require JSON",
    description:
      "Some validators, libraries, and scripts only read JSON, even when the source data was written in YAML.",
  },
  {
    title: "Inspecting & Processing Data",
    description:
      "JSON is easy to load in code and to query with common tooling, and a converted copy can make deeply nested YAML easier to inspect.",
  },
]

const yamlToJsonExample: ToolExample = {
  inputLabel: "YAML",
  outputLabel: "JSON",
  input:
    "name: CleanTextly\nversion: 1\nfeatures:\n  - JSON Formatter\n  - YAML Converter\nactive: true",
  output:
    '{\n  "name": "CleanTextly",\n  "version": 1,\n  "features": [\n    "JSON Formatter",\n    "YAML Converter"\n  ],\n  "active": true\n}',
}

const manualSteps: ToolGuideStep[] = [
  {
    title: "Read the structure from the indentation",
    description:
      "Lines at the same indentation level belong to the same object, and a more-indented block belongs to the key above it.",
  },
  {
    title: "Wrap objects in braces",
    description:
      'Turn each key: value pair into a double-quoted "key": value pair, separated by commas and wrapped in curly braces.',
  },
  {
    title: "Turn dash lists into arrays",
    description:
      "Each - item line becomes an element of a square-bracket array, separated by commas.",
  },
  {
    title: "Keep the value types",
    description:
      "Numbers, true, false, and null stay unquoted, while text values get double quotes.",
  },
  {
    title: "Check the result with a JSON parser",
    description:
      "A missing comma or stray quote is easy to introduce by hand, so run the result through a JSON validator before using it.",
  },
]

const commonProblems: ToolFeature[] = [
  {
    title: "Tabs for Indentation",
    description:
      "YAML doesn't allow tab characters for indentation. Use spaces, or the parser will report an error.",
  },
  {
    title: "Inconsistent Nesting",
    description:
      "Sibling keys must start at the same column. A line indented differently from its siblings is reported as a mismatch.",
  },
  {
    title: "Malformed Lists",
    description:
      "List items should line up under their key. A misaligned dash may not raise an error at all, as shown below, so it's worth scanning the JSON output.",
  },
  {
    title: "Missing Space After a Colon",
    description:
      "name: value is a key and a value, but name:value with no space is read as one plain string.",
  },
  {
    title: "Unexpected Types",
    description:
      'Unquoted values are interpreted: 1.0 becomes the number 1, and true becomes a boolean. Quote a value, such as "1.0", to keep it as a string.',
  },
  {
    title: "Duplicate Keys",
    description:
      "Repeating a key inside the same mapping is an error in most parsers, since a JSON object can't hold two values for one key.",
  },
]

const misalignedExample: ToolExample = {
  title: "A Misaligned List Item Doesn't Always Cause an Error",
  inputLabel: "YAML",
  outputLabel: "JSON",
  input: "features:\n  - JSON Formatter\n   - YAML Converter",
  output: '{\n  "features": [\n    "JSON Formatter - YAML Converter"\n  ]\n}',
}

const comparisonRows: { aspect: string; yaml: string; json: string }[] = [
  {
    aspect: "Structure",
    yaml: "Indentation and dashes",
    json: "Braces, brackets, and commas",
  },
  {
    aspect: "Comments",
    yaml: "Supported with #",
    json: "Not supported",
  },
  {
    aspect: "Quoting",
    yaml: "Strings are usually unquoted",
    json: "Keys and strings must be double-quoted",
  },
  {
    aspect: "Typical use",
    yaml: "Hand-edited configuration files",
    json: "APIs and data exchange between programs",
  },
  {
    aspect: "Main pitfall",
    yaml: "Indentation and type-guessing mistakes",
    json: "Verbose to write; a stray comma breaks parsing",
  },
]

const h2Class = "text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
const linkClass = "text-primary underline-offset-4 hover:underline"

export default function HowToConvertYamlToJsonPage() {
  return (
    <main className="flex flex-1 flex-col bg-background">
      <ArticleStructuredData
        headline="How to Convert YAML to JSON"
        description={description}
        path="/blog/how-to-convert-yaml-to-json"
        datePublished={post.publishedAt}
      />

      <section className="mx-auto w-full max-w-3xl px-4 py-12 sm:py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How to Convert YAML to JSON
          </h1>
          <p className="mt-3 text-muted-foreground">
            A practical guide to moving data between YAML and JSON — with a
            worked example, the manual process, and the mistakes that most
            often trip up a conversion.
          </p>
        </div>

        <article className="mt-16 flex flex-col gap-16">
          <div>
            <p className="text-muted-foreground">
              YAML and JSON are two of the most widely used formats for
              structured data. YAML tends to show up in hand-edited
              configuration files, while JSON dominates APIs and data
              exchange between programs. Because both describe the same
              kinds of data — objects, lists, strings, numbers, booleans,
              and null — it&apos;s common to need to move a file from one to
              the other.
            </p>
            <p className="mt-4 text-muted-foreground">
              This guide explains what each format is, walks through a small
              YAML to JSON example, covers the manual process and its
              pitfalls, and shows how to convert YAML to JSON online when
              you&apos;d rather not do it by hand.
            </p>
          </div>

          <div>
            <h2 className={h2Class}>What Is YAML?</h2>
            <p className="mt-4 text-muted-foreground">
              YAML (short for &quot;YAML Ain&apos;t Markup Language&quot;) is
              a data format designed to be easy for people to read and write.
              Instead of braces and brackets, it uses indentation to show
              structure, and strings usually don&apos;t need quotes. It also
              supports comments, which is a big reason it&apos;s popular for
              configuration. You&apos;ll commonly see YAML in Docker Compose
              files, Kubernetes manifests, GitHub Actions workflows, and
              OpenAPI specifications.
            </p>
          </div>

          <div>
            <h2 className={h2Class}>What Is JSON?</h2>
            <p className="mt-4 text-muted-foreground">
              JSON (JavaScript Object Notation) is a lightweight text format
              for structured data. It uses curly braces for objects, square
              brackets for arrays, and double quotes around every key and
              string. The grammar is small and strict, which makes JSON easy
              for programs to parse and generate — nearly every language
              ships with a JSON parser, and most web APIs send and receive
              it.
            </p>
            <p className="mt-4 text-muted-foreground">
              Compared with YAML, the trade-offs are that JSON has no
              comments and takes more punctuation to write by hand. The data
              model, though, is essentially the same, which is what makes
              conversion between the two straightforward.
            </p>
          </div>

          <div>
            <SectionHeading title="Why Convert YAML to JSON?" />
            <div className="mt-8">
              <FeatureList features={whyConvert} />
            </div>
          </div>

          <div>
            <h2 className={h2Class}>YAML vs JSON Example</h2>
            <p className="mt-4 text-muted-foreground">
              Here is a small YAML document and the equivalent JSON:
            </p>
            <div className="mt-6">
              <ExampleBlock example={yamlToJsonExample} />
            </div>
            <p className="mt-6 text-muted-foreground">
              Each YAML key becomes a quoted JSON key, the dash-prefixed list
              becomes an array, and the values keep their types: 1 stays a
              number and true stays a boolean, while the text values become
              quoted strings. The two documents describe exactly the same
              data.
            </p>
          </div>

          <div>
            <SectionHeading title="How to Convert YAML to JSON Manually" />
            <p className="mt-4 text-center text-muted-foreground">
              Converting by hand is mostly a matter of translating syntax,
              since the underlying data is the same.
            </p>
            <div className="mt-8">
              <StepGuide steps={manualSteps} />
            </div>
            <p className="mt-6 text-muted-foreground">
              That works for a handful of lines. For anything longer or
              deeply nested, hand-editing is slow and error-prone — a single
              missing comma breaks the whole document — so it&apos;s better to
              let a parser do the work. Note also that comments are lost in
              the process: JSON has nowhere to put them.
            </p>
          </div>

          <div>
            <h2 className={h2Class}>How to Convert YAML to JSON Online</h2>
            <p className="mt-4 text-muted-foreground">
              A browser-based converter does the same translation using a
              real YAML parser: it reads your YAML, builds the data
              structure, and prints it back out as formatted JSON.
              CleanTextly&apos;s{" "}
              <Link href="/tools/yaml-to-json" className={linkClass}>
                YAML to JSON Converter
              </Link>{" "}
              works this way — paste your YAML and the JSON appears with
              2-space indentation, ready to copy. If the YAML can&apos;t be
              parsed, it shows an error message, usually with the line and
              column, instead of producing partial output. The conversion
              runs in your browser, so your data isn&apos;t uploaded.
            </p>
            <p className="mt-4 text-muted-foreground">
              If you need to reformat or minify the resulting JSON
              afterwards, the{" "}
              <Link href="/tools/json-formatter" className={linkClass}>
                JSON Formatter
              </Link>{" "}
              handles that.
            </p>
          </div>

          <div>
            <SectionHeading title="Common YAML to JSON Conversion Problems" />
            <div className="mt-8">
              <FeatureList features={commonProblems} />
            </div>
            <div className="mt-8">
              <ExampleBlock example={misalignedExample} />
            </div>
            <p className="mt-6 text-muted-foreground">
              The second line is read as a continuation of the first
              item&apos;s text, so the parser is satisfied but the data is
              wrong. Skimming the JSON output is a quick way to catch this
              kind of mistake.
            </p>
          </div>

          <div>
            <h2 className={h2Class}>Can You Convert JSON Back to YAML?</h2>
            <p className="mt-4 text-muted-foreground">
              Yes. Because both formats describe the same kinds of data,
              converting in the other direction is just as mechanical:
              objects become indented key-value pairs, arrays become dash
              lists, and quotes are dropped where they aren&apos;t needed.
              Structure, key order, and value types carry over.
            </p>
            <p className="mt-4 text-muted-foreground">
              The one thing that can&apos;t carry over is comments. JSON has
              none, so if you convert YAML to JSON and back again, any
              comments in the original are gone. CleanTextly&apos;s converter
              works in both directions — use the direction toggle to switch
              between YAML → JSON and JSON → YAML on the same{" "}
              <Link href="/tools/yaml-to-json" className={linkClass}>
                YAML converter
              </Link>{" "}
              page.
            </p>
          </div>

          <div>
            <h2 className={h2Class}>YAML vs JSON: Which Should You Use?</h2>
            <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-card">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold text-card-foreground">
                      Aspect
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold text-card-foreground">
                      YAML
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold text-card-foreground">
                      JSON
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.aspect} className="border-t border-border">
                      <th scope="row" className="px-4 py-3 font-medium text-card-foreground">
                        {row.aspect}
                      </th>
                      <td className="px-4 py-3 text-muted-foreground">{row.yaml}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.json}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-muted-foreground">
              Neither format is better everywhere. YAML&apos;s readability
              and comment support suit files that people edit by hand, while
              JSON&apos;s strict, simple grammar suits data exchanged between
              programs. In practice the choice usually follows the ecosystem
              you&apos;re working in, and converting between the two is a
              routine task.
            </p>
          </div>

          <div>
            <h2 className={h2Class}>Conclusion</h2>
            <p className="mt-4 text-muted-foreground">
              YAML and JSON represent the same kinds of data with different
              syntax, so moving between them is mostly a matter of
              translating structure and keeping value types intact. Short
              snippets can be converted by hand, but for anything larger a
              parser is faster and safer — and it&apos;s worth checking the
              output for type surprises like 1.0 becoming 1.
            </p>
            <p className="mt-4 text-muted-foreground">
              When you&apos;re ready, paste your YAML into the{" "}
              <Link href="/tools/yaml-to-json" className={linkClass}>
                YAML to JSON Converter
              </Link>{" "}
              to get formatted JSON in seconds, or switch direction to go from
              JSON to YAML.
            </p>
          </div>
        </article>
      </section>

      <section
        aria-labelledby="yaml-to-json-cta-heading"
        className="w-full border-t border-border bg-muted/30 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading
            id="yaml-to-json-cta-heading"
            title="Ready to Convert Your YAML?"
            description="Paste your YAML into CleanTextly's free converter and get formatted JSON instantly."
          />

          <div className="mt-8 flex justify-center">
            <Button render={<Link href="/tools/yaml-to-json" />} nativeButton={false} size="lg">
              Convert YAML to JSON
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
