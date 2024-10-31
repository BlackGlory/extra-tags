import { describe, test, expect } from 'vitest'
import { indentMultilineValues } from '@src/indent-multiline-values.js'

describe('indentMultilineValues', () => {
  test('single-line value', () => {
    const result = indentMultilineValues`
      a
      ${'b'}
      c
    `
    const [strings, ...values] = result

    expect([...strings]).toEqual([
      '\n'
    + ' '.repeat(6) + 'a' + '\n'
    + ' '.repeat(6)
    , '\n'
    + ' '.repeat(6) + 'c' + '\n'
    + ' '.repeat(4)
    ])
    expect(values).toEqual(['b'])
  })

  describe('multi-line value', () => {
    test('general', () => {
      const result = indentMultilineValues`
        a
        ${'b\nc'}
        d
      `
      const [strings, ...values] = result

      expect([...strings]).toEqual([
        '\n'
      + ' '.repeat(8) + 'a' + '\n'
      + ' '.repeat(8)
      , '\n'
      + ' '.repeat(8) + 'd' + '\n'
      + ' '.repeat(6)
      ])
      expect(values).toEqual([
        'b' + '\n'
      + ' '.repeat(8) + 'c'
      ])
    })

    test('edge: blank lines', () => {
      const result = indentMultilineValues`
        
        ${'a\nb'}
        
      `
      const [strings, ...values] = result

      expect([...strings]).toEqual([
        '\n'
      + ' '.repeat(8) + '\n'
      + ' '.repeat(8)
      , '\n'
      + ' '.repeat(8) + '\n'
      + ' '.repeat(6)
      ])
      expect(values).toEqual([
        'a' + '\n'
      + ' '.repeat(8) + 'b'
      ])
    })
  })
})
