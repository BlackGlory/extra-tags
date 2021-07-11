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

    test('multi-line', () => {
      const result = dedent`
        hello
        world
      `

      expect(result).toBe(
        'hello' + '\n'
      + 'world'
      )
    })
  })
})
