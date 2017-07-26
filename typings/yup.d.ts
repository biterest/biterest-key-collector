/*
 * yup.d.ts
 *
 * Biterest Key Collector
 * Copyright (c) 2018 All Rights Reserved by Biterest (https://biterest.com/)
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

declare const yup: Yup

declare module 'yup' {
  export = yup
}

interface Yup {
  reach(schema: Schema, path: string, value?: any, context?: any): Schema

  addMethod(schemaType: Schema, name: string, method: () => Schema): void

  ref(path: string, options: { contextPrefix: string }): Ref

  lazy(fn: (value: any) => Schema): Lazy

  mixed(): Schema

  string(): StringSchema

  number(): NumberSchema

  boolean(): BooleanSchema

  date(): DateSchema

  array(): ArraySchema

  object(): ObjectSchema
}

interface ValidationError {
  errors: string | string[]

  value: any

  path: string

  inner?: ValidationError[]
}

interface Ref {

}

interface Lazy {

}

interface Schema {
  clone(): Schema

  label(label: string): Schema

  meta(metadata: any): Schema

  describe(): SchemaDescription

  concat(schema: Schema): Schema

  validate(value: any, options?: ValidateOptions, callback?: () => void): Promise<any>

  isValid(value: any, options?: any, callback?: () => void): Promise<any>

  cast(value: any): any

  isType(value: any): boolean

  strict(isStrict: boolean): Schema

  strip(stripField: boolean): Schema

  withMutation(builder: (current: Schema) => void): void

  default(value: any): Schema

  default(): any

  nullable(isNullable: boolean): Schema

  required(message?: string): Schema

  typeError(message?: string): Schema

  oneOf(arrayOfValues: any[], message?: string): Schema

  equals(arrayOfValues: any[], message?: string): Schema

  notOneOf(arrayOfValues: any[], message?: string): Schema

  when(keys: string | string[], builder: any | ((value: any, schema: Schema) => Schema)): Schema

  test(name: string, message: string, test: Function, callbackStyleAsync?: boolean): Schema

  test(options: any): Schema

  transform(transformation: (currentValue: any, originalValue: any) => any): Schema
}

interface StringSchema extends Schema {
  required(message?: string): StringSchema

  min(limit: number | Ref, message?: string): StringSchema

  max(limit: number | Ref, message?: string): StringSchema

  matches(regex: RegExp, message?: string): StringSchema

  email(message?: string): StringSchema

  url(message?: string): StringSchema

  ensure(): StringSchema

  trim(message?: string): StringSchema

  lowercase(message?: string): StringSchema

  uppercase(message?: string): StringSchema
}

interface NumberSchema extends Schema {
  min(limit: number | Ref, message?: string): NumberSchema

  max(limit: number | Ref, message?: string): NumberSchema

  positive(message?: string): NumberSchema

  negative(message?: string): NumberSchema

  integer(message?: string): NumberSchema

  truncate(): NumberSchema

  round(type: 'floor' | 'ceil' | 'trunc' | 'round'): NumberSchema
}

interface BooleanSchema extends Schema {

}

interface DateSchema extends Schema {
  min(limit: Date | string | Ref, message?: string): DateSchema

  max(limit: Date | string | Ref, message?: string): DateSchema
}

interface ArraySchema extends Schema {
  of(type: Schema): ArraySchema

  required(message?: string): ArraySchema

  min(limit: number | Ref, message?: string): ArraySchema

  max(limit: number | Ref, message?: string): ArraySchema

  ensure(): ArraySchema

  compact(rejector: (value: any) => boolean): ArraySchema
}

interface ObjectSchema extends Schema {
  shape(fields: any, noSortEdges?: [string, string][]): ObjectSchema

  from(fromKey: string, toKey: string, alias: boolean): ObjectSchema

  noUnknown(onlyKnownKeys: boolean, message?: string): ObjectSchema

  camelCase(): ObjectSchema

  constantCase(): ObjectSchema
}

interface ValidateOptions {

}

interface SchemaDescription {
  type: string
  label: string
  meta: object
  tests: string[]
}
