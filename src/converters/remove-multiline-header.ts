import { isBlankLine } from '@utils/is-blank-line'

export function removeMultilineHeader(text: string): string {
  const lines = text.split('\n')
  if (isBlankLine(lines[0])) lines.shift()
  return lines.join('\n')
}
