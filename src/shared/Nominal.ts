/**
 * Create an opaque type, which hides its internal details from the public, and can only be created
 * by being used explicitly. The generic type parameter can be anything. It doesn't have to be an object.
 */
export type Nominal<Type, Token = unknown> = Type & {
  readonly __type__: Token
}
