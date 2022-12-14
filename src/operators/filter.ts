import { TagParameters } from '@src/types'
import { createTemplateStringsArray } from '@utils/create-template-strings-array'
import { last } from '@utils/last'

export function filter<T, U extends T = T>(
  predicate: (value: T, index: number) => boolean
, strings: TemplateStringsArray
, ...values: T[]
): TagParameters<U> {
  const newStrings: string[] = []
  const newStringsRaw: string[] = []
  const newValues: U[] = []

  for (let i = 0; i < values.length; i++) {
    if (previousValueWasSkipped()) {
      concatWithLastElement(newStrings, strings[i])
      concatWithLastElement(newStringsRaw, strings.raw[i])
    } else {
      newStrings.push(strings[i])
      newStringsRaw.push(strings.raw[i])
    }
    if (predicate(values[i], i)) {
      newValues.push(values[i] as U)
    }
  }
  if (previousValueWasSkipped()) {
    concatWithLastElement(newStrings, last(strings))
    concatWithLastElement(newStringsRaw, last(strings.raw))
  } else {
    newStrings.push(last(strings))
    newStringsRaw.push(last(strings.raw))
  }

  return [createTemplateStringsArray(newStrings, newStringsRaw), ...newValues]

  function previousValueWasSkipped() {
    return newValues.length < newStrings.length
  }
}

function concatWithLastElement(arr: string[], val: string) {
  const lastIndex = arr.length - 1
  arr[lastIndex] = `${arr[lastIndex]}${val}`
}
