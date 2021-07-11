import { removeMultilineHeader } from './remove-multiline-header'
import { removeMultilineFooter } from './remove-multiline-footer'
import { removeExtraIndents } from './remove-extra-indents'
import { toString } from './to-string'

export function dedent(strings: TemplateStringsArray, ...values: unknown[]): string {
  return (
    removeExtraIndents(
      removeMultilineFooter(
        removeMultilineHeader(
          toString(strings, ...values)
        )
      )
    )
  )
}
