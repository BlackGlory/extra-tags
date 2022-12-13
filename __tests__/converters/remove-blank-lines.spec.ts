import { removeBlankLines } from '@converters/remove-blank-lines'

test('removeBlankLines(text: string): string', () => {
  const result = removeBlankLines(
    '\n'
  + 'hello' + '\n'
  + '\n'
  + 'world' + '\n'
  + '\n'
  )

  expect(result).toBe(
    'hello' + '\n'
  + 'world'
  )
})
