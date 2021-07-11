# extra-tags

## Install

```sh
npm install --save extra-tags
# or
yarn add extra-tags
```

## Usage

```ts
import {
  concat
, removeFalsyValues
, removeExtraIndents
, removeMultilineHeader
, removeMultilineFooter
, removeBlankLines
, valuesToStrings
, indentMultilineValues
} from 'extra-tags'

function code(strings: TemplateStringsArray, ...values: unknown[]): string {
  return (
    removeBlankLines(
      removeExtraIndents(
        removeMultilineFooter(
          removeMultilineHeader(
            concat(
              ...indentMultilineValues(
                ...valuesToStrings(
                  ...removeFalsyValues(strings, ...values)
                )
              )
            )
          )
        )
      )
    )
  )
}

const on = true

code`
  <div>
    ${on && '<p>On</p>'}
    ${!on && '<p>Off</p>'}
  </div>
`
// <div>
//   <p>On</p>
// </div>
```

## API

```ts
type TagParameters<T> = [strings: TemplateStringsArray, ...values: T[]]

type Converter<T, U> = (value: T) => U
type Reducer<T, U> = (strings: TemplateStringsArray, ...values: T[]) => U
type Transformer<T, U> = (strings: TemplateStringsArray, ...values: T[]) => TagParameters<U>
```

### Converter

#### removeExtraIndents

```ts
function removeExtraIndents(text: string): string
```

#### removeBlankLines

```ts
function removeBlankLines(text: string): string
```

#### removeMultilineHeader

```ts
function removeMultilineHeader(text: string): string
```

#### removeMultilineFooter

```ts
function removeMultilineFooter(text: string): string
```

### Reducer

#### concat

```ts
function concat(strings: TemplateStringsArray, ...values: unknown[]): string
```

#### dedent

```ts
function dedent(strings: TemplateStringsArray, ...values: unknown[]): string
```

### Transformer

#### removeFalsyValues

```ts
function removeFalsyValues<T>(
  strings: TemplateStringsArray
, ...values: T[]
): TagParameters<Exclude<T, Falsy>>
```

#### valuesToStrings

```ts
function stringifyValues(
  strings: TemplateStringsArray
, ...values: unknown[]
): TagParameters<string>
```

#### indentMultilineValues

```ts
function indentMultilineValues(
  strings: TemplateStringsArray
, ...values: string[]
): TagParameters<string> {
```

### Transformer Creator

#### map

```ts
function map<T, U>(
  fn: (value: T, index: number) => U
): (strings: TemplateStringsArray, ...values: T[]) => TagParameters<U>
```

#### filter

```ts
function filter<T, U extends T = T>(
  predicate: (value: T, index: number) => boolean
): (strings: TemplateStringsArray, ...values: T[]) => TagParameters<U>
```
