export interface CsvToJsonResult {
  isValid: boolean
  output: string
  error: string | null
}

// Character-by-character CSV parser (no regex). Returns null when the
// quoting is malformed (an unterminated quote, a quote appearing after
// non-quote characters have already started a field, or a stray
// character immediately following a closing quote before the next
// delimiter/newline/end-of-input).
function parseCsv(input: string): string[][] | null {
  const rows: string[][] = []
  let row: string[] = []
  let field = ""
  let inQuotes = false
  let i = 0
  const len = input.length

  while (i < len) {
    const char = input[i]

    if (inQuotes) {
      if (char === '"') {
        if (input[i + 1] === '"') {
          field += '"'
          i += 2
          continue
        }
        inQuotes = false
        i += 1
        const next = input[i]
        if (next !== undefined && next !== "," && next !== "\r" && next !== "\n") {
          return null
        }
        continue
      }
      field += char
      i += 1
      continue
    }

    if (char === '"') {
      if (field.length > 0) {
        return null
      }
      inQuotes = true
      i += 1
      continue
    }

    if (char === ",") {
      row.push(field)
      field = ""
      i += 1
      continue
    }

    if (char === "\r" || char === "\n") {
      row.push(field)
      rows.push(row)
      row = []
      field = ""
      i += char === "\r" && input[i + 1] === "\n" ? 2 : 1
      continue
    }

    field += char
    i += 1
  }

  if (inQuotes) {
    return null
  }

  if (field !== "" || row.length > 0) {
    row.push(field)
    rows.push(row)
  }

  return rows
}

// A blank line (including one containing only spaces/tabs) parses to a
// single empty field, since there's no comma to split it further. A
// genuine data row with empty values always has more than one field
// (e.g. "a,,b") or explicit delimiters, so this check never discards
// real data.
function isBlankRow(row: string[]): boolean {
  return row.length === 1 && row[0].trim() === ""
}

export function csvToJson(input: string): CsvToJsonResult {
  if (input.trim() === "") {
    return { isValid: true, output: "", error: null }
  }

  // Ignore completely empty trailing lines without touching whitespace
  // that's part of the last actual line's content.
  const trimmedInput = input.replace(/(?:\r\n|\r|\n)+$/, "")

  const parsedRows = parseCsv(trimmedInput)

  if (parsedRows === null) {
    return { isValid: false, output: "", error: "Invalid CSV format." }
  }

  const rows = parsedRows.filter((row) => !isBlankRow(row))

  if (rows.length === 0) {
    return { isValid: true, output: "", error: null }
  }

  const [headers, ...dataRows] = rows

  const records = dataRows.map((row) => {
    const record: Record<string, string> = {}
    headers.forEach((header, index) => {
      record[header] = row[index] ?? ""
    })
    return record
  })

  return { isValid: true, output: JSON.stringify(records, null, 2), error: null }
}
