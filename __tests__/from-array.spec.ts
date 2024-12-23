import { describe, test, expect } from 'vitest'
import { fromArray } from '@src/from-array.js'

describe('fromArray', () => {
  test('string only', () => {
    const result = fromArray(['foo'])

    expect(result).toStrictEqual([['foo']])
  })

  test('value only', () => {
    const result = fromArray(['', 1, ''])

    expect(result).toStrictEqual([['', ''], 1])
  })

  test('string and value', () => {
    const result = fromArray(['a', 1, 'b', 2, 'c'])

    expect(result).toStrictEqual([['a', 'b', 'c'], 1, 2])
  })
})
