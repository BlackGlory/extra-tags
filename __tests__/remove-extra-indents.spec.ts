import { removeExtraIndents } from '@src/remove-extra-indents'

describe('removeExtraIndents(text: string): string', () => {
  describe('no indentation', () => {
    test('empty', () => {
      const result = removeExtraIndents('')

      expect(result).toBe('')
    })

    test('single-line', () => {
      const result = removeExtraIndents('hello world')

      expect(result).toBe('hello world')
    })

    test('multi-line', () => {
      const result = removeExtraIndents(
        'hello' + '\n'
      + 'world'
      )

      expect(result).toBe(
        'hello' + '\n'
      + 'world'
      )
    })
  })

  describe('indented', () => {
    test('single-line', () => {
      const result = removeExtraIndents(' hello world ')

      expect(result).toBe('hello world ')
    })

    test('multi-line', () => {
      const result = removeExtraIndents(`
        hello
        world
      `)

      expect(result).toBe(`
        hello
        world
      `)
    })
  })
})
