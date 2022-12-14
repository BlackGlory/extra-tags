import {
  pipe
, removeExtraIndents
, removeLeadingBlankLines
, removeTrailingBlankLines
, isString
} from 'extra-utils'
import { concat } from '@src/concat'
import { map } from '@src/map'
import { indentMultilineValues } from '@src/indent-multiline-values'

export function oneline(
  separator: string
, strings: TemplateStringsArray
, ...values: unknown[]
): string
export function oneline(
  separator: string
): (strings: TemplateStringsArray, ...values: unknown[]) => string
export function oneline(strings: TemplateStringsArray, ...values: unknown[]): string
export function oneline(...args:
| [separator: string]
| [separator: string, strings: TemplateStringsArray, ...values: unknown[]]
| [strings: TemplateStringsArray, ...values: unknown[]]
) {
  if (isString(args[0])) {
    if (args.length === 1) {
      const [separator] = args as [separator: string]

      return (strings: TemplateStringsArray, ...values: unknown[]): string => {
        return oneline(separator, strings, ...values)
      }
    } else {
      const [separator, strings, ...values] = args as [
        separator: string
      , strings: TemplateStringsArray
      , ...values: unknown[]
      ]

      return pipe(
        [strings, ...values] as const
      , params => map(String, ...params)
      , params => indentMultilineValues(...params)
      , params => concat(...params)
      , removeLeadingBlankLines
      , removeTrailingBlankLines
      , text => text.includes('\n')
              ? removeExtraIndents(text, { ignoreBlankLines: true })
                  .replace(/\n+/g, separator)
              : text
      )
    }
  } else {
    const [strings, ...values] = args as [
      strings: TemplateStringsArray
    , ...values: unknown[]
    ]

    return oneline('', strings, ...values)
  }
}
