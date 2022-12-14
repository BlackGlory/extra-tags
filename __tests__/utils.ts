import { TagParameters } from '@src/types'

export function collect(
  strings: TemplateStringsArray
, ...values: unknown[]
): TagParameters<unknown> {
  return [strings, ...values]
}
