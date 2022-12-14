export function map<T, U>(
  fn: (value: T, index: number) => U
, strings: TemplateStringsArray
, ...values: T[]
): [strings: TemplateStringsArray, ...values: U[]] {
  const newValues = values.map((x, i) => fn(x, i))

  return [strings, ...newValues]
}
