export type TagParameters<T> = [strings: TemplateStringsArray, ...values: T[]]
export type Transformer<T, U> = (strings: TemplateStringsArray, ...values: T[]) => TagParameters<U>
export type Reducer<T, U> = (strings: TemplateStringsArray, ...values: T[]) => U
export type Converter<T, U> = (value: T) => U
