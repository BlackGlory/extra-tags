import { removeMultilineHeader } from './remove-multiline-header'
import { removeMultilineFooter } from './remove-multiline-footer'
import { removeExtraIndents } from './remove-extra-indents'
import { concat } from './concat'
import { valuesToStrings } from './values-to-strings'
import { indentMultilineValues } from './indent-multiline-values'

export function oneline(strings: TemplateStringsArray, ...values: unknown[]): string {
  const text = removeMultilineFooter(
    removeMultilineHeader(
      concat(
        ...indentMultilineValues(
          ...valuesToStrings(strings, ...values)
        )
      )
    )
  )

  if (text.includes('\n')) {
    return removeExtraIndents(text, { ignoreBlankLines: true })
      .replace(/\n+/g, ' ')
  } else {
    return text
  }
}
