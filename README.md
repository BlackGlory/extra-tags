# extra-tags
## Install
```sh
npm install --save extra-tags
# or
yarn add extra-tags
```

## API
```ts
type Reducer<T, U> = (strings: TemplateStringsArray, ...values: T[]) => U

type TagParameters<T> = [strings: TemplateStringsArray, ...values: T[]]
type Transformer<T, U> = (strings: TemplateStringsArray, ...values: T[]) => TagParameters<U>
```

### Reducers
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

### Converters
#### removeExtraIndents
```ts
function removeExtraIndents(
  text: string
, options?: { ignoreBlankLines: boolean = false }
): string
```

Example:
```ts
removeExtraIndents(`
  hello

  world
`, { ignoreBlankLines: true })
//   '\n'
// + 'hello' + '\n'
// + '\n'
// + 'world' + '\n'
```

#### removeBlankLines
```ts
function removeBlankLines(text: string): string
```

Example:
```ts
removeBlankLines(
  '\n'
+ 'hello' + '\n'
+ '\n'
+ 'world' + '\n'
+ '\n'
)

//   'hello' + '\n'
// + 'world'
```

#### removeMultilineHeader
```ts
function removeMultilineHeader(text: string): string
```

Example:
```ts
removeMultilineHeader(
  '  ' + '\n'
+ 'a' + '\n'
+ '  '
)
//   'a' + '\n'
// + '  '
```

#### removeMultilineFooter
```ts
function removeMultilineFooter(text: string): string
```

Example:
```ts
removeMultilineFooter(
  '  ' + '\n'
+ 'a' + '\n'
+ '  '
)
//   '  ' + '\n'
// + 'a'
```

### Operators
#### map
```ts
function map<T, U>(
  fn: (value: T, index: number) => U
, strings: TemplateStringsArray
, ...values: T[]
): TagParameters<U>
```

#### filter
```ts
function filter<T, U extends T = T>(
  predicate: (value: T, index: number) => boolean
, strings: TemplateStringsArray
, ...values: T[]
): TagParameters<U>
```

#### indentMultilineValues
```ts
function indentMultilineValues(
  strings: TemplateStringsArray
, ...values: string[]
): TagParameters<string>
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
