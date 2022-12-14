import {
  pipe
, removeExtraIndents
, removeLeadingBlankLines
, removeTrailingBlankLines
} from 'extra-utils'
import { concat } from '@tags/concat'
import { map } from '@operators/map'
import { indentMultilineValues } from '@operators/indent-multiline-values'

export function dedent(strings: TemplateStringsArray, ...values: unknown[]): string {
  return pipe(
    [strings, ...values] as const
  , params => map(String, ...params)
  , params => indentMultilineValues(...params)
  , params => concat(...params)
  , removeLeadingBlankLines
  , removeTrailingBlankLines
  , text => removeExtraIndents(text, { ignoreBlankLines: true })
  )
}
