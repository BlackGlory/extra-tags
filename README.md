# extra-tags
## Install
```sh
npm install --save extra-tags
# or
yarn add extra-tags
```

## API
### Tags
#### concat
```ts
function concat(strings: TemplateStringsArray, ...values: unknown[]): string
```

Example:
```ts
concat`a${'b'}c${undefined}e`
// 'abcundefinede'
```

#### dedent
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

#### oneline
```ts
function oneline(strings: TemplateStringsArray, ...values: unknown[]): string
```

Example:
```ts
oneline`
  hello
  world
`
// 'hello world'
```

#### javascript
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

### Operators
#### map
```ts
function map<T, U>(
  fn: (value: T, index: number) => U
, strings: TemplateStringsArray
, ...values: T[]
): [strings: TemplateStringsArray, ...values: U[]]
```

#### filter
```ts
function filter<T, U extends T = T>(
  predicate: (value: T, index: number) => boolean
, strings: TemplateStringsArray
, ...values: T[]
): [strings: TemplateStringsArray, ...values: U[]]
```

#### indentMultilineValues
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
