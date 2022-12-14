import { map } from '@src/map'
import { dedent } from '@src/dedent'
import { isArray, isObject, isFunction, isString, isBigInt } from '@blackglory/types'

export type Value =
| string
| number
| boolean
| null
| bigint
| undefined
| ((args: any) => any)
| { [property: string]: Value }
| Value[]

export function javascript(strings: TemplateStringsArray, ...values: Value[]): string {
  return dedent(...map(stringify, strings, ...values))
}

function stringify(val: Value): string {
  if (isString(val)) return stringifyString(val)
  if (isFunction(val)) return stringifyFunction(val)
  if (isArray(val)) return stringifyArray(val)
  if (isObject(val)) return stringifyObject(val)
  if (isBigInt(val)) return stringifyBigInt(val)
  return `${val}`
}

function stringifyFunction(val: (...args: any) => any): string {
  return val.toString()
}

function stringifyString(val: string): string {
  return JSON.stringify(val)
}

function stringifyObject(obj: object): string {
  const body = Object.entries(obj)
    .map(([key, value]) => `${stringify(key)}:${stringify(value)}`)
    .join(',')

  return '{' + body + '}'
}

function stringifyArray(arr: Value[]): string {
  const body = arr.map(x => stringify(x)).join(',')

  return '[' + body + ']'
}

function stringifyBigInt(val: bigint): string {
  return `BigInt(${stringify(val.toString())})`
}
