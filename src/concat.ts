import { last } from '@utils/last'

export function concat(strings: TemplateStringsArray, ...values: unknown[]): string {
  const arr: string[] = []

  for (let i = 0; i < values.length; i++) {
    arr.push(strings[i])
    arr.push(`${values[i]}`)
  }
  arr.push(last(strings))

  return arr.join('')
}
