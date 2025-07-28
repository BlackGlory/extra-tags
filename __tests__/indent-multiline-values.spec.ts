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
    test('position: begin', () => {
      const result = indentMultilineValues`
        a
        ${'\nb'}
        c
      `
      const [strings, ...values] = result

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

    test('position: end', () => {
      const result = indentMultilineValues`
        a
        ${'b\n'}
        c
      `
      const [strings, ...values] = result

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

    test('edge: multiple values in one line #1', () => {
      const result = indentMultilineValues`
        a
        ${'b\n'}${'c'}
        d
      `
      const [strings, ...values] = result

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
      const result = indentMultilineValues`
        a
        ${'\nb'}${'c'}
        d
      `
      const [strings, ...values] = result

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
      const result = indentMultilineValues`
        a
        ${'b'}${'\nc'}
        d
      `
      const [strings, ...values] = result

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
      const result = indentMultilineValues`
        a
        ${'b'}${'c\n'}
        d
      `
      const [strings, ...values] = result

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
  })
})
