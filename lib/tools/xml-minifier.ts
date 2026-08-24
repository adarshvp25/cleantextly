// A dedicated, self-contained XML tokenizer/parser/printer for minification.
// Deliberately NOT shared with lib/tools/xml-formatter.ts — the two tools
// need different attribute-whitespace handling (the formatter normalizes
// runs of whitespace throughout the raw attrs string, including inside
// quoted values, which a lossless minifier must never do) and different
// text-node handling (the formatter collapses/trims text; the minifier must
// leave any text node that has real content completely untouched). Reusing
// that module's internals would mean fighting those formatter-specific
// assumptions, so this file mirrors only the well-formedness rules it needs.

export type XmlMinifyResult = {
  output: string
  error?: string
}

// Thrown for any well-formedness problem the parser can pinpoint (mismatched
// tags, unterminated constructs, a stray/duplicate XML declaration, ...).
// Caught in minifyXml() and surfaced as a specific, readable error message
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

// XML names may contain a namespace prefix ("x:item") plus letters, digits,
// ".", "_", "-". This is a pragmatic ASCII subset of the full XML Name
// grammar (which also allows many non-ASCII Unicode ranges) — see the
// "Known limitations" note in the final report.
const NAME_PATTERN = /^[a-zA-Z_][\w.:-]*/

type ScannedTag = {
  name: string
  attrs: string
  selfClosing: boolean
  closing: boolean
  end: number
}

// Collapses whitespace that separates attributes down to a single space,
// while copying anything inside a quoted value byte-for-byte — so
// attr="a   b" never loses its internal spacing, but `id="1"    name="x"`
// shrinks to `id="1" name="x"`. Leading/trailing whitespace (outside any
// quote) is dropped entirely, matching how a single space before ">" is
// formatting, not data.
function collapseAttrsWhitespace(raw: string): string {
  let result = ""
  let quote: string | null = null
  let i = 0
  const len = raw.length

  while (i < len) {
    const ch = raw[i]

    if (quote) {
      result += ch
      if (ch === quote) quote = null
      i++
      continue
    }

    if (ch === '"' || ch === "'") {
      quote = ch
      result += ch
      i++
      continue
    }

    if (/\s/.test(ch)) {
      let j = i
      while (j < len && /\s/.test(raw[j])) j++
      if (result.length > 0 && j < len) {
        result += " "
      }
      i = j
      continue
    }

    result += ch
    i++
  }

  return result
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
      const attrs = collapseAttrsWhitespace(input.slice(attrsStart, attrsEnd))
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

// A small deterministic XML tokenizer/tree-builder. Malformed input is NOT
// silently repaired: mismatched tags, unterminated tags/attributes/
// comments/CDATA/processing instructions, and a misplaced or duplicated XML
// declaration all throw XmlSyntaxError with a specific message, caught by
// minifyXml() and surfaced as a clear error instead of guessed-at output.
// Multiple root-level elements are still allowed (the tool also supports
// minifying an XML fragment, not only a complete single-root document).
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
    // construct (tag, comment, CDATA, PI) is not well-formed, so it's
    // reported as an error rather than treated as literal text, since
    // guessing here risks misrepresenting the input.
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

// A text node counts as pure formatting whitespace — safe to drop entirely —
// only when it contains nothing but whitespace. Any text node with real
// content is rendered completely untouched (see renderNode), so meaningful
// whitespace such as the spaces in "Hello <b>World</b>!" is never lost.
function isFormattingWhitespace(node: XmlNode): boolean {
  return node.type === "text" && node.value.trim() === ""
}

function renderChildren(children: XmlNode[]): string {
  return children
    .filter((child) => !isFormattingWhitespace(child))
    .map(renderNode)
    .join("")
}

function renderNode(node: XmlNode): string {
  if (node.type === "text") return node.value
  if (node.type === "cdata") return `<![CDATA[${node.content}]]>`
  if (node.type === "comment" || node.type === "pi") return node.value

  const openTag = `${node.name}${node.attrs ? " " + node.attrs : ""}`
  if (node.selfClosed && node.children.length === 0) {
    return `<${openTag}/>`
  }
  return `<${openTag}>${renderChildren(node.children)}</${node.name}>`
}

// Never lets an exception escape: XmlSyntaxError from the parser becomes a
// specific, readable error; anything unexpected falls back to a generic
// message. Either way the caller always gets a result object.
export function minifyXml(input: string): XmlMinifyResult {
  if (input === "") {
    return { output: "" }
  }

  try {
    const { roots, declaration } = parseXml(input)
    const output = (declaration ?? "") + renderChildren(roots)
    return { output }
  } catch (error) {
    return {
      output: "",
      error:
        error instanceof XmlSyntaxError
          ? error.message
          : "This XML couldn't be minified. Check for malformed markup and try again.",
    }
  }
}
