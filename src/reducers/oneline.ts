import { removeMultilineHeader } from '@converters/remove-multiline-header'
import { removeMultilineFooter } from '@converters/remove-multiline-footer'
import { removeExtraIndents } from '@converters/remove-extra-indents'
import { concat } from '@reducers/concat'
import { valuesToStrings } from '@transformers/values-to-strings'
import { indentMultilineValues } from '@transformers/indent-multiline-values'

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
