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
  "/tools/text-sorter": {
    introduction:
      "CleanTextly's Text Sorter reorders any list of lines — alphabetically or numerically, ascending or descending — right in your browser. Paste a list of names, scores, or reference data, pick a sort mode, and the result updates instantly. Duplicate lines are always preserved and nothing you paste is ever uploaded, so it's just as safe for a spreadsheet export as it is for a personal list.",
    features: [
      {
        title: "4 Sort Modes",
        description:
          "Sort lines Alphabetically (A → Z), Reverse Alphabetically (Z → A), or Numerically in ascending or descending order.",
      },
      {
        title: "Live Sorting",
        description:
          "Output updates instantly as you type, paste, or change the sort mode — there's no button you have to click to see the result.",
      },
      {
        title: "Stable, Predictable Order",
        description:
          "Lines that compare equal keep their original relative order, and duplicate lines are always preserved rather than removed.",
      },
      {
        title: "Flexible Sorting Options",
        description:
          'Optionally remove empty lines, trim whitespace before comparing, or turn on "Case sensitive" sorting.',
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
        description: "Add the list or lines you want to sort into the input box.",
      },
      {
        title: "Choose a sort mode",
        description:
          "Select Alphabetical, Reverse Alphabetical, or Numeric (Ascending or Descending) from the Sort Mode dropdown.",
      },
      {
        title: "Adjust the options",
        description:
          'Optionally enable "Remove empty lines", "Trim whitespace before sorting", or "Case sensitive".',
      },
      {
        title: "Copy or clear",
        description:
          "The sorted result appears instantly — copy it with one click, or clear both fields to start over.",
      },
    ],
    example: {
      title: "Sorting a List Alphabetically",
      input: "Banana\nApple\nOrange\nMango",
      output: "Apple\nBanana\nMango\nOrange",
    },
    useCases: [
      {
        title: "Alphabetizing Lists",
        description:
          "Sort names, product titles, or reference lists into a clean A → Z or Z → A order.",
      },
      {
        title: "Ranking Numeric Data",
        description:
          'Sort scores, prices, or IDs numerically, so values compare correctly instead of as text (where "10" would come before "2").',
      },
      {
        title: "Preparing Data for Import",
        description:
          "Order rows or values before pasting them into a spreadsheet, database, or CMS.",
      },
      {
        title: "Organizing Reference Material",
        description:
          "Sort glossary terms, tags, or keyword lists for easier scanning and lookup.",
      },
    ],
    faqs: [
      {
        question: "What's the difference between Alphabetical and Numeric sorting?",
        answer:
          'Alphabetical sorting compares lines as text, so "10" would come before "2". Numeric sorting compares them as numbers, so "2" correctly comes before "10".',
      },
      {
        question: "What happens to non-numeric lines in Numeric mode?",
        answer:
          "Lines that aren't valid numbers are moved to the end of the result, keeping their original relative order, while the numeric lines are sorted normally.",
      },
      {
        question: "Does sorting remove duplicate lines?",
        answer:
          "No. Duplicate lines are kept exactly as they appear — this tool only reorders lines. If you also want duplicates removed, try the Remove Duplicate Lines tool.",
      },
      {
        question: "Is sorting case-sensitive?",
        answer:
          'Only if you enable "Case sensitive". By default, sorting ignores case, so "apple" and "Apple" are treated the same for ordering purposes.',
      },
      {
        question: "Will lines that compare equal keep their original order?",
        answer:
          "Yes. The sort is stable, so when two lines are equal — such as identical duplicate lines — they stay in the same relative order as your original text.",
      },
      {
        question: "Is my text uploaded to a server?",
        answer:
          "No. Sorting happens entirely in your browser. Your text is never sent to a server or stored.",
      },
    ],
    relatedTools: [
      "/tools/remove-duplicate-lines",
      "/tools/case-converter",
      "/tools/word-counter",
    ],
  },
  "/tools/csv-to-json": {
    introduction:
      "CleanTextly's CSV to JSON Converter turns CSV data into clean, formatted JSON right in your browser. The first row is treated as the header, and every other row becomes one JSON object — quoted fields, commas inside quotes, and escaped double quotes are all handled correctly. Paste a spreadsheet export or a hand-written CSV, and the result updates instantly, with a clear error message if anything is malformed.",
    features: [
      {
        title: "Instant Conversion",
        description:
          "CSV is parsed and converted to formatted JSON live as you type or paste — there's no button you have to click to see the result.",
      },
      {
        title: "Handles Quoted & Escaped Values",
        description:
          'Correctly parses quoted fields, commas inside quotes, and escaped double quotes ("") within a value.',
      },
      {
        title: "Clear Error Messages",
        description:
          'Malformed CSV shows a clear "Invalid CSV format." message instead of silently producing broken output.',
      },
      {
        title: "Smart Column Handling",
        description:
          "Rows with missing columns get empty string values automatically, and extra columns beyond the header are ignored.",
      },
      {
        title: "100% Private",
        description:
          "Everything runs locally in your browser. Your CSV data is never uploaded, logged, or stored anywhere.",
      },
    ],
    howToUse: [
      {
        title: "Paste your CSV",
        description:
          "Add the CSV data you want to convert into the input box. The first row is treated as the header.",
      },
      {
        title: "Check the validation status",
        description:
          "A clear error message appears instantly if the CSV is malformed, such as an unterminated quote.",
      },
      {
        title: "Review the formatted JSON",
        description:
          "Valid CSV is converted into a pretty-printed JSON array of objects automatically as you type.",
      },
      {
        title: "Copy or clear",
        description:
          "Copy the JSON result with one click, or clear both fields to start over.",
      },
    ],
    example: {
      title: "Converting a Contact List",
      input: "name,email,city\nJohn,john@example.com,London\nAlice,alice@example.com,Paris",
      output:
        '[\n  {\n    "name": "John",\n    "email": "john@example.com",\n    "city": "London"\n  },\n  {\n    "name": "Alice",\n    "email": "alice@example.com",\n    "city": "Paris"\n  }\n]',
    },
    useCases: [
      {
        title: "Migrating Spreadsheet Data",
        description:
          "Turn a CSV export from Excel or Google Sheets into JSON for use in an app or API.",
      },
      {
        title: "Preparing Test Fixtures",
        description:
          "Quickly convert sample CSV data into JSON objects for testing or prototyping.",
      },
      {
        title: "Feeding Data into JavaScript Apps",
        description:
          "Convert CSV files into ready-to-use JSON arrays for frontend or Node.js projects.",
      },
      {
        title: "Cleaning Up Exported Reports",
        description:
          "Turn CSV reports from analytics tools or databases into structured, readable JSON.",
      },
    ],
    faqs: [
      {
        question: "What happens to blank lines in my CSV?",
        answer:
          "Blank lines — including ones with only spaces or tabs — are ignored automatically and never produce empty JSON objects.",
      },
      {
        question: "What if a row has fewer columns than the header?",
        answer:
          "Missing values are filled in as empty strings, so every object in the output always has the same set of keys.",
      },
      {
        question: "What if a row has more columns than the header?",
        answer:
          "Extra columns beyond the header are ignored and don't appear in the output.",
      },
      {
        question: "Does it support commas and quotes inside a field?",
        answer:
          'Yes. Wrap a value in double quotes to include commas, and use two double quotes ("") inside a quoted field to represent a single literal quote.',
      },
      {
        question: "What happens if my CSV is malformed?",
        answer:
          'You\'ll see a clear "Invalid CSV format." message — for example, if a quoted field is never closed.',
      },
      {
        question: "Is my CSV data uploaded anywhere?",
        answer:
          "No. Conversion happens entirely in your browser. Your CSV is never sent to a server or stored.",
      },
    ],
    relatedTools: [
      "/tools/json-formatter",
      "/tools/remove-duplicate-lines",
      "/tools/word-counter",
    ],
  },
  "/tools/word-counter": {
    introduction:
      "CleanTextly's Word Counter gives you a live breakdown of any text — words, characters (with and without spaces), lines, paragraphs, sentences, and an estimated reading time — updating instantly as you type. Paste an essay, an email draft, or a social media post, and every statistic recalculates in real time, entirely in your browser, with nothing uploaded or stored.",
    features: [
      {
        title: "7 Live Statistics",
        description:
          "See word count, character count (with and without spaces), lines, paragraphs, sentences, and estimated reading time all at once.",
      },
      {
        title: "Instant Updates",
        description:
          "Every statistic recalculates live as you type or paste — there's nothing to click or run.",
      },
      {
        title: "Accurate Reading Time",
        description:
          "Estimated reading time is calculated at 200 words per minute and rounded up to the nearest minute.",
      },
      {
        title: "Smart Sentence & Paragraph Detection",
        description:
          'Repeated punctuation like "..." or "!!!" counts as a single sentence ending, and consecutive blank lines count as one paragraph break.',
      },
      {
        title: "100% Private",
        description:
          "Everything runs locally in your browser. Your text is never uploaded, logged, or stored anywhere.",
      },
    ],
    howToUse: [
      {
        title: "Paste or type your text",
        description: "Add the text you want to analyze into the input box.",
      },
      {
        title: "Watch the stats update live",
        description:
          "All seven statistics recalculate instantly as you type — there's no button to click.",
      },
      {
        title: "Copy your text",
        description:
          "Copy the original input text back to your clipboard with one click, if needed.",
      },
      {
        title: "Clear to start over",
        description: "Clear the input to reset every statistic back to zero.",
      },
    ],
    example: {
      title: "Analyzing a Short Paragraph",
      inputLabel: "Sample Text",
      outputLabel: "Live Statistics",
      input:
        "CleanTextly is a free, browser-based text tool. It works instantly and requires no sign-up.",
      output:
        "Words: 14\nCharacters: 91\nCharacters (No Spaces): 78\nLines: 1\nParagraphs: 1\nSentences: 2\nReading Time: 1 min",
    },
    useCases: [
      {
        title: "Meeting Word Count Requirements",
        description:
          "Check essays, articles, or assignments against word count minimums or maximums before submitting.",
      },
      {
        title: "Estimating Reading Time",
        description:
          "Get a quick reading-time estimate for blog posts, emails, or scripts before publishing.",
      },
      {
        title: "Checking Character Limits",
        description:
          "Verify text fits within character limits for social media posts, meta descriptions, or form fields.",
      },
      {
        title: "Analyzing Writing Structure",
        description:
          "Use sentence and paragraph counts to spot overly long paragraphs or run-on sentences.",
      },
    ],
    faqs: [
      {
        question: "How is reading time calculated?",
        answer:
          "Reading time is estimated at 200 words per minute and always rounded up, so even a single word shows a 1-minute estimate.",
      },
      {
        question: "What counts as a sentence?",
        answer:
          'A sentence ends with one or more of . ! or ? — repeated punctuation like "..." or "!!!" still counts as a single sentence ending, not several.',
      },
      {
        question: "How are paragraphs counted?",
        answer:
          "A new paragraph starts after one or more blank lines. Lines grouped together with no blank line between them count as a single paragraph.",
      },
      {
        question: "What's the difference between Characters and Characters (No Spaces)?",
        answer:
          "Characters counts every character exactly as typed, including spaces, tabs, and line breaks. Characters (No Spaces) removes all whitespace before counting.",
      },
      {
        question: "Does the Copy button copy my original text or the statistics?",
        answer:
          "It copies your original input text — the statistics are just a live summary and aren't included in what's copied.",
      },
      {
        question: "Is my text uploaded to a server?",
        answer:
          "No. All counting happens entirely in your browser. Your text is never sent to a server or stored.",
      },
    ],
    relatedTools: [
      "/tools/text-sorter",
      "/tools/case-converter",
      "/tools/remove-duplicate-lines",
    ],
  },
  "/tools/character-counter": {
    introduction:
      "CleanTextly's Character Counter gives you a complete, live breakdown of any text — characters with and without spaces, letters, numbers, whitespace, words, sentences, paragraphs, lines, reading time, speaking time, and an estimated page count — all updating instantly as you type. Paste a tweet, a meta description, an essay, or a form field's contents, and every statistic recalculates in real time, entirely in your browser, with nothing uploaded or stored.",
    features: [
      {
        title: "12 Live Statistics",
        description:
          "See characters (with and without spaces), letters, numbers, whitespace, words, sentences, paragraphs, lines, reading time, speaking time, and estimated pages all at once.",
      },
      {
        title: "Accurate Unicode Character Counting",
        description:
          "Emoji and other multi-byte characters are counted as a single character each, and letters are correctly recognized across scripts — including right-to-left languages like Arabic and Hebrew.",
      },
      {
        title: "Instant Updates",
        description:
          "Every statistic recalculates live as you type or paste — there's nothing to click or run.",
      },
      {
        title: "Reading & Speaking Time",
        description:
          "Reading time is estimated at 200 words per minute and speaking time at 130 words per minute, both rounded up to the nearest minute.",
      },
      {
        title: "100% Private",
        description:
          "Everything runs locally in your browser. Your text is never uploaded, logged, or stored anywhere.",
      },
    ],
    howToUse: [
      {
        title: "Paste or type your text",
        description: "Add the text you want to analyze into the input box.",
      },
      {
        title: "Watch the stats update live",
        description:
          "All twelve statistics recalculate instantly as you type — there's no button to click.",
      },
      {
        title: "Copy, paste, or download",
        description:
          "Copy the text to your clipboard, paste directly from your clipboard into the box, or download it as a .txt file.",
      },
      {
        title: "Clear to start over",
        description: "Clear the input to reset every statistic back to zero.",
      },
    ],
    example: {
      title: "Analyzing a Short Sentence",
      inputLabel: "Sample Text",
      outputLabel: "Live Statistics",
      input: "CleanTextly counts characters instantly. Try it now!",
      output:
        "Characters (With Spaces): 52\nCharacters (No Spaces): 46\nLetters: 44\nNumbers: 0\nWhitespace: 6\nWords: 7\nSentences: 2\nReading Time: 1 min\nSpeaking Time: 1 min\nEstimated Pages: 0",
    },
    useCases: [
      {
        title: "Meeting Character Limits",
        description:
          "Check tweets, SMS messages, meta descriptions, and form fields against strict character limits before submitting.",
      },
      {
        title: "Writing SEO Titles & Descriptions",
        description:
          "Keep page titles and meta descriptions within the character counts search engines display in full.",
      },
      {
        title: "Estimating Reading & Speaking Time",
        description:
          "Get a quick estimate of how long a script, speech, or article will take to read or deliver out loud.",
      },
      {
        title: "Checking Multilingual & Emoji-Heavy Text",
        description:
          "Get an accurate character count for text mixing scripts, accented letters, and emoji — without the inflated counts other tools can produce.",
      },
    ],
    faqs: [
      {
        question: "Does this tool count emoji correctly?",
        answer:
          "Yes. Each emoji counts as a single character, even multi-byte ones that other tools sometimes count as two or more.",
      },
      {
        question: "How is reading time calculated?",
        answer:
          "Reading time is estimated at 200 words per minute, and speaking time at 130 words per minute — both always rounded up, so even a single word shows a 1-minute estimate.",
      },
      {
        question: "How is the estimated page count calculated?",
        answer:
          "Pages are estimated at 250 words per page, a common standard for double-spaced documents, shown to one decimal place.",
      },
      {
        question: "What's the difference between Characters and Letters?",
        answer:
          "Characters counts every character exactly as typed, including numbers, punctuation, symbols, and spaces. Letters counts only alphabetic characters, in any script.",
      },
      {
        question: "Does it handle right-to-left languages like Arabic or Hebrew?",
        answer:
          "Yes. Letters and characters in right-to-left scripts are counted correctly, the same as any other language.",
      },
      {
        question: "Is my text uploaded to a server?",
        answer:
          "No. All counting happens entirely in your browser. Your text is never sent to a server or stored.",
      },
    ],
    relatedTools: [
      "/tools/word-counter",
      "/tools/case-converter",
      "/tools/text-sorter",
      "/tools/remove-duplicate-lines",
      "/tools/json-formatter",
      "/tools/csv-to-json",
    ],
  },
  "/tools/remove-empty-lines": {
    introduction:
      "CleanTextly's Remove Empty Lines tool is a free online blank line remover that instantly deletes empty and whitespace-only lines from any block of text. Paste content with scattered blank lines — from a document export, a code file, or a list copied from somewhere else — and every completely empty line, along with lines containing only spaces or tabs, is removed automatically, while every other line keeps its exact original content and order.",
    features: [
      {
        title: "Removes Blank & Whitespace-Only Lines",
        description:
          "Deletes completely empty lines as well as lines containing only spaces or tabs — a single pass handles both.",
      },
      {
        title: "Instant, Live Processing",
        description:
          "Empty lines are removed as you type or paste — there's no button to click and no submit step.",
      },
      {
        title: "Preserves Line Order & Exact Content",
        description:
          "Every remaining line keeps its original position and its exact original text — nothing is trimmed or rewritten.",
      },
      {
        title: "Works With Any Line Ending",
        description:
          "Windows (CRLF), Mac (CR), and Unix (LF) line endings are all detected and handled correctly, even when mixed in the same file.",
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
        description: "Add the text you want to clean up into the input box.",
      },
      {
        title: "Watch empty lines disappear",
        description:
          "Blank and whitespace-only lines are removed instantly as you type — there's nothing to run.",
      },
      {
        title: "Review the live statistics",
        description:
          "Input lines, output lines, and empty lines removed update in real time as you edit your text.",
      },
      {
        title: "Copy, paste, or download",
        description:
          "Copy the cleaned result to your clipboard, paste directly from your clipboard into the box, or download it as a .txt file.",
      },
    ],
    example: {
      title: "Cleaning Up a Document With Scattered Blank Lines",
      input: "First line.\n\n\nSecond line.\n   \nThird line.\n\t\nFourth line.",
      output: "First line.\nSecond line.\nThird line.\nFourth line.",
    },
    useCases: [
      {
        title: "Cleaning Up Pasted Documents",
        description:
          "Remove blank lines left behind when copying text out of a Word document, PDF, or email into a plain-text field.",
      },
      {
        title: "Tidying Code & Config Files",
        description:
          "Delete empty lines from source files, config files, or log exports to make them shorter and easier to scan.",
      },
      {
        title: "Preparing Lists for Import",
        description:
          "Strip stray blank rows from a list of names, emails, or values before importing it into a spreadsheet or database.",
      },
      {
        title: "Formatting Content for Publishing",
        description:
          "Delete empty lines online before pasting content into a CMS, markdown file, or documentation page.",
      },
    ],
    faqs: [
      {
        question: "Does this tool remove lines that only contain spaces or tabs?",
        answer:
          "Yes. Any line that's completely empty, or contains only spaces or tabs, is treated as a blank line and removed.",
      },
      {
        question: "Will it change the content of my other lines?",
        answer:
          "No. Every line that isn't empty is kept exactly as written — this tool only deletes empty lines, it never trims or rewrites the lines you keep.",
      },
      {
        question: "Does it preserve the order of my remaining lines?",
        answer:
          "Yes. Lines that survive keep the exact same relative order they had in your original text.",
      },
      {
        question: "Does it work with Windows, Mac, and Unix line endings?",
        answer:
          "Yes. CRLF (Windows), CR (old Mac), and LF (Unix) line endings are all recognized correctly, even if a single file mixes more than one.",
      },
      {
        question: "Can I use this as an online empty line remover for large files?",
        answer:
          "Yes. Processing happens instantly in your browser and comfortably handles large documents with tens of thousands of lines.",
      },
      {
        question: "Is my text uploaded to a server?",
        answer:
          "No. All processing happens entirely in your browser. Your text is never sent to a server or stored.",
      },
    ],
    relatedTools: [
      "/tools/remove-duplicate-lines",
      "/tools/text-sorter",
      "/tools/character-counter",
    ],
  },
  "/tools/find-and-replace": {
    introduction:
      "CleanTextly's Find and Replace tool lets you find and replace text online instantly — paste your content, enter the text to find and what to replace it with, and every occurrence updates live as you type. Whether you're cleaning up a document, updating placeholder text, or fixing a recurring typo, this text replacer handles it in your browser with no waiting and nothing uploaded.",
    features: [
      {
        title: "Instant, Live Replacement",
        description:
          "Every occurrence is replaced as you type — there's no button to click and no submit step.",
      },
      {
        title: "Match Case & Match Whole Word",
        description:
          "Toggle case-sensitive matching, or restrict replacements to whole words so \"cat\" won't touch \"category\" or \"cats\".",
      },
      {
        title: "Live Occurrence Counts",
        description:
          "See exactly how many matches were found and replaced, updating in real time as you refine your search.",
      },
      {
        title: "Preserves Everything Else Exactly",
        description:
          "Every character outside your matches — spacing, indentation, line endings, Unicode, and emoji — is kept exactly as written.",
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
        description: "Add the text you want to search into the Input box.",
      },
      {
        title: "Enter what to find and replace",
        description:
          "Type the text to find and the text to replace it with — the output updates instantly.",
      },
      {
        title: "Adjust match options if needed",
        description:
          'Enable "Match Case" for case-sensitive matching, or "Match Whole Word" to avoid partial-word matches.',
      },
      {
        title: "Copy, paste, or download",
        description:
          "Copy the updated text to your clipboard, paste directly from your clipboard into the input, or download it as a .txt file.",
      },
    ],
    example: {
      title: "Replacing a Repeated Word",
      inputLabel: "Input",
      outputLabel: "Output",
      input: "The cat sat next to the cat while another cat watched.",
      output: "The dog sat next to the dog while another dog watched.",
    },
    useCases: [
      {
        title: "Updating Placeholder Text",
        description:
          "Replace placeholder names, dates, or values across a document or template in one pass.",
      },
      {
        title: "Fixing Repeated Typos",
        description:
          "Correct a misspelled word or name everywhere it appears in a block of text at once.",
      },
      {
        title: "Cleaning Up Copied Content",
        description:
          "Replace curly quotes, stray characters, or inconsistent terms after pasting text from another source.",
      },
      {
        title: "Preparing Text for Publishing",
        description:
          "Swap out draft terminology, brand names, or formatting artifacts before publishing content.",
      },
    ],
    faqs: [
      {
        question: "How do I find and replace text online with this tool?",
        answer:
          'Paste your text into the Input box, type the text to find and what to replace it with, and every occurrence updates instantly — there\'s no "Replace" button to click.',
      },
      {
        question: "What does Match Whole Word do?",
        answer:
          'When enabled, only standalone words are matched — searching for "cat" won\'t match "cats" or "category". It works correctly with accented letters and non-Latin scripts, not just plain English.',
      },
      {
        question: "Is the search case-sensitive?",
        answer:
          'By default, no — "Cat" and "cat" are treated the same. Turn on "Match Case" to only replace text that matches the exact capitalization.',
      },
      {
        question: "Does this text replacer support regular expressions?",
        answer:
          "Not yet. Regex support is planned for a future update — for now, the text you enter is always matched literally, so special characters like \".\" or \"$\" are treated as plain text.",
      },
      {
        question: "Will it change anything other than my matches?",
        answer:
          "No. Every character outside of what you're replacing — spacing, line breaks, Unicode, and emoji — is preserved exactly as written.",
      },
      {
        question: "Is my text uploaded to a server?",
        answer:
          "No. All find and replace processing happens entirely in your browser. Your text is never sent to a server or stored.",
      },
    ],
    relatedTools: [
      "/tools/remove-duplicate-lines",
      "/tools/case-converter",
      "/tools/remove-empty-lines",
    ],
  },
}
