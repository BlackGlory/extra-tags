import { filter } from '@operators/filter'

describe(`
  filter<T, U extends T = T>(
    predicate: (value: T, index: number) => boolean
  ): (strings: TemplateStringsArray, ...values: T[]) => TagParameters<U>
`, () => {
  test('skip the first value', () => {
    const fn = jest.fn(x => typeof x !== 'number')

    const tag = filter(fn)
    const result = tag`a${0}b${'c'}d`
    const [strings, ...values] = result

    expect(fn).nthCalledWith(1, 0, 0)
    expect(fn).nthCalledWith(2, 'c', 1)
    expect([...strings]).toEqual(['ab', 'd'])
    expect(strings.raw).toEqual(['ab', 'd'])
    expect(values).toEqual(['c'])
  })

  test('skip the last value', () => {
    const fn = jest.fn(x => typeof x !== 'number')

    const tag = filter(fn)
    const result = tag`a${'b'}c${0}d`
    const [strings, ...values] = result

    expect(fn).nthCalledWith(1, 'b', 0)
    expect(fn).nthCalledWith(2, 0, 1)
    expect([...strings]).toEqual(['a', 'cd'])
    expect(strings.raw).toEqual(['a', 'cd'])
    expect(values).toEqual(['b'])
  })
})
