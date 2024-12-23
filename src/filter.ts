import { createTemplateStringsArray } from '@utils/create-template-strings-array.js'
import { last } from '@utils/last.js'
import { isArray } from 'extra-utils'

export function filter<T, U extends T = T>(
  predicate: (value: T, index: number) => boolean
, strings: TemplateStringsArray
, ...values: T[]
): [strings: TemplateStringsArray, ...values: U[]]
export function filter<T, U extends T = T>(
  predicate: (value: T, index: number) => boolean
, strings: ReadonlyArray<string>
, ...values: T[]
): [strings: ReadonlyArray<string>, ...values: U[]]
export function filter<T, U extends T = T>(
  predicate: (value: T, index: number) => boolean
): <Strings extends TemplateStringsArray | ReadonlyArray<string>>(
  strings: Strings
, ...values: T[]
) => [
  strings: Strings extends TemplateStringsArray
  ? TemplateStringsArray
  : ReadonlyArray<string>
, ...values: U[]
]
export function filter<T, U extends T>(...args:
| [predicate: (value: T, index: number) => boolean]
| [
    predicate: (value: T, index: number) => boolean
  , strings: TemplateStringsArray | ReadonlyArray<string>
  , ...values: T[]
  ]
) {
  if (args.length === 1) {
    const [predicate] = args as [predicate: (value: T, index: number) => boolean]

    return (
      strings: TemplateStringsArray | ReadonlyArray<string>
    , ...values: T[]
    ) => filter(predicate, strings, ...values)
  } else {
    const [predicate, strings, ...values] = args as [
      predicate: (value: T, index: number) => boolean
    , strings: TemplateStringsArray | ReadonlyArray<string>
    , ...values: T[]
    ]

    const isTemplateStringsArray = 'raw' in strings
                                && isArray(strings.raw)
                                && strings.raw.length === strings.length
    const newStrings: string[] = []
    const newStringsRaw: string[] = []
    const newValues: U[] = []

    for (let i = 0; i < values.length; i++) {
      if (previousValueWasSkipped()) {
        concatWithLastElement(newStrings, strings[i])

        if (isTemplateStringsArray) {
          concatWithLastElement(newStringsRaw, strings.raw[i])
        }
      } else {
        newStrings.push(strings[i])

        if (isTemplateStringsArray) {
          newStringsRaw.push(strings.raw[i])
        }
      }
      if (predicate(values[i], i)) {
        newValues.push(values[i] as U)
      }
    }
    if (previousValueWasSkipped()) {
      concatWithLastElement(newStrings, last(strings))

      if (isTemplateStringsArray) {
        concatWithLastElement(newStringsRaw, last(strings.raw))
      }
    } else {
      newStrings.push(last(strings))

      if (isTemplateStringsArray) {
        newStringsRaw.push(last(strings.raw))
      }
    }

    return [
      isTemplateStringsArray
      ? createTemplateStringsArray(newStrings, newStringsRaw)
      : newStrings
    , ...newValues
    ]

    function previousValueWasSkipped() {
      return newValues.length < newStrings.length
    }
  }
}

function concatWithLastElement(arr: string[], val: string): void {
  const lastIndex = arr.length - 1
  arr[lastIndex] = `${arr[lastIndex]}${val}`
}
