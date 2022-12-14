import { concat } from '@src/concat'

test('concat(strings: TemplateStringsArray, ...values: string[]): string', () => {
  const result = concat`a${'b'}c${undefined}e`

  expect(result).toBe('abcundefinede')
})
