import { describe, test, expect } from 'vitest'
import { array } from '@src/array.js'

describe('array', () => {
  test('string only', () => {
    const result = array`foo`

    expect(result).toStrictEqual(['foo'])
  })

  test('value only', () => {
    const result = array`${1}`

    expect(result).toStrictEqual(['', 1, ''])
  })

  test('string and value', () => {
    const result = array`a${1}b${2}c`

    expect(result).toStrictEqual(['a', 1, 'b', 2, 'c'])
  })
})
