import { filter } from './filter'
import { TagParameters } from './types'
import { Falsy } from 'justypes'

export function removeFalsyValues<T>(
  strings: TemplateStringsArray
, ...values: T[]
): TagParameters<Exclude<T, Falsy>> {
  return filter<T, Exclude<T, Falsy>>(x => !!x)(strings, ...values)
}
