import { isArray, isObject, isFunction, isString, isBigInt } from '@blackglory/prelude'
import { map } from '@src/map.js'
import { dedent } from '@src/dedent.js'

export type JavaScriptValue =
| string
| number
| bigint
| boolean
| null
| undefined
| { [property: string | number]: JavaScriptValue }
| JavaScriptValue[]
| ((...args: unknown[]) => unknown)

export function javascript(
  strings: ReadonlyArray<string>
, ...values: JavaScriptValue[]
): string {
  return dedent(...map(stringifyJavaScriptValue, strings, ...values))
}

function stringifyJavaScriptValue(val: JavaScriptValue): string {
  if (isString(val)) return stringifyString(val)
  if (isBigInt(val)) return stringifyBigInt(val)
  if (isArray(val)) return stringifyArray(val)
  if (isFunction(val)) return stringifyFunction(val)
  if (isObject(val)) return stringifyObject(val)
  return `${val}`
}

function stringifyFunction(fn: (...args: unknown[]) => unknown): string {
  return fn.toString()
}

function stringifyString(text: string): string {
  return JSON.stringify(text)
}

function stringifyObject(obj: object): string {
  const body = Object.entries(obj)
    .map(([key, value]) => {
      return `${stringifyJavaScriptValue(key)}: ${stringifyJavaScriptValue(value)}`
    })
    .join(',')

  return '{' + body + '}'
}

function stringifyArray(arr: JavaScriptValue[]): string {
  const body = arr.map(x => stringifyJavaScriptValue(x)).join(',')

  return '[' + body + ']'
}

function stringifyBigInt(val: bigint): string {
  return `BigInt(${stringifyJavaScriptValue(val.toString())})`
}
