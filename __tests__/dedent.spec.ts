import { dedent } from '@src/dedent'

describe('dedent(strings: TemplateStringsArray, ...values: unknown[]): string', () => {
  describe('no indentation', () => {
    test('empty', () => {
      const result = dedent``

      expect(result).toBe('')
    })

    test('single-line', () => {
      const result = dedent`hello world`

      expect(result).toBe('hello world')
    })
  })

  describe('indented', () => {
    test('single-line', () => {
      const result = dedent` hello world `

      expect(result).toBe('hello world ')
    })

    test('multi-line strings', () => {
      const result = dedent`
        hello
        world
      `

      expect(result).toBe(
        'hello' + '\n'
      + 'world'
      )
    })

    test('multi-line values', () => {
      const result = dedent`
        a
        ${'b\nc'}
        d
      `

      expect(result).toBe(
        'a' + '\n'
      + 'b' + '\n'
      + 'c' + '\n'
      + 'd'
      )
    })
  })
})
