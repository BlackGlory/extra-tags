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

  test('multi-line value', () => {
    const result = indentMultilineValues`
      a
      ${'b\nc'}
      d
    `
    const [strings, ...values] = result

    expect([...strings]).toEqual([
      '\n'
    + ' '.repeat(6) + 'a' + '\n'
    + ' '.repeat(6)
    , '\n'
    + ' '.repeat(6) + 'd' + '\n'
    + ' '.repeat(4)
    ])
    expect(values).toEqual([
      'b' + '\n'
    + ' '.repeat(6) + 'c'
    ])
  })
})
