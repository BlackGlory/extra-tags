import { isntBlankLine } from '@utils/is-blank-line'

export function removeBlankLines(text: string): string {
  return text
    .split('\n')
    .filter(line => isntBlankLine(line))
    .join('\n')
}
