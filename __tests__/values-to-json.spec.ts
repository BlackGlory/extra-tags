import { valuesToJSON } from '@src/values-to-json'

test(`
  valuesToJSON(
    strings: TemplateStringsArray
  , ...values: unknown[]
  ): TagParameters<string>`
, () => {
  const result = valuesToJSON`a${'b'}c${4}e${[6]}f`
  const [strings, ...values] = result

  expect([...strings]).toEqual(['a', 'c', 'e', 'f'])
  expect(values).toEqual(['"b"', '4', '[6]'])
})
