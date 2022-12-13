import { filter } from '@operators/filter'
import { TagParameters } from '@src/types'
import { Falsy } from 'justypes'

export function removeFalsyValues<T>(
  strings: TemplateStringsArray
, ...values: T[]
): TagParameters<Exclude<T, Falsy>> {
  return filter<T, Exclude<T, Falsy>>(x => !!x)(strings, ...values)
}
