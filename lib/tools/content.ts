export type ToolFeature = {
  title: string
  description: string
}

export type ToolGuideStep = {
  title: string
  description: string
}

export type ToolExample = {
  title?: string
  inputLabel?: string
  outputLabel?: string
  input: string
  output: string
}

export type ToolFaq = {
  question: string
  answer: string
}

export type ToolPageContent = {
  introduction: string
  features: ToolFeature[]
  howToUse: ToolGuideStep[]
  example?: ToolExample
  useCases: ToolFeature[]
  faqs: ToolFaq[]
  relatedTools: string[]
}

// Keyed by a tool's `href` (from lib/tools.ts). Populated one tool at a
// time as SEO content is written for each page.
export const toolContent: Partial<Record<string, ToolPageContent>> = {
  "/tools/case-converter": {
    introduction:
      "CleanTextly's Case Converter switches text between 8 common case styles — UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, and kebab-case — right in your browser. Paste a heading, a list of names, or a block of code, pick a style, and the result updates instantly. Nothing is uploaded, so it's just as safe for a paragraph of client notes as it is for a batch of variable names.",
    features: [
      {
        title: "8 Case Styles",
        description:
          "Convert between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, and kebab-case from a single dropdown.",
      },
      {
        title: "Live Conversion",
        description:
          "Output updates instantly as you type or switch modes — no need to click a button to see the result.",
      },
      {
        title: "Multi-Line & Multi-Paragraph Support",
        description:
          "Line breaks and paragraph spacing are preserved, and identifier styles like camelCase are applied to each line on its own.",
      },
      {
        title: "Handles Messy Input Correctly",
        description:
          "Inconsistent or random capitalization is normalized properly instead of being carried through into the result.",
      },
      {
        title: "100% Private",
        description:
          "Everything runs locally in your browser. Your text is never uploaded, logged, or stored anywhere.",
      },
    ],
    howToUse: [
      {
        title: "Paste your text",
        description: "Add the text you want to convert into the input box.",
      },
      {
        title: "Select a case style",
        description:
          "Choose from UPPERCASE, Title Case, camelCase, snake_case, and more in the Conversion Mode dropdown.",
      },
      {
        title: "Review the live result",
        description:
          "The output box updates instantly as you type or change modes — there's nothing else to run.",
      },
      {
        title: "Copy or clear",
        description:
          "Copy the converted text with one click, or clear both fields to start over.",
      },
    ],
    example: {
      title: "Convert a Title to snake_case",
      input: "Total Monthly Revenue",
      output: "total_monthly_revenue",
    },
    useCases: [
      {
        title: "Preparing Code Variables",
        description:
          "Turn a descriptive phrase into camelCase or PascalCase for use as a variable, function, or class name.",
      },
      {
        title: "Formatting Database & CSV Columns",
        description:
          "Convert column headers into snake_case or kebab-case for SQL schemas, CSV files, or config keys.",
      },
      {
        title: "Cleaning Up Titles & Headings",
        description:
          "Fix inconsistent capitalization in headlines, titles, or text pasted from another source.",
      },
      {
        title: "Polishing Written Content",
        description:
          "Apply Sentence case or Title Case to keep blog posts, documentation, or emails looking consistent.",
      },
    ],
    faqs: [
      {
        question: "Does the Case Converter work with multiple lines or paragraphs?",
        answer:
          "Yes. Line breaks and paragraph spacing are preserved, and camelCase, PascalCase, snake_case, and kebab-case conversions are applied to each line individually.",
      },
      {
        question: "Will converting to camelCase or snake_case remove my line breaks?",
        answer:
          "No. Each line is converted on its own, and line breaks stay exactly where they were in the original text.",
      },
      {
        question: "What's the difference between camelCase and PascalCase?",
        answer:
          "camelCase starts with a lowercase letter, e.g. totalMonthlyRevenue. PascalCase capitalizes every word including the first, e.g. TotalMonthlyRevenue.",
      },
      {
        question: "Does it handle inconsistent or random capitalization correctly?",
        answer:
          'Yes. Messy input like "hELLo WoRLD" is normalized to the correct word boundaries instead of carrying the random capitalization through into the result.',
      },
      {
        question: "Is my text uploaded to a server?",
        answer:
          "No. All conversion happens locally in your browser. Your text is never sent to a server or stored.",
      },
    ],
    relatedTools: [
      "/tools/text-sorter",
      "/tools/remove-duplicate-lines",
      "/tools/word-counter",
    ],
  },
  "/tools/remove-duplicate-lines": {
    introduction:
      "CleanTextly's Remove Duplicate Lines tool scans any block of text and strips out repeated lines, keeping only the first occurrence of each one — instantly, right in your browser. Paste a list, a log file, or an exported spreadsheet column, and watch duplicates disappear as you type. Nothing you paste is ever uploaded, so it's safe for anything from a mailing list to internal notes.",
    features: [
      {
        title: "Instant Deduplication",
        description:
          "Duplicate lines are removed live as you type or paste — there's no button you have to click to see the result.",
      },
      {
        title: "Keeps First Occurrence, Preserves Order",
        description:
          "When a line repeats, only the first time it appears is kept, and every remaining line stays in its original relative order.",
      },
      {
        title: "Optional Whitespace & Empty Line Handling",
        description:
          'Turn on "Trim whitespace" to treat lines that differ only by leading or trailing spaces as duplicates, or "Ignore empty lines" to strip blank lines entirely.',
      },
      {
        title: "Live Statistics",
        description:
          "See Input Lines, Output Lines, and Duplicate Lines Removed update in real time as you edit your text.",
      },
      {
        title: "100% Private",
        description:
          "Everything runs locally in your browser. Your text is never uploaded, logged, or stored anywhere.",
      },
    ],
    howToUse: [
      {
        title: "Paste your text",
        description: "Add the text you want to deduplicate into the input box.",
      },
      {
        title: "Choose your options",
        description:
          'Optionally enable "Ignore empty lines" or "Trim whitespace" before lines are compared.',
      },
      {
        title: "Review the live result",
        description:
          "Duplicate lines are removed instantly, and the line-count stats update as you type.",
      },
      {
        title: "Copy or clear",
        description:
          "Copy the cleaned text with one click, or clear both fields to start over.",
      },
    ],
    example: {
      title: "Removing Duplicate Emails from a List",
      input: "alice@example.com\nbob@example.com\nalice@example.com\ncarol@example.com\nbob@example.com",
      output: "alice@example.com\nbob@example.com\ncarol@example.com",
    },
    useCases: [
      {
        title: "Cleaning Email & Contact Lists",
        description:
          "Remove repeated email addresses or names before importing a list into a CRM or mailing tool.",
      },
      {
        title: "Deduplicating Data Exports",
        description:
          "Clean up duplicate rows, IDs, or values copied from spreadsheets, logs, or database exports.",
      },
      {
        title: "Tidying Keyword & Tag Lists",
        description:
          "Remove duplicate keywords, tags, or hashtags before using them in SEO or content tools.",
      },
      {
        title: "Simplifying Code & Config Lists",
        description:
          "Strip duplicate lines from import statements, dependency lists, or configuration files.",
      },
    ],
    faqs: [
      {
        question: "Does this tool preserve the order of my original text?",
        answer:
          "Yes. When a line repeats, only its first occurrence is kept, and every remaining line stays in its original position relative to the others.",
      },
      {
        question: "Can I remove duplicates while ignoring blank lines?",
        answer:
          'Yes. Turn on "Ignore empty lines" to strip every blank line from the output, no matter how many appear in your original text.',
      },
      {
        question: 'Will "  Apple" and "Apple" be treated as duplicates?',
        answer:
          'Only if you enable "Trim whitespace" — this treats lines that differ only by leading or trailing spaces as the same line before comparing them.',
      },
      {
        question: "Is duplicate detection case-sensitive?",
        answer:
          'Yes, comparison is always case-sensitive, so "Apple" and "apple" are treated as two different lines. There\'s currently no option to ignore case.',
      },
      {
        question: "What do the Input Lines, Output Lines, and Duplicates Removed stats mean?",
        answer:
          "Input Lines is the total number of lines you pasted, Output Lines is how many remain after deduplication, and Duplicates Removed is how many repeated lines were stripped out.",
      },
      {
        question: "Is my text uploaded to a server?",
        answer:
          "No. Deduplication happens entirely in your browser. Your text is never sent to a server or stored.",
      },
    ],
    relatedTools: [
      "/tools/text-sorter",
      "/tools/case-converter",
      "/tools/word-counter",
    ],
  },
  "/tools/json-formatter": {
    introduction:
      "CleanTextly's JSON Formatter validates and pretty-prints JSON right in your browser, with clear, specific error messages when something's wrong. Paste a minified API response, a config file, or hand-written JSON, and it's instantly checked for valid syntax and reformatted with consistent 2-space indentation — no upload, no signup, and nothing ever leaves your browser.",
    features: [
      {
        title: "Instant Formatting",
        description:
          "JSON is validated and pretty-printed live as you type or paste — there's no button you have to click to see the result.",
      },
      {
        title: "Clear Error Messages",
        description:
          "Invalid JSON shows a specific, actionable error message instead of a generic failure, so you know exactly what to fix.",
      },
      {
        title: "Consistent 2-Space Indentation",
        description:
          "Output is always pretty-printed with 2-space indentation, the most common formatting convention for JSON.",
      },
      {
        title: "Valid JSON Indicator",
        description:
          "A simple checkmark confirms your JSON is syntactically valid as soon as it parses successfully.",
      },
      {
        title: "100% Private",
        description:
          "Everything runs locally in your browser. Your JSON is never uploaded, logged, or stored anywhere.",
      },
    ],
    howToUse: [
      {
        title: "Paste your JSON",
        description: "Add the JSON you want to format into the input box.",
      },
      {
        title: "Check the validation status",
        description:
          'A "Valid JSON" checkmark appears instantly, or a clear error message if the syntax is invalid.',
      },
      {
        title: "Review the formatted output",
        description:
          "Valid JSON is pretty-printed with 2-space indentation automatically as you type.",
      },
      {
        title: "Copy or clear",
        description:
          "Copy the formatted result with one click, or clear both fields to start over.",
      },
    ],
    example: {
      title: "Formatting a Minified API Response",
      input: '{"id":101,"name":"Jordan Lee","active":true,"roles":["admin","editor"]}',
      output:
        '{\n  "id": 101,\n  "name": "Jordan Lee",\n  "active": true,\n  "roles": [\n    "admin",\n    "editor"\n  ]\n}',
    },
    useCases: [
      {
        title: "Debugging API Responses",
        description:
          "Paste a minified or raw API response to instantly see its structure and spot formatting mistakes.",
      },
      {
        title: "Reviewing Config Files",
        description:
          "Format compact config files like package.json or tsconfig.json for easier reading and review.",
      },
      {
        title: "Validating Hand-Written JSON",
        description:
          "Catch missing commas, unclosed brackets, or malformed quotes before using JSON in your code.",
      },
      {
        title: "Cleaning Up Logs & Exports",
        description:
          "Turn single-line JSON log entries or database exports into a readable, structured format.",
      },
    ],
    faqs: [
      {
        question: 'What does the "Valid JSON" indicator mean?',
        answer:
          "It appears as soon as your input parses successfully as JSON, confirming the syntax is valid before you copy it or use it elsewhere.",
      },
      {
        question: "What kind of error message will I see for invalid JSON?",
        answer:
          "The tool shows the browser's own JSON parsing error, which typically points to where parsing failed and describes what went wrong, such as a missing comma or an unexpected token.",
      },
      {
        question: "Can I change the indentation width?",
        answer:
          "Not currently — output is always formatted with 2-space indentation, the most common convention for JSON.",
      },
      {
        question: "Does formatting change the order of my JSON keys?",
        answer:
          "No. Keys are kept in the exact order they appear in your input; only whitespace and line breaks are added.",
      },
      {
        question: "Does it support nested objects and arrays?",
        answer:
          "Yes. Any valid JSON structure — nested objects, arrays, numbers, strings, booleans, and null — is parsed and formatted correctly, no matter how deeply nested.",
      },
      {
        question: "Will my JSON be uploaded anywhere?",
        answer:
          "No. Formatting and validation happen entirely in your browser. Your JSON is never sent to a server or stored.",
      },
    ],
    relatedTools: [
      "/tools/csv-to-json",
      "/tools/remove-duplicate-lines",
      "/tools/word-counter",
    ],
  },
}
