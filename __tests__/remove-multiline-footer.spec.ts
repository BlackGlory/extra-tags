import { removeMultilineFooter } from '@src/remove-multiline-footer'

test('removeMultilineFooter(text: string): string', () => {
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
