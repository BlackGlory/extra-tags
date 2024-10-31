import { describe, test, expect } from 'vitest'
import { dedent } from '@src/dedent.js'

describe('dedent', () => {
  test('empty', () => {
    const result = dedent``

    expect(result).toBe('')
  })

  describe('single line', () => {
    test('general', () => {
      const result = dedent`hello world`

      expect(result).toBe('hello world')
    })

    test('with indentations', () => {
      const result = dedent` hello world `

      expect(result).toBe('hello world ')
    })
  })

  describe('multi lines', () => {
    describe('without values', () => {
      test('general', () => {
        const result = dedent`
          hello
          world
        `

        expect(result).toBe(
          'hello' + '\n'
        + 'world'
        )
      })

      describe('with blank lines', () => {
        describe('position: begin', () => {
          test('without indentations', () => {
            const result = dedent`

              hello
              world
            `

            expect(result).toBe(
              '\n'
            + 'hello' + '\n'
            + 'world'
            )
          })

          test('with indentations', () => {
            const result = dedent`
              
              hello
              world
            `

            expect(result).toBe(
              '\n'
            + 'hello' + '\n'
            + 'world'
            )
          })
        })

        describe('position: middle', () => {
          test('without indentations', () => {
            const result = dedent`
              hello

              world
            `

            expect(result).toBe(
              'hello' + '\n'
            + '\n'
            + 'world'
            )
          })

          test('with indentations', () => {
            const result = dedent`
              hello
              
              world
            `

            expect(result).toBe(
              'hello' + '\n'
            + '\n'
            + 'world'
            )
          })
        })

        describe('position: end', () => {
          test('without indentations', () => {
            const result = dedent`
              hello
              world

            `

            expect(result).toBe(
              'hello' + '\n'
            + 'world' + '\n'
            )
          })

          test('with indentations', () => {
            const result = dedent`
              hello
              world
              
            `

            expect(result).toBe(
              'hello' + '\n'
            + 'world' + '\n'
            )
          })
        })
      })
    })

    describe('with values', () => {
      test('general', () => {
        const result = dedent`
          ${'a'}
          ${'b\nc'}
          ${'d'}
        `

        expect(result).toBe(
          'a' + '\n'
        + 'b' + '\n'
        + 'c' + '\n'
        + 'd'
        )
      })

      test('line with indentations', () => {
        const result = dedent`
          ${'a'}
           ${'b\nc'}
          ${'d'}
        `

        expect(result).toBe(
          'a' + '\n'
        + ' b' + '\n'
        + ' c' + '\n'
        + 'd'
        )
      })

      test('value with indentations', () => {
        const result = dedent`
          ${'a'}
          ${' b\n c'}
          ${'d'}
        `

        expect(result).toBe(
          'a' + '\n'
        + ' b' + '\n'
        + ' c' + '\n'
        + 'd'
        )
      })

      test('with blank lines', () => {
        const result = dedent`

          ${'a'}

          ${'b\nc'}

          ${'d'}

        `

        expect(result).toBe(
          '\n'
        + 'a' + '\n'
        + '\n'
        + 'b' + '\n'
        + 'c' + '\n'
        + '\n'
        + 'd'
        + '\n'
        )
      })
    })
  })
})
