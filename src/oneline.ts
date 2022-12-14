import {
  pipe
, removeExtraIndents
, removeLeadingBlankLines
, removeTrailingBlankLines
} from 'extra-utils'
import { concat } from '@src/concat'
import { map } from '@src/map'
import { indentMultilineValues } from '@src/indent-multiline-values'

export function oneline(strings: TemplateStringsArray, ...values: unknown[]): string {
  return pipe(
    [strings, ...values] as const
  , params => map(String, ...params)
  , params => indentMultilineValues(...params)
  , params => concat(...params)
  , removeLeadingBlankLines
  , removeTrailingBlankLines
  , text => text.includes('\n')
          ? removeExtraIndents(text, { ignoreBlankLines: true }).replace(/\n+/g, ' ')
          : text
  )
}
