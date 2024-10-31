export function indentMultilineValues(
  strings: TemplateStringsArray
, ...values: string[]
): [strings: TemplateStringsArray, ...values: string[]] {
  const newValues = values.map((value, i) => {
    if (isMultiline(value)) {
      const indent = getLastLineIndent(strings[i])
      return indentExceptFirstLine(indent, value)
    } else {
      return value
    }
  })

  return [strings, ...newValues]
}

function indentExceptFirstLine(indent: string, text: string): string {
  const lines = text.split('\n')
  const linesExcpetFirstLine = lines.slice(1)

  return [
    lines[0]
  , ...linesExcpetFirstLine.map(x => `${indent}${x}`)
  ].join('\n')
}

function isMultiline(text: string): boolean {
  return text.includes('\n')
}

function getLastLineIndent(text: string): string {
  const result = text.match(/\n([ \t]+)$/)
  return result?.[1] ?? ''
}
