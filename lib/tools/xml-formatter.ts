// A dedicated, self-contained XML tokenizer/parser/printer. Deliberately
// NOT shared with lib/tools/html-formatter.ts — XML has stricter, different
// rules (case-sensitive tags, no void/raw-text element lists, no inline-tag
// whitelist, and malformed input should surface as an error rather than
// being silently repaired the way the HTML formatter does), so reusing
// that module's logic would mean fighting its HTML-specific assumptions.

export type IndentOption = "2" | "4" | "tab"

export const INDENT_OPTIONS: { value: IndentOption; label: string }[] = [
  { value: "2", label: "2 spaces" },
  { value: "4", label: "4 spaces" },
  { value: "tab", label: "Tab" },
]

const INDENT_UNITS: Record<IndentOption, string> = {
  "2": "  ",
  "4": "    ",
  tab: "\t",
}

export type XmlFormatResult = {
  output: string
  error?: string
}

// Thrown for any well-formedness problem the parser can pinpoint (mismatched
// tags, unterminated constructs, a stray/duplicate XML declaration, ...).
// Caught in formatXml() and surfaced as a specific, readable error message
// instead of a generic one.
class XmlSyntaxError extends Error {}

type XmlTextNode = { type: "text"; value: string }
type XmlCDataNode = { type: "cdata"; content: string }
type XmlCommentNode = { type: "comment"; value: string }
type XmlPiNode = { type: "pi"; value: string }
type XmlElementNode = {
  type: "element"
  name: string
  attrs: string
  selfClosed: boolean
  children: XmlNode[]
}
type XmlNode = XmlTextNode | XmlCDataNode | XmlCommentNode | XmlPiNode | XmlElementNode

// XML names may contain a namespace prefix ("x:item") plus letters,
// digits, ".", "_", "-". This is a pragmatic ASCII subset of the full XML
// Name grammar (which also allows many non-ASCII Unicode ranges) — see
// the "Known limitations" note in the final report.
const NAME_PATTERN = /^[a-zA-Z_][\w.:-]*/

type ScannedTag = {
  name: string
  attrs: string
  selfClosing: boolean
  closing: boolean
  end: number
}

// Scans a "<...>" tag (opening or closing) starting at `start`. Tracks
// quote state so a ">" or "<" inside a quoted attribute value (e.g.
// condition="a > b && c < d") never ends the tag early. Throws — rather
// than guessing — when the tag or an attribute value is left unterminated,
// since silently inventing a closing ">" would misrepresent the input.
function scanTag(input: string, start: number): ScannedTag {
  let i = start + 1
  let closing = false

  if (input[i] === "/") {
    closing = true
    i++
  }

  const nameMatch = NAME_PATTERN.exec(input.slice(i))
  if (!nameMatch) {
    throw new XmlSyntaxError(`Malformed tag near position ${start}: expected an element name.`)
  }

  const name = nameMatch[0]
  i += name.length
  const attrsStart = i
  let quote: string | null = null

  while (i < input.length) {
    const ch = input[i]

    if (quote) {
      if (ch === quote) quote = null
      i++
      continue
    }

    if (ch === '"' || ch === "'") {
      quote = ch
      i++
      continue
    }

    if (ch === ">") {
      const selfClosing = !closing && input[i - 1] === "/"
      const attrsEnd = selfClosing ? i - 1 : i
      const attrs = input.slice(attrsStart, attrsEnd).replace(/\s+/g, " ").trim()
      return { name, attrs, selfClosing, closing, end: i + 1 }
    }

    i++
  }

  if (quote) {
    throw new XmlSyntaxError(
      `Unterminated attribute value in <${closing ? "/" : ""}${name}>: a ${quote} quote is never closed.`
    )
  }
  throw new XmlSyntaxError(`Unterminated tag: <${closing ? "/" : ""}${name}...> is missing a closing ">".`)
}

function scanComment(input: string, start: number): { value: string; end: number } {
  const close = input.indexOf("-->", start + 4)
  if (close === -1) {
    throw new XmlSyntaxError('Malformed comment: missing the closing "-->".')
  }
  const end = close + 3
  return { value: input.slice(start, end), end }
}

function scanCData(input: string, start: number): { content: string; end: number } {
  const close = input.indexOf("]]>", start + 9)
  if (close === -1) {
    throw new XmlSyntaxError('Malformed CDATA section: missing the closing "]]>".')
  }
  const content = input.slice(start + 9, close)
  return { content, end: close + 3 }
}

// Used for both the XML declaration and ordinary processing instructions
// (e.g. <?xml-stylesheet ...?>) — content is kept fully verbatim (no
// whitespace normalization), matching the requirement to preserve a
// declaration's attributes exactly.
function scanPi(input: string, start: number): { value: string; end: number } {
  const close = input.indexOf("?>", start + 2)
  if (close === -1) {
    throw new XmlSyntaxError('Malformed processing instruction: missing the closing "?>".')
  }
  const end = close + 2
  return { value: input.slice(start, end), end }
}

// True if `input`, read starting at `start`, is the reserved "xml" target
// (case-insensitive per the XML spec) — i.e. "<?xml " or "<?xml?>" — as
// opposed to a merely similarly-named PI like "<?xml-stylesheet ...?>".
function isXmlDeclarationTarget(input: string, start: number): boolean {
  const boundary = input[start + 5] ?? ""
  return /^<\?xml$/i.test(input.slice(start, start + 5)) && /[\s?]/.test(boundary)
}

// A small deterministic XML tokenizer/tree-builder. Unlike the HTML
// formatter, malformed input is NOT silently repaired: mismatched tags,
// unterminated tags/attributes/comments/CDATA/processing instructions, and
// a misplaced or duplicated XML declaration all throw XmlSyntaxError with
// a specific message, caught by formatXml() and surfaced as a clear error
// instead of guessed-at output. Multiple root-level elements are still
// allowed (the tool also supports formatting an XML fragment, not only a
// complete single-root document).
function parseXml(input: string): { roots: XmlNode[]; declaration: string | null } {
  const len = input.length
  let i = 0
  let declaration: string | null = null

  if (isXmlDeclarationTarget(input, 0)) {
    const pi = scanPi(input, 0)
    declaration = pi.value
    i = pi.end
  }

  const roots: XmlNode[] = []
  const stack: XmlElementNode[] = []

  function currentList(): XmlNode[] {
    return stack.length === 0 ? roots : stack[stack.length - 1].children
  }

  function appendText(value: string) {
    if (value === "") return
    const list = currentList()
    const last = list[list.length - 1]
    if (last && last.type === "text") {
      last.value += value
    } else {
      list.push({ type: "text", value })
    }
  }

  while (i < len) {
    if (input[i] !== "<") {
      const next = input.indexOf("<", i)
      const end = next === -1 ? len : next
      appendText(input.slice(i, end))
      i = end
      continue
    }

    if (input.startsWith("<!--", i)) {
      const c = scanComment(input, i)
      currentList().push({ type: "comment", value: c.value })
      i = c.end
      continue
    }

    if (input.startsWith("<![CDATA[", i)) {
      const c = scanCData(input, i)
      currentList().push({ type: "cdata", content: c.content })
      i = c.end
      continue
    }

    if (input.startsWith("<?", i)) {
      if (isXmlDeclarationTarget(input, i)) {
        throw new XmlSyntaxError(
          "An XML declaration (<?xml ... ?>) may only appear once, as the very first thing in the document."
        )
      }
      const pi = scanPi(input, i)
      currentList().push({ type: "pi", value: pi.value })
      i = pi.end
      continue
    }

    if (input[i + 1] === "/") {
      const closed = scanTag(input, i)
      const top = stack[stack.length - 1]

      if (!top) {
        throw new XmlSyntaxError(`Unexpected closing tag </${closed.name}> — no element is open to close.`)
      }
      if (top.name !== closed.name) {
        // XML tag matching is case-sensitive, unlike HTML.
        throw new XmlSyntaxError(
          `Mismatched closing tag: expected </${top.name}> but found </${closed.name}>.`
        )
      }

      stack.pop()
      i = closed.end
      continue
    }

    if (/^[a-zA-Z_]/.test(input[i + 1] ?? "")) {
      const opened = scanTag(input, i)
      const node: XmlElementNode = {
        type: "element",
        name: opened.name,
        attrs: opened.attrs,
        selfClosed: opened.selfClosing,
        children: [],
      }
      currentList().push(node)
      if (!opened.selfClosing) stack.push(node)
      i = opened.end
      continue
    }

    // XML is strict: an unescaped "<" that doesn't start a recognizable
    // construct (tag, comment, CDATA, PI) is not well-formed — unlike the
    // HTML formatter, this is reported as an error rather than treated as
    // literal text, since guessing here risks misrepresenting the input.
    throw new XmlSyntaxError(
      `Unexpected "<" at position ${i}: not a valid tag, comment, CDATA section, or processing instruction. ` +
        'A literal "<" in text content must be written as "&lt;".'
    )
  }

  if (stack.length > 0) {
    throw new XmlSyntaxError(`Unterminated element: <${stack[stack.length - 1].name}> is never closed.`)
  }

  return { roots, declaration }
}

function isWhitespaceText(node: XmlNode): boolean {
  return node.type === "text" && node.value.trim() === ""
}

// Text and CDATA are both "character data" as far as content-model
// decisions go — the only difference between them is escaping syntax, not
// what kind of content they represent.
function isTextLike(node: XmlNode): boolean {
  return node.type === "text" || node.type === "cdata"
}

// A CDATA section always counts as meaningful (the author chose that
// syntax deliberately); a text node counts only if it isn't pure
// whitespace between sibling tags.
function isMeaningfulTextLike(node: XmlNode): boolean {
  if (node.type === "cdata") return true
  return node.type === "text" && node.value.trim() !== ""
}

// XML's own content-model vocabulary (as used by DTDs): an element has
// "mixed content" when it has character data directly among its children,
// interspersed with any child elements — e.g. <p>Hello <b>World</b>!</p>.
// An element with only child elements (no direct text/CDATA) has "element
// content" and is block-expanded instead. This is the XML-appropriate,
// bounded replacement for the HTML formatter's tag-name whitelist — XML
// tag names carry no universal inline/block meaning, so the decision is
// made structurally instead.
function hasMixedContent(node: XmlElementNode): boolean {
  return node.children.some(isMeaningfulTextLike)
}

function collapseWhitespace(text: string): string {
  return text.trim().replace(/\s+/g, " ")
}

function collapseInternalWhitespace(text: string): string {
  return text.replace(/\s+/g, " ")
}

// Flattens a node (and everything nested inside it) into a single string
// with no line breaks of its own — used both for a lone text/CDATA child
// and for an element with mixed content, where the whole subtree renders
// as one flowing line once that decision is made at the top of the run.
function renderFlat(node: XmlNode): string {
  if (node.type === "text") return collapseInternalWhitespace(node.value)
  if (node.type === "cdata") return `<![CDATA[${node.content}]]>`
  if (node.type === "comment" || node.type === "pi") return node.value

  const openTag = `${node.name}${node.attrs ? " " + node.attrs : ""}`
  if (node.selfClosed && node.children.length === 0) {
    return `<${openTag}/>`
  }
  return `<${openTag}>${node.children.map(renderFlat).join("")}</${node.name}>`
}

function printChildren(children: XmlNode[], depth: number, indentUnit: string, lines: string[]) {
  for (const child of children) {
    // Purely structural whitespace between element-only siblings carries
    // no content and is dropped, exactly like the HTML formatter — this
    // is what keeps re-formatting already-formatted XML stable.
    if (isWhitespaceText(child)) continue
    printNode(child, depth, indentUnit, lines)
  }
}

function printNode(node: XmlNode, depth: number, indentUnit: string, lines: string[]) {
  const pad = indentUnit.repeat(depth)

  if (node.type === "text") {
    lines.push(pad + collapseWhitespace(node.value))
    return
  }
  if (node.type === "cdata") {
    lines.push(pad + `<![CDATA[${node.content}]]>`)
    return
  }
  if (node.type === "comment" || node.type === "pi") {
    lines.push(pad + node.value)
    return
  }

  // element
  const openTag = `${node.name}${node.attrs ? " " + node.attrs : ""}`

  if (node.children.length === 0) {
    lines.push(pad + (node.selfClosed ? `<${openTag}/>` : `<${openTag}></${node.name}>`))
    return
  }

  // A single text/CDATA child stays on one line, e.g. <name>John</name> —
  // rather than being expanded into a 3-line block for no benefit.
  if (node.children.length === 1 && isTextLike(node.children[0])) {
    lines.push(pad + `<${openTag}>${renderFlat(node.children[0])}</${node.name}>`)
    return
  }

  // Mixed content (character data directly alongside child elements) is
  // kept as one flowing line so no whitespace is added or lost around it.
  if (hasMixedContent(node)) {
    const inner = node.children.map(renderFlat).join("").trim()
    lines.push(pad + `<${openTag}>${inner}</${node.name}>`)
    return
  }

  // Element content only (no direct text/CDATA): block-expand, one child
  // per line, indented one level deeper.
  lines.push(pad + `<${openTag}>`)
  printChildren(node.children, depth + 1, indentUnit, lines)
  lines.push(pad + `</${node.name}>`)
}

// Never lets an exception escape: XmlSyntaxError from the parser becomes a
// specific, readable error; anything unexpected falls back to a generic
// message. Either way the caller always gets a result object.
export function formatXml(input: string, indent: IndentOption = "2"): XmlFormatResult {
  if (input === "") {
    return { output: "" }
  }

  try {
    const { roots, declaration } = parseXml(input)
    const lines: string[] = []
    if (declaration) lines.push(declaration)
    printChildren(roots, 0, INDENT_UNITS[indent], lines)
    return { output: lines.join("\n") }
  } catch (error) {
    return {
      output: "",
      error:
        error instanceof XmlSyntaxError
          ? error.message
          : "This XML couldn't be formatted. Check for malformed markup and try again.",
    }
  }
}
