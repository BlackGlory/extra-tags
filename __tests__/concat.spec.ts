import { concat } from '@src/concat'

test('concat', () => {
  const result = concat`a${'b'}c${'d'}e`

  expect(result).toBe('abcde')
})
