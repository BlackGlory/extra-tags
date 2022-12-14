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

### Transformers
#### removeFalsyValues
```ts
function removeFalsyValues<T>(
  strings: TemplateStringsArray
, ...values: T[]
): TagParameters<Exclude<T, Falsy>>
```

```ts
const [strings, ...values] = removeFalsyValues`a${undefined}b${'c'}d`
// strings: ['ab', 'd']
// values: ['c']
```

#### valuesToStrings
```ts
function valuesToStrings(
  strings: TemplateStringsArray
, ...values: unknown[]
): TagParameters<string>
```

Example:
```ts
const [strings, ...values] = valuesToStrings`a${'b'}c${undefined}e`
// strings: ['a', 'c', 'e']
// values: ['b', 'undefined']
```

### valuesToJSON
```ts
function valuesToJSON(
  strings: TemplateStringsArray
, ...values: unknown[]
): TagParameters<string>
```

Example:
```ts
const [strings, ...values] = valuesToJSON`a${'b'}c${4}e${[6]}f`
// strings: ['a', 'c', 'e', 'f']
// values: ['"b"', '4', '[6]']
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

### Creators
#### map
```ts
function map<T, U>(
  fn: (value: T, index: number) => U
): (strings: TemplateStringsArray, ...values: T[]) => TagParameters<U>
```

Example:
```ts
const tag = map(double)
const [strings, ...values] = tag`a${'b'}c${'d'}e`
// strings: ['a', 'c', 'e']
// values: ['bb', 'dd']

function double(x) {
  return `${x}${x}`
}
```

#### filter
```ts
function filter<T, U extends T = T>(
  predicate: (value: T, index: number) => boolean
): (strings: TemplateStringsArray, ...values: T[]) => TagParameters<U>
```

Example:
```ts
const tag = filter(isntNumber)
const [strings, ...values] = tag`a${0}b${'c'}d`
// strings: ['ab', 'd']
// values: ['c']

function isntNumber(x) {
  return typeof x !== 'number'
}
```
