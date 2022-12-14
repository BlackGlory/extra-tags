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
function map<T, U>(
  fn: (value: T, index: number) => U
, strings: TemplateStringsArray
, ...values: T[]
): [strings: TemplateStringsArray, ...values: U[]]
function map<T, U>(
  fn: (value: T, index: number) => U
): (
  strings: TemplateStringsArray
  , ...values: T[]
) => [strings: TemplateStringsArray, ...values: U[]]
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

### concat
```ts
function concat(strings: TemplateStringsArray, ...values: unknown[]): string
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
function dedent(strings: TemplateStringsArray, ...values: unknown[]): string
```

Example:
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
, strings: TemplateStringsArray
, ...values: unknown[]
): string
function oneline(
  separator: string
): (strings: TemplateStringsArray, ...values: unknown[]) => string
function oneline(strings: TemplateStringsArray, ...values: unknown[]): string
```

Example:
```ts
oneline(' ')`
  hello
  world
`
// 'hello world'
```

### indentMultilineValues
```ts
function indentMultilineValues(
  strings: TemplateStringsArray
, ...values: string[]
): [strings: TemplateStringsArray, ...values: string[]]
```

Example:
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
type Value =
| string
| number
| boolean
| null
| bigint
| undefined
| ((args: any) => any)
| { [property: string]: Value }
| Value[]

function javascript(strings: TemplateStringsArray, ...values: Value[]): string
```
