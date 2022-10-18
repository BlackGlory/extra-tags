import { TagParameters } from './types'

export function valuesToJSON(
  strings: TemplateStringsArray
, ...values: unknown[]
): TagParameters<string> {
  return [strings, ...values.map(x => JSON.stringify(x))]
}
