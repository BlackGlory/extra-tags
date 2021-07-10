export function createTemplateStringsArray(strings: string[], raw: string[]): TemplateStringsArray {
  return Object.assign([], strings, { raw })
}
