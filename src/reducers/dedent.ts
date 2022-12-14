import { removeMultilineHeader } from '@converters/remove-multiline-header'
import { removeMultilineFooter } from '@converters/remove-multiline-footer'
import { removeExtraIndents } from '@converters/remove-extra-indents'
import { concat } from '@reducers/concat'
import { map } from '@operators/map'
import { indentMultilineValues } from '@operators/indent-multiline-values'

export function dedent(strings: TemplateStringsArray, ...values: unknown[]): string {
  return (
    removeExtraIndents(
      removeMultilineFooter(
        removeMultilineHeader(
          concat(
            ...indentMultilineValues(
              ...map(String, strings, ...values)
            )
          )
        )
      )
    , { ignoreBlankLines: true }
    )
  )
}
