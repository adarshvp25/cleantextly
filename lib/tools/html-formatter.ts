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

export type HtmlFormatResult = {
  output: string
  error?: string
}

const VOID_ELEMENTS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr",
])

// pre is grouped with script/style/textarea (rather than following the
// full HTML5 content model, where <pre> can contain real child elements)
// because its whitespace is meaningful and must not be reformatted —
// exactly the same requirement raw-text elements already have.
const RAW_TEXT_ELEMENTS = new Set(["script", "style", "textarea", "pre"])

// Common inline-level elements. An element in this set is kept in the
// surrounding text flow instead of being expanded onto its own line, so
// e.g. "Hello <b>World</b>!" isn't broken across three lines in a way
// that would add whitespace a browser doesn't collapse back out. This is
// a fixed, deliberately small whitelist, not a full CSS display
// (block/inline) classification system.
// br/wbr are void elements included here because they're line/word breaks
// within running text (e.g. "Line one<br>Line two"). Other void elements
// like img/input aren't included — when they appear without surrounding
// text (e.g. a <div> of several void elements with nothing else in it),
// each conventionally gets its own line rather than being crammed inline.
const INLINE_ELEMENTS = new Set([
  "a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn",
  "em", "i", "kbd", "label", "mark", "q", "s", "samp", "small", "span",
  "strong", "sub", "sup", "time", "u", "var", "wbr",
])

type TextNode = { type: "text"; value: string }
type CommentNode = { type: "comment"; value: string }
type DoctypeNode = { type: "doctype"; value: string }
type RawNode = { type: "raw"; name: string; attrs: string; content: string }
type ElementNode = {
  type: "element"
  name: string
  attrs: string
  voidEl: boolean
  children: HtmlNode[]
}
type HtmlNode = TextNode | CommentNode | DoctypeNode | RawNode | ElementNode

type ScannedTag = { name: string; attrs: string; selfClosing: boolean; end: number }

const TAG_NAME_PATTERN = /^[a-zA-Z][a-zA-Z0-9:-]*/

// Scans an opening tag starting at `start` (the "<"). Tracks quote state so
// a ">" (or "<") inside a quoted attribute value never ends the tag early —
// this is the key correctness requirement that rules out a naive
// find-the-next-">"  approach. Returns null for an unterminated tag (no
// unquoted ">" before the end of input), which the caller treats as plain
// text rather than inventing a closing ">" that was never there.
function scanOpenTag(input: string, start: number): ScannedTag | null {
  const nameMatch = TAG_NAME_PATTERN.exec(input.slice(start + 1))
  if (!nameMatch) return null

  const name = nameMatch[0]
  let i = start + 1 + name.length
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
      const selfClosing = input[i - 1] === "/"
      const attrsEnd = selfClosing ? i - 1 : i
      const attrsRaw = input.slice(start + 1 + name.length, attrsEnd)
      return { name, attrs: attrsRaw.replace(/\s+/g, " ").trim(), selfClosing, end: i + 1 }
    }

    i++
  }

  return null
}

function scanCloseTag(input: string, start: number): { name: string; end: number } | null {
  const nameMatch = TAG_NAME_PATTERN.exec(input.slice(start + 2))
  if (!nameMatch) return null

  const gt = input.indexOf(">", start + 2 + nameMatch[0].length)
  if (gt === -1) return null

  return { name: nameMatch[0], end: gt + 1 }
}

// Finds the literal closing tag for a raw-text element (case-insensitive,
// optional whitespace before ">"). If it's missing, the rest of the input
// becomes the element's content — graceful handling of an unclosed
// <script>/<style>/<pre>/<textarea> instead of throwing.
function findRawClose(
  input: string,
  from: number,
  tagName: string
): { contentEnd: number; tagEnd: number } | null {
  const closeRe = new RegExp(`</${tagName}\\s*>`, "i")
  const match = closeRe.exec(input.slice(from))
  if (!match) return null

  const contentEnd = from + match.index
  return { contentEnd, tagEnd: contentEnd + match[0].length }
}

// A small deterministic HTML tokenizer/tree-builder — not a regex-only
// replace pipeline, and not a full spec-compliant HTML5 parser either.
// It recognizes tags, quoted attributes, comments, DOCTYPE, void elements,
// and raw-text elements correctly, and degrades gracefully (never throws)
// on malformed input: unclosed tags are left open (and get an implied
// closing tag from the printer), a stray closing tag with no matching
// open element is kept as literal text instead of being discarded, and
// an unterminated "<" is treated as literal text rather than guessed at.
function parseHtml(input: string): HtmlNode[] {
  const roots: HtmlNode[] = []
  const stack: ElementNode[] = []
  const len = input.length
  let i = 0

  function currentList(): HtmlNode[] {
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
      const close = input.indexOf("-->", i + 4)
      const end = close === -1 ? len : close + 3
      currentList().push({ type: "comment", value: input.slice(i, end) })
      i = end
      continue
    }

    if (/^<!doctype/i.test(input.slice(i, i + 9))) {
      const gt = input.indexOf(">", i)
      const end = gt === -1 ? len : gt + 1
      currentList().push({
        type: "doctype",
        value: input.slice(i, end).replace(/\s+/g, " ").trim(),
      })
      i = end
      continue
    }

    const nextChar = i + 1 < len ? input[i + 1] : ""

    if (nextChar === "/") {
      const closed = scanCloseTag(input, i)
      if (!closed) {
        appendText("<")
        i++
        continue
      }

      const lowerName = closed.name.toLowerCase()
      let matchAt = -1
      for (let k = stack.length - 1; k >= 0; k--) {
        if (stack[k].name.toLowerCase() === lowerName) {
          matchAt = k
          break
        }
      }
      if (matchAt !== -1) {
        // Every element from the match up (inclusive) is closed,
        // implicitly closing any unclosed tags nested inside it.
        stack.length = matchAt
      } else {
        // No matching open element anywhere — rather than silently
        // discarding this closing tag, keep it as literal text at its
        // original position so nothing the user typed disappears.
        appendText(input.slice(i, closed.end))
      }

      i = closed.end
      continue
    }

    if (/^[a-zA-Z]/.test(nextChar)) {
      const scanned = scanOpenTag(input, i)
      if (!scanned) {
        appendText("<")
        i++
        continue
      }

      const lowerName = scanned.name.toLowerCase()

      if (RAW_TEXT_ELEMENTS.has(lowerName)) {
        const closeInfo = findRawClose(input, scanned.end, lowerName)
        const contentEnd = closeInfo ? closeInfo.contentEnd : len
        currentList().push({
          type: "raw",
          name: scanned.name,
          attrs: scanned.attrs,
          content: input.slice(scanned.end, contentEnd),
        })
        i = closeInfo ? closeInfo.tagEnd : len
        continue
      }

      const voidEl = scanned.selfClosing || VOID_ELEMENTS.has(lowerName)
      const node: ElementNode = {
        type: "element",
        name: scanned.name,
        attrs: scanned.attrs,
        voidEl,
        children: [],
      }
      currentList().push(node)
      if (!voidEl) stack.push(node)
      i = scanned.end
      continue
    }

    // "<" not followed by a letter, "!--", "!doctype", or "/name" — not a
    // recognizable construct, so it's literal text (e.g. "2 < 5").
    appendText("<")
    i++
  }

  return roots
}

function collapseWhitespace(text: string): string {
  return text.trim().replace(/\s+/g, " ")
}

// Strips exactly one leading newline (the line break right after the
// opening tag, if present) and one trailing newline plus the
// whitespace-only line that follows it (the closing tag's own
// indentation) — boundary formatting artifacts, not meaningful content.
// Deliberately NOT a blanket trimEnd(): content with no trailing newline
// at all — e.g. "<pre>Hello   </pre>" — keeps its trailing spaces exactly
// as written, since those are part of the last line of real content, not
// closing-tag indentation. Every other character, including internal
// indentation and blank lines, is left exactly as written.
function trimRawContent(content: string): string {
  let result = content
  if (result.startsWith("\r\n")) result = result.slice(2)
  else if (result.startsWith("\n")) result = result.slice(1)

  const trailingLine = result.match(/\r?\n[ \t]*$/)
  if (trailingLine) {
    result = result.slice(0, result.length - trailingLine[0].length)
  }

  return result
}

function isWhitespaceText(node: HtmlNode): boolean {
  return node.type === "text" && node.value.trim() === ""
}

function collapseInternalWhitespace(text: string): string {
  return text.replace(/\s+/g, " ")
}

// A node can be rendered inline (as part of a flowing line of text)
// rather than needing its own block. Text is always inline. An element
// from the INLINE_ELEMENTS whitelist (which includes the void br/wbr) is
// inline only if everything nested inside it is inline too, recursively
// — so <a>Hello <strong>world</strong></a> qualifies but
// <a><div>x</div></a> does not, and a non-inline void element like <img>
// or <input> is not treated as inline on its own. Comments, DOCTYPE, and
// raw (script/style/pre/textarea) nodes are never inline either — they
// always get their own line(s).
function canRenderInline(node: HtmlNode): boolean {
  if (node.type === "text") return true
  if (node.type !== "element") return false
  if (!INLINE_ELEMENTS.has(node.name.toLowerCase())) return false
  return node.children.every(canRenderInline)
}

// Renders a node (already confirmed inline-renderable by canRenderInline)
// as a plain string with no line breaks of its own. Whitespace *within*
// text is collapsed to single spaces, but leading/trailing whitespace is
// left as-is here — trimming only happens once, on the fully assembled
// line, so a real gap between two inline siblings (e.g. the space before
// <b> in "Hello <b>World</b>") is never lost.
function renderInlineNode(node: HtmlNode): string {
  if (node.type === "text") return collapseInternalWhitespace(node.value)
  if (node.type !== "element") return ""

  const openTagInner = `${node.name}${node.attrs ? " " + node.attrs : ""}`
  if (node.voidEl) return `<${openTagInner}>`

  return `<${openTagInner}>${node.children.map(renderInlineNode).join("")}</${node.name}>`
}

// Prints a list of sibling nodes (either the document root, or a block
// element's children). Consecutive inline-renderable siblings — text and
// inline elements, including any whitespace between them — are grouped
// into a single "run" and printed together on one line, exactly
// preserving whether there was a gap between them; this is what keeps
// "Hello <b>World</b>!" from being split across lines and picking up
// whitespace a browser wouldn't have collapsed back out. A run that
// trims down to nothing (pure structural whitespace between two block
// siblings) is simply skipped. Anything that isn't inline-renderable
// (block elements, comments, DOCTYPE, raw elements) is printed on its
// own via printNode.
function printNodeList(nodes: HtmlNode[], depth: number, indentUnit: string, lines: string[]) {
  let i = 0

  while (i < nodes.length) {
    if (canRenderInline(nodes[i])) {
      let j = i
      while (j < nodes.length && canRenderInline(nodes[j])) j++

      const run = nodes
        .slice(i, j)
        .map(renderInlineNode)
        .join("")
        .trim()

      if (run !== "") {
        lines.push(indentUnit.repeat(depth) + run)
      }

      i = j
      continue
    }

    printNode(nodes[i], depth, indentUnit, lines)
    i++
  }
}

function printNode(node: HtmlNode, depth: number, indentUnit: string, lines: string[]) {
  const pad = indentUnit.repeat(depth)

  // Reachable only defensively — printNodeList always absorbs text nodes
  // into an inline run rather than calling printNode on one directly.
  if (node.type === "text") {
    lines.push(pad + collapseWhitespace(node.value))
    return
  }

  if (node.type === "comment" || node.type === "doctype") {
    lines.push(pad + node.value)
    return
  }

  if (node.type === "raw") {
    const openTag = `<${node.name}${node.attrs ? " " + node.attrs : ""}>`
    const closeTag = `</${node.name}>`
    const trimmed = trimRawContent(node.content)

    if (trimmed === "") {
      lines.push(pad + openTag + closeTag)
    } else {
      lines.push(pad + openTag)
      for (const rawLine of trimmed.split("\n")) lines.push(rawLine)
      lines.push(pad + closeTag)
    }
    return
  }

  // element
  const openTagInner = `${node.name}${node.attrs ? " " + node.attrs : ""}`

  if (node.voidEl) {
    lines.push(pad + `<${openTagInner}>`)
    return
  }

  const meaningfulChildren = node.children.filter((child) => !isWhitespaceText(child))

  if (meaningfulChildren.length === 0) {
    lines.push(pad + `<${openTagInner}></${node.name}>`)
    return
  }

  // If every child is inline-renderable, the whole element collapses onto
  // one line — this covers plain text content (<h1>Hello</h1>) and mixed
  // inline content (<p>Hello <b>World</b>!</p>) the same way. Otherwise
  // it expands into a block, and printNodeList groups any inline runs
  // among its children while giving block children their own lines.
  if (meaningfulChildren.every(canRenderInline)) {
    const inner = node.children.map(renderInlineNode).join("").trim()
    lines.push(pad + `<${openTagInner}>${inner}</${node.name}>`)
    return
  }

  lines.push(pad + `<${openTagInner}>`)
  printNodeList(node.children, depth + 1, indentUnit, lines)
  lines.push(pad + `</${node.name}>`)
}

// Never throws: parseHtml() is designed to always make progress and
// degrade gracefully on malformed input, and this still wraps the whole
// pipeline defensively so a formatting failure always comes back as a
// result object instead of an uncaught exception.
export function formatHtml(input: string, indent: IndentOption = "2"): HtmlFormatResult {
  if (input === "") {
    return { output: "" }
  }

  try {
    const nodes = parseHtml(input)
    const lines: string[] = []
    printNodeList(nodes, 0, INDENT_UNITS[indent], lines)
    return { output: lines.join("\n") }
  } catch {
    return {
      output: "",
      error: "This HTML couldn't be formatted. Check for severely malformed markup and try again.",
    }
  }
}
