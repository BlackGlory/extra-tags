import { TagParameters } from './types'

export function map<T, U>(
  fn: (value: T, index: number) => U
): (strings: TemplateStringsArray, ...values: T[]) => TagParameters<U> {
  return (strings: TemplateStringsArray, ...values: T[]) => {
    const newValues = values.map((x, i) => fn(x, i))
    return [strings, ...newValues]
  }
}
