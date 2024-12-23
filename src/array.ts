import { last } from '@utils/last.js'

export function array<T>(
  strings: TemplateStringsArray
, ...values: T[]
): Array<string | T> {
  const arr: Array<string | T> = []

  for (let i = 0; i < values.length; i++) {
    arr.push(strings[i])
    arr.push(values[i])
  }
  arr.push(last(strings))

  return arr
}
