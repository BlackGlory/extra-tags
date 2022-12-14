import { filter } from '@operators/filter'
import { TagParameters } from '@src/types'
import { isntFalsy, Falsy } from '@blackglory/prelude'

export function removeFalsyValues<T>(
  strings: TemplateStringsArray
, ...values: T[]
): TagParameters<Exclude<T, Falsy>> {
  return filter<T, Exclude<T, Falsy>>(isntFalsy, strings, ...values)
}
