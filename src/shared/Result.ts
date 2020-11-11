/* eslint-disable handle-callback-err */
/* eslint-disable no-useless-constructor */

// eslint-disable-next-line no-use-before-define
export type Result<T, E> = Ok<T, E> | Err<T, E>

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export const ok = <T, E>(value: T): Ok<T, E> => new Ok(value)

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export const err = <T, E>(err: E): Err<T, E> => new Err(err)

export class Ok<T, E> {
  constructor(readonly value: T) {}

  isOk(): this is Ok<T, E> {
    return true
  }

  isErr(): this is Err<T, E> {
    return false
  }

  map<A>(f: (t: T) => A): Result<A, E> {
    return ok(f(this.value))
  }

  mapErr<U>(_f: (e: E) => U): Result<T, U> {
    return ok(this.value)
  }

  /**
   * Match is like chaining map and mapErr, with the distinction that with
   * match both functions must have the same return type, and that it forces
   * handling of error.
   */
  match<A>(ok: (t: T) => A, _err: (e: E) => A): A {
    return ok(this.value)
  }

  // What additional helpers can we add here?
}

export class Err<T, E> {
  constructor(readonly error: E) {}

  isOk(): this is Ok<T, E> {
    return false
  }

  isErr(): this is Err<T, E> {
    return true
  }

  map<A>(_f: (t: T) => A): Result<A, E> {
    return err(this.error)
  }

  mapErr<U>(f: (e: E) => U): Result<T, U> {
    return err(f(this.error))
  }

  /**
   * Match is like chaining map and mapErr, with the distinction that with
   * match both functions must have the same return type, and that it forces
   * handling of error.
   */
  match<A>(_ok: (t: T) => A, err: (e: E) => A): A {
    return err(this.error)
  }
}
