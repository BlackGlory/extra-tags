import { filter } from '@operators/filter'
import { collect } from '@test/utils'

describe('filter', () => {
  test('skip the first value', () => {
    const fn = jest.fn(x => typeof x !== 'number')

    const [strings, ...values] = filter(fn, ...collect`a${0}b${'c'}d`)

    expect(fn).nthCalledWith(1, 0, 0)
    expect(fn).nthCalledWith(2, 'c', 1)
    expect([...strings]).toEqual(['ab', 'd'])
    expect(strings.raw).toEqual(['ab', 'd'])
    expect(values).toEqual(['c'])
  })

  test('skip the last value', () => {
    const fn = jest.fn(x => typeof x !== 'number')

    const [strings, ...values] = filter(fn, ...collect`a${'b'}c${0}d`)

    expect(fn).nthCalledWith(1, 'b', 0)
    expect(fn).nthCalledWith(2, 0, 1)
    expect([...strings]).toEqual(['a', 'cd'])
    expect(strings.raw).toEqual(['a', 'cd'])
    expect(values).toEqual(['b'])
  })
})
