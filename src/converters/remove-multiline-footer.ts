import { last } from '@utils/last'
import { isBlankLine } from '@utils/is-blank-line'

export function removeMultilineFooter(text: string): string {
  const lines = text.split('\n')
  if (isBlankLine(last(lines))) lines.pop()
  return lines.join('\n')
}
