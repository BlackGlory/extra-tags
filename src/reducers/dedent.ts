import { removeExtraIndents, removeLeadingBlankLines, removeTrailingBlankLines } from 'extra-utils'
import { concat } from '@reducers/concat'
import { map } from '@operators/map'
import { indentMultilineValues } from '@operators/indent-multiline-values'

export function dedent(strings: TemplateStringsArray, ...values: unknown[]): string {
  return (
    removeExtraIndents(
      removeLeadingBlankLines(
        removeTrailingBlankLines(
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
