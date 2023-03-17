import { map } from '@src/map.js'
import { collect } from '@test/utils.js'
import { jest } from '@jest/globals'

test('map', () => {
  const fn = jest.fn(x => `${x}${x}`)

  const [strings, ...values] = map(fn, ...collect`a${'b'}c${'d'}e`)

  expect(fn).nthCalledWith(1, 'b', 0)
  expect(fn).nthCalledWith(2, 'd', 1)
  expect([...strings]).toEqual(['a', 'c', 'e'])
  expect(strings.raw).toEqual(['a', 'c', 'e'])
  expect(values).toEqual(['bb', 'dd'])
})
