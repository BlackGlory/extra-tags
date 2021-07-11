import { TagParameters } from './types'

export function valuesToStrings(
  strings: TemplateStringsArray
, ...values: unknown[]
): TagParameters<string> {
  return [strings, ...values.map(x => `${x}`)]
}
