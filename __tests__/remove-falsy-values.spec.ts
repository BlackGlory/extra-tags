import { removeFalsyValues } from '@src/remove-falsy-values'

test(`
  removeFalsyValues<T>(strings: TemplateStringsArray, ...values: T[]): TagParameters<Exclude<T, Falsy>>
`, () => {
  const result = removeFalsyValues`a${undefined}b${'c'}d`
  const [strings, ...values] = result

  expect([...strings]).toEqual(['ab', 'd'])
  expect(values).toEqual(['c'])
})
