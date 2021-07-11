import { removeMultilineHeader } from '@src/remove-multiline-header'

describe('removeMultilineHeader(text: string): string', () => {
  describe('multiline header exists', () => {
    test('\\s+\\n', () => {
      const result = removeMultilineHeader(
        '  ' + '\n'
      + 'a' + '\n'
      + '  '
      )

      expect(result).toBe(
        'a' + '\n'
      + '  '
      )
    })

    test('\\n', () => {
      const result = removeMultilineHeader(
        '\n'
      + 'a' + '\n'
      + '  '
      )

      expect(result).toBe(
        'a' + '\n'
      + '  '
      )
    })
  })

  test('no multiline header', () => {
    const result = removeMultilineHeader(
      'a' + '\n'
    + '  '
    )

    expect(result).toBe(
      'a' + '\n'
    + '  '
    )
  })
})
