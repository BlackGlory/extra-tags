import { test, expect } from 'vitest'
import { array } from '@src/array.js'

test('array', () => {
  const result = array`a${1}b${2}c`

  expect(result).toStrictEqual(['a', 1, 'b', 2, 'c'])
})
