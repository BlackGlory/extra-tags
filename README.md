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
  toString
, removeFalsyValues
, removeExtraIndents
, removeMultilineHeader
, removeMultilineFooter
, removeBlankLines
} from 'extra-tags'

function code(strings: TemplateStringsArray, ...values: unknown[]): string {
  return (
    removeBlankLines(
      removeExtraIndents(
        removeMultilineFooter(
          removeMultilineHeader(
            toString(
              ...removeFalsyValues(strings, ...values)
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

#### toString

```ts
function toString(strings: TemplateStringsArray, ...values: unknown[]): string
```

### Transformer

#### removeFalsyValues

```ts
function removeFalsyValues<T>(
  strings: TemplateStringsArray
, ...values: T[]
): TagParameters<Exclude<T, Falsy>>
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
