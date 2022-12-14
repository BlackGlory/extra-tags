import { valuesToStrings } from '@operators/values-to-strings'

test(`
  valuesToStrings(
    strings: TemplateStringsArray
  , ...values: unknown[]
  ): TagParameters<string>`
, () => {
  const result = valuesToStrings`a${'b'}c${undefined}e`
  const [strings, ...values] = result

  expect([...strings]).toEqual(['a', 'c', 'e'])
  expect(values).toEqual(['b', 'undefined'])
})
