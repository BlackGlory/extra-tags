export function map<T, U>(
  fn: (value: T, index: number) => U
, strings: TemplateStringsArray
, ...values: T[]
): [strings: TemplateStringsArray, ...values: U[]]
export function map<T, U>(
  fn: (value: T, index: number) => U
): (
  strings: TemplateStringsArray
, ...values: T[]
) => [strings: TemplateStringsArray, ...values: U[]]
export function map<T, U>(...args:
| [fn: (value: T, index: number) => U]
| [
    fn: (value: T, index: number) => U
  , strings: TemplateStringsArray
  , ...values: T[]
  ]
) {
  if (args.length === 1) {
    const [fn] = args as [fn: (value: T, index: number) => U]

    return (
      strings: TemplateStringsArray
    , ...values: T[]
    ): [strings: TemplateStringsArray, ...values: U[]] => {
      return map(fn, strings, ...values)
    }
  } else {
    const [fn, strings, ...values] = args as [
      fn: (value: T, index: number) => U
    , strings: TemplateStringsArray
    , ...values: T[]
    ]

    const newValues = values.map((x, i) => fn(x, i))

    return [strings, ...newValues]
  }
}
