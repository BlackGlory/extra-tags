# extra-tags
## Install
```sh
npm install --save extra-tags
# or
yarn add extra-tags
```

## API
### map
```ts
function map<T, U, Strings extends ReadonlyArray<string>>(
  fn: (value: T, index: number) => U
, strings: Strings
, ...values: T[]
): [strings: Strings, ...values: U[]]
function map<T, U>(
  fn: (value: T, index: number) => U
): <Strings extends ReadonlyArray<string>>(
  strings: Strings
, ...values: T[]
) => [strings: Strings, ...values: U[]]
```

### filter
```ts
function filter<T, U extends T = T>(
  predicate: (value: T, index: number) => boolean
, strings: TemplateStringsArray
, ...values: T[]
): [strings: TemplateStringsArray, ...values: U[]]
function filter<T, U extends T = T>(
  predicate: (value: T, index: number) => boolean
): (
  strings: TemplateStringsArray
, ...values: T[]
) => [strings: TemplateStringsArray, ...values: U[]]
```

### array
```ts
function array<T>(strings: TemplateStringsArray, ...values: T[]): Array<string | T>
```

```ts
array`a${1}b${2}c`
// ['a', 1, 'b', 2, 'c']
```

### fromArray
```ts
function fromArray<T>(arr: Array<string | T>): [
  strings: string[]
, ...values: T[]
]
```

```ts
fromArray(array`a${1}b${2}c`)
// [['a', 'b', 'c'], 1, 2]
```

### concat
```ts
function concat(strings: ReadonlyArray<string>, ...values: unknown[]): string
```

It is equivalent to `Array.prototype.concat` for template arguments.

```ts
// It doesn't make sense to use it as a tag function,
// because it equivalent to `a${'b'}c${'d'}e`.
concat`a${'b'}c${'d'}e`
// 'abcde'

concat(strings, ...values)
// 'abcde'
```

### dedent
```ts
function dedent(strings: ReadonlyArray<string>, ...values: unknown[]): string
```

```ts
dedent`
  hello
  world
`
//   'hello' + '\n'
// + 'world'
```

### oneline
```ts
function oneline(
  separator: string
, strings: ReadonlyArray<string>
, ...values: unknown[]
): string
function oneline(
  separator: string
): (strings: ReadonlyArray<string>, ...values: unknown[]) => string
function oneline(strings: ReadonlyArray<string>, ...values: unknown[]): string
```

```ts
oneline(' ')`
  hello
  world
`
// 'hello world'
```

### indentMultilineValues
```ts
function indentMultilineValues<Strings extends ReadonlyArray<string>>(
  strings: Strings
, ...values: string[]
): [strings: Strings, ...values: string[]]
```

```ts
const [strings, ...values] = indentMultilineValues`
  a
  ${'b\nc'}
  d
`
// strings: [
//   '\n'
// + ' '.repeat(2) + 'a' + '\n'
// , '\n'
// + ' '.repeat(2) + 'd' + '\n'
// ]
// values: [
//   'b' + '\n'
// + ' '.repeat(2) + 'c'
// ]
```

### javascript
```ts
type JavaScriptValue =
| string
| number
| boolean
| null
| bigint
| undefined
| ((args: any) => any)
| { [property: string]: JavaScriptValue }
| JavaScriptValue[]

function javascript(strings: ReadonlyArray<string>, ...values: JavaScriptValue[]): string
```

```ts
javascript`
  const text = ${'hello world'}
  console.log(text)
`
// const text = "hello world"
// console.log(text)
```
