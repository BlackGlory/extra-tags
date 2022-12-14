export function collect(
  strings: TemplateStringsArray
, ...values: unknown[]
): [strings: TemplateStringsArray, ...values: unknown[]] {
  return [strings, ...values]
}
