import {
  pipe
, removeExtraIndents
, removeLeadingBlankLines
, removeTrailingBlankLines
} from 'extra-utils'
import { concat } from '@tags/concat'
import { map } from '@operators/map'
import { indentMultilineValues } from '@operators/indent-multiline-values'

export function oneline(strings: TemplateStringsArray, ...values: unknown[]): string {
  const text = pipe(
    [strings, ...values] as const
  , params => map(String, ...params)
  , params => indentMultilineValues(...params)
  , params => concat(...params)
  , removeLeadingBlankLines
  , removeTrailingBlankLines
  )

  return text.includes('\n')
       ? removeExtraIndents(text, { ignoreBlankLines: true }).replace(/\n+/g, ' ')
       : text
}
