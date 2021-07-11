import { removeMultilineHeader } from './remove-multiline-header'
import { removeMultilineFooter } from './remove-multiline-footer'
import { removeExtraIndents } from './remove-extra-indents'
import { concat } from './concat'
import { valuesToStrings } from './values-to-strings'
import { indentMultilineValues } from './indent-multiline-values'

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
    )
  )
}
