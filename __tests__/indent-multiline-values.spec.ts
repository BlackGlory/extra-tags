import { describe, test, expect } from 'vitest'
import { indentMultilineValues } from '@src/indent-multiline-values.js'

describe('indentMultilineValues', () => {
  test('single-line value', () => {
    const [strings, ...values] = indentMultilineValues`
      a
      ${'b'}
      c
    `

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
    test('position: begin', () => {
      const [strings, ...values] = indentMultilineValues`
        a
        ${'\nb'}
        c
      `

      expect([...strings]).toEqual([
        '\n'
      + ' '.repeat(8) + 'a' + '\n'
      + ' '.repeat(8)
      , '\n'
      + ' '.repeat(8) + 'c' + '\n'
      + ' '.repeat(6)
      ])
      expect(values).toEqual([
        '\n'
      + ' '.repeat(8) + 'b'
      ])
    })

    test('position: middle', () => {
      const [strings, ...values] = indentMultilineValues`
        a
        ${'b\nc'}
        d
      `

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

    test('position: end', () => {
      const [strings, ...values] = indentMultilineValues`
        a
        ${'b\n'}
        c
      `

      expect([...strings]).toEqual([
        '\n'
      + ' '.repeat(8) + 'a' + '\n'
      + ' '.repeat(8)
      , '\n'
      + ' '.repeat(8) + 'c' + '\n'
      + ' '.repeat(6)
      ])
      expect(values).toEqual([
        'b' + '\n'
      + ' '.repeat(8)
      ])
    })

    test('edge: blank lines', () => {
      const [strings, ...values] = indentMultilineValues`
        
        ${'a\nb'}
        
      `

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

    test('edge: multiple values in one line #1', () => {
      const [strings, ...values] = indentMultilineValues`
        a
        ${'b\n'}${'c'}
        d
      `

      expect([...strings]).toEqual([
        '\n'
      + ' '.repeat(8) + 'a' + '\n'
      + ' '.repeat(8)
      , ''
      , '\n'
      + ' '.repeat(8) + 'd' + '\n'
      + ' '.repeat(6)
      ])
      expect(values).toEqual([
        'b' + '\n'
      + ' '.repeat(8)
      , 'c'
      ])
    })

    test('edge: multiple values in one line #2', () => {
      const [strings, ...values] = indentMultilineValues`
        a
        ${'\nb'}${'c'}
        d
      `

      expect([...strings]).toEqual([
        '\n'
      + ' '.repeat(8) + 'a' + '\n'
      + ' '.repeat(8)
      , ''
      , '\n'
      + ' '.repeat(8) + 'd' + '\n'
      + ' '.repeat(6)
      ])
      expect(values).toEqual([
        '\n'
      + ' '.repeat(8) + 'b'
      , 'c'
      ])
    })

    test('edge: multiple values in one line #3', () => {
      const [strings, ...values] = indentMultilineValues`
        a
        ${'b'}${'\nc'}
        d
      `

      expect([...strings]).toEqual([
        '\n'
      + ' '.repeat(8) + 'a' + '\n'
      + ' '.repeat(8)
      , ''
      , '\n'
      + ' '.repeat(8) + 'd' + '\n'
      + ' '.repeat(6)
      ])
      expect(values).toEqual([
        'b'
      , '\n'
      + ' '.repeat(8) + 'c'
      ])
    })

    test('edge: multiple values in one line #4', () => {
      const [strings, ...values] = indentMultilineValues`
        a
        ${'b'}${'c\n'}
        d
      `

      expect([...strings]).toEqual([
        '\n'
      + ' '.repeat(8) + 'a' + '\n'
      + ' '.repeat(8)
      , ''
      , '\n'
      + ' '.repeat(8) + 'd' + '\n'
      + ' '.repeat(6)
      ])
      expect(values).toEqual([
        'b'
      , 'c' + '\n'
      + ' '.repeat(8)
      ])
    })

    test('edge: multiple values in one line #5', () => {
      const [strings, ...values] = indentMultilineValues`
        ${'a '}${'\nb'}
      `

      expect([...strings]).toStrictEqual([
        '\n'
      + ' '.repeat(8)
      , ''
      , '\n'
      + ' '.repeat(6)
      ])
      expect(values).toStrictEqual([
        'a '
      , '\n'
      + ' '.repeat(8) + 'b'
      ])
    })

    test('edge: multiple newlines #1', () => {
      const [strings, ...values] = indentMultilineValues`
        a
        ${'\n\nb'}
        c
      `

      expect([...strings]).toEqual([
        '\n'
      + ' '.repeat(8) + 'a' + '\n'
      + ' '.repeat(8)
      , '\n'
      + ' '.repeat(8) + 'c' + '\n'
      + ' '.repeat(6)
      ])
      expect(values).toEqual([
        '\n'
      + ' '.repeat(8) + '\n'
      + ' '.repeat(8) + 'b'
      ])
    })

    test('edge: multiple newlines #2', () => {
      const [strings, ...values] = indentMultilineValues`
        a
        ${'b\n\nc'}
        d
      `

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
      + ' '.repeat(8) + '\n'
      + ' '.repeat(8) + 'c'
      ])
    })

    test('edge: multiple newlines #3', () => {
      const [strings, ...values] = indentMultilineValues`
        a
        ${'b\n\n'}
        c
      `

      expect([...strings]).toEqual([
        '\n'
      + ' '.repeat(8) + 'a' + '\n'
      + ' '.repeat(8)
      , '\n'
      + ' '.repeat(8) + 'c' + '\n'
      + ' '.repeat(6)
      ])
      expect(values).toEqual([
        'b' + '\n'
      + ' '.repeat(8) + '\n'
      + ' '.repeat(8)
      ])
    })

    test('edge: multiple newlines #4', () => {
      const [strings, ...values] = indentMultilineValues`
        a
        ${'\nb\n'}
        c
      `

      expect([...strings]).toEqual([
        '\n'
      + ' '.repeat(8) + 'a' + '\n'
      + ' '.repeat(8)
      , '\n'
      + ' '.repeat(8) + 'c' + '\n'
      + ' '.repeat(6)
      ])
      expect(values).toEqual([
        '\n'
      + ' '.repeat(8) + 'b' + '\n'
      + ' '.repeat(8)
      ])
    })
  })
})
