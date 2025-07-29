import { concat } from './concat.js'

export function indentMultilineValues<Strings extends ReadonlyArray<string>>(
  strings: Strings
, ...values: string[]
): [strings: Strings, ...values: string[]] {
  const newValues: string[] = []

  values.forEach((value, i) => {
    if (isMultiline(value)) {
      const indent = getLastLineIndent(
        concat(
          strings.slice(0, i + 1)
        , ...newValues
        )
      )

      newValues.push(indentExceptFirstLine(indent, value))
    } else {
      newValues.push(value)
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
  const result = text.match(/\n([ \t]+).*$/)
  return result?.[1] ?? ''
}
