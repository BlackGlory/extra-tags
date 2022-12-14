import {
  pipe
, removeExtraIndents
, removeLeadingBlankLines
, removeTrailingBlankLines
} from 'extra-utils'
import { concat } from '@src/concat'
import { map } from '@src/map'
import { indentMultilineValues } from '@src/indent-multiline-values'

export function dedent(strings: TemplateStringsArray, ...values: unknown[]): string {
  return pipe(
    [strings, ...values] as const
  , params => map(String, ...params)
  , params => indentMultilineValues(...params)
  , params => concat(...params)
  , text => removeLeadingBlankLines(text, 1)
  , text => removeTrailingBlankLines(text, 1)
  , text => removeExtraIndents(text, { ignoreBlankLines: true })
  )
}
