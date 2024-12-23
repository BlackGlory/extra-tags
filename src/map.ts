export function map<T, U, Strings extends ReadonlyArray<string>>(
  fn: (value: T, index: number) => U
, strings: Strings
, ...values: T[]
): [strings: Strings, ...values: U[]]
export function map<T, U>(
  fn: (value: T, index: number) => U
): <Strings extends ReadonlyArray<string>>(
  strings: Strings
, ...values: T[]
) => [strings: Strings, ...values: U[]]
export function map<T, U, Strings extends ReadonlyArray<string>>(...args:
| [fn: (value: T, index: number) => U]
| [
    fn: (value: T, index: number) => U
  , strings: Strings
  , ...values: T[]
  ]
) {
  if (args.length === 1) {
    const [fn] = args as [fn: (value: T, index: number) => U]

    return (
      strings: Strings
    , ...values: T[]
    ): [strings: Strings, ...values: U[]] => {
      return map(fn, strings, ...values)
    }
  } else {
    const [fn, strings, ...values] = args as [
      fn: (value: T, index: number) => U
    , strings: Strings
    , ...values: T[]
    ]

    const newValues = values.map((x, i) => fn(x, i))

    return [strings, ...newValues]
  }
}
