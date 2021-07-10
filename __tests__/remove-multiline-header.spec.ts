import { removeMultilineHeader } from '@src/remove-multiline-header'

test('removeMultilineHeader(text: string): string', () => {
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
