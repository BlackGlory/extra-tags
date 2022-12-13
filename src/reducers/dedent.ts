import { removeMultilineHeader } from '@converters/remove-multiline-header'
import { removeMultilineFooter } from '@converters/remove-multiline-footer'
import { removeExtraIndents } from '@converters/remove-extra-indents'
import { concat } from '@reducers/concat'
import { valuesToStrings } from '@transformers/values-to-strings'
import { indentMultilineValues } from '@transformers/indent-multiline-values'

export function dedent(strings: TemplateStringsArray, ...values: unknown[]): string {
  return (
    removeExtraIndents(
      removeMultilineFooter(
        removeMultilineHeader(
          concat(
            ...indentMultilineValues(
              ...valuesToStrings(strings, ...values)
            )
          )
        )
      )
    , { ignoreBlankLines: true }
    )
  )
}
