import { map } from '@creators/map'

test(`
  map<T, U>(
    fn: (value: T, index: number) => U
  ): (strings: TemplateStringsArray, ...values: T[]) => TagParameters<U>
`, () => {
  const fn = jest.fn(x => `${x}${x}`)

  const tag = map(fn)
  const result  = tag`a${'b'}c${'d'}e`
  const [strings, ...values] = result

  expect(fn).nthCalledWith(1, 'b', 0)
  expect(fn).nthCalledWith(2, 'd', 1)
  expect([...strings]).toEqual(['a', 'c', 'e'])
  expect(strings.raw).toEqual(['a', 'c', 'e'])
  expect(values).toEqual(['bb', 'dd'])
})
