import { dedent } from '@src/dedent.js'

describe('dedent', () => {
  describe('without indentations', () => {
    test('empty', () => {
      const result = dedent``

      expect(result).toBe('')
    })

    test('single-line', () => {
      const result = dedent`hello world`

      expect(result).toBe('hello world')
    })
  })

  describe('with indentations', () => {
    test('single-line', () => {
      const result = dedent` hello world `

      expect(result).toBe('hello world ')
    })

    test('multi-line strings', () => {
      const result = dedent`
        hello
        world
      `

      expect(result).toBe(
        'hello' + '\n'
      + 'world'
      )
    })

    describe('multi-line strings with blank lines', () => {
      describe('begin', () => {
        test('without indentation', () => {
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

      describe('middle', () => {
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

      describe('end', () => {
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

    test('multi-line values', () => {
      const result = dedent`
        a
        ${'b\nc'}
        d
      `

      expect(result).toBe(
        'a' + '\n'
      + 'b' + '\n'
      + 'c' + '\n'
      + 'd'
      )
    })
  })
})
