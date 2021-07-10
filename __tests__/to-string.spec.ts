import { toString } from '@src/to-string'

describe('toString(strings: TemplateStringsArray, ...values: string[]): string', () => {
  test('truthy values', () => {
    const result = toString`a${'b'}c`

    expect(result).toBe('abc')
  })

  test('falsy values', () => {
    const result = toString`a${undefined}c`

    expect(result).toBe('aundefinedc')
  })
})
