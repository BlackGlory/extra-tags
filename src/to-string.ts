import { last } from '@utils/last'

export function toString(strings: TemplateStringsArray, ...values: unknown[]): string {
  let result = ''
  for (let i = 0; i < values.length; i++) {
    result += strings[i]
    result += values[i]
  }
  result += last(strings)
  return result
}
