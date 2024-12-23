export function fromArray<T>(arr: Array<string | T>): [
  strings: string[]
, ...values: T[]
] {
  const strings: string[] = []
  const values: T[] = []

  for (let i = 0; i < arr.length; i++) {
    if (i % 2 === 0) {
      strings.push(arr[i] as string)
    } else {
      values.push(arr[i] as T)
    }
  }

  return [strings, ...values]
}
