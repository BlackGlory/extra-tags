import { describe, test, expect } from 'vitest'
import { javascript } from '@src/javascript.js'

describe('javascript', () => {
  test('string', () => {
    const result = javascript`
      ${'str'}
    `

    expect(result).toBe('"str"')
  })

  test('number', () => {
    const result = javascript`
      ${1}
    `

    expect(result).toBe('1')
  })

  test('bigint', () => {
    const result = javascript`
      ${BigInt(1)}
    `

    expect(result).toBe('BigInt("1")')
  })

  test('boolean', () => {
    const result = javascript`
      ${true}
    `

    expect(result).toBe('true')
  })

  test('null', () => {
    const result = javascript`
      ${null}
    `

    expect(result).toBe('null')
  })

  test('undefined', () => {
    const result = javascript`
      ${undefined}
    `

    expect(result).toBe('undefined')
  })

  test('object', () => {
    const result = javascript`
      ${{ key: 'value' }}
    `

    expect(result).toBe('{"key": "value"}')
  })

  test('array', () => {
    const result = javascript`
      ${[1, 2, 3]}
    `

    expect(result).toBe('[1,2,3]')
  })

  test('function', () => {
    const result = javascript`
      ${function hello() { return 'value' }}
    `

    expect(result).toBe(
      'function hello() {' + '\n'
    + '      return "value";' + '\n'
    + '    }'
    )
  })

  test('arrow function', () => {
    const result = javascript`
      ${() => 'value'}
    `

    expect(result).toBe('() => "value"')
  })
})
