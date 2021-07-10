export function removeExtraIndents(text: string): string {
  const lines = text.split('\n')
  const commonIndentLength = lines.reduce(
    (acc, cur) => {
      const indent = cur.match(/^(\s+)/)
      if (indent) {
        return Math.min(acc, indent[1].length)
      } else {
        return 0
      }
    }
  , Infinity
  )
  if (commonIndentLength === 0
  ||  commonIndentLength === Infinity) {
    return text
  }

  const newLines = lines.map(x => x.slice(commonIndentLength))
  return newLines.join('\n')
}
