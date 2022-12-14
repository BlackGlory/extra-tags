import { removeExtraIndents, removeLeadingBlankLines, removeTrailingBlankLines } from 'extra-utils'
import { concat } from '@reducers/concat'
import { map } from '@operators/map'
import { indentMultilineValues } from '@operators/indent-multiline-values'

export function oneline(strings: TemplateStringsArray, ...values: unknown[]): string {
  const text = removeLeadingBlankLines(
    removeTrailingBlankLines(
      concat(
        ...indentMultilineValues(
          ...map(String, strings, ...values)
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
