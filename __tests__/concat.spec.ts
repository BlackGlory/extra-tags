import { test, expect } from 'vitest'
import { concat } from '@src/concat.js'

test('concat', () => {
  const result = concat`a${'b'}c${'d'}e`

  expect(result).toBe('abcde')
})
