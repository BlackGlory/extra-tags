import { removeMultilineFooter } from '@src/remove-multiline-footer'

describe('removeMultilineFooter(text: string): string', () => {
  describe('mutliline footer exists', () => {
    test('\\n\\s+', () => {
      const result = removeMultilineFooter(
        '  ' + '\n'
      + 'a' + '\n'
      + '  '
      )

      expect(result).toBe(
        '  ' + '\n'
      + 'a'
      )
    })

    test('\\n', () => {
      const result = removeMultilineFooter(
        '  ' + '\n'
      + 'a' + '\n'
      )

      expect(result).toBe(
        '  ' + '\n'
      + 'a'
      )
    })
  })

  test('no multiline footer', () => {
    const result = removeMultilineFooter(
      '  ' + '\n'
    + 'a'
    )

    expect(result).toBe(
      '  ' + '\n'
    + 'a'
    )
  })
})
