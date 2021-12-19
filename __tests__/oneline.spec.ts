import { oneline } from '@src/oneline'

describe('oneline(strings: TemplateStringsArray, ...values: unknown[]): string', () => {
  describe('no indentation', () => {
    test('empty', () => {
      const result = oneline``

      expect(result).toBe('')
    })

    test('single-line', () => {
      const result = oneline`hello world`

      expect(result).toBe('hello world')
    })
  })

  describe('indented', () => {
    test('single-line', () => {
      const result = oneline` hello world `

      expect(result).toBe(' hello world ')
    })

    test('multi-line strings', () => {
      const result = oneline`
        hello
        world
      `

      expect(result).toBe('hello world')
    })

    test('multi-line strings with blank lines', () => {
      const result = oneline`
        hello

        world
      `

      expect(result).toBe('hello world')
    })

    test('multi-line values', () => {
      const result = oneline`
        a
        ${'b\nc'}
        d
      `

      expect(result).toBe('a b c d')
    })
  })
})
