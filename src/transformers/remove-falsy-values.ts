import { filter } from '@creators/filter'
import { TagParameters } from '@src/types'
import { Falsy } from '@blackglory/prelude'

export function removeFalsyValues<T>(
  strings: TemplateStringsArray
, ...values: T[]
): TagParameters<Exclude<T, Falsy>> {
  return filter<T, Exclude<T, Falsy>>(x => !!x)(strings, ...values)
}
