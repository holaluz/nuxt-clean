/* eslint-disable handle-callback-err */
/* eslint-disable no-useless-constructor */

// eslint-disable-next-line no-use-before-define
export type Result<T, E> = Ok<T, E> | Err<T, E>

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export const ok = <T, E>(value: T): Ok<T, E> => new Ok(value)

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export const err = <T, E>(err: E): Err<T, E> => new Err(err)

class Ok<T, E> {
  constructor(readonly value: T) {}

  isOk(): this is Ok<T, E> {
    return true
  }

  isErr(): this is Err<T, E> {
    return false
  }

  /**
   * Maps a Result<T, E> to Result<A, E> by applying a function to a contained
   * Ok value, leaving an Err value untouched.
   */
  map<A>(f: (t: T) => A): Result<A, E> {
    return ok(f(this.value))
  }

  /**
   * Maps a Result<T, E> to Result<T, U> by applying a function to a contained
   * Err value, leaving an Ok value untouched.
   */
  mapErr<U>(_f: (e: E) => U): Result<T, U> {
    return ok(this.value)
  }

  /**
   * fold() is like chaining map and mapErr, with the distinction that both
   * functions must have the same return type, and that it forces error handling.
   */
  fold<A>(ok: (t: T) => A, _err: (e: E) => A): A {
    return ok(this.value)
  }

  // What additional helpers can we add here?
}

class Err<T, E> {
  constructor(readonly error: E) {}

  isOk(): this is Ok<T, E> {
    return false
  }

  isErr(): this is Err<T, E> {
    return true
  }

  /**
   * Maps a Result<T, E> to Result<A, E> by applying a function to a contained
   * Ok value, leaving an Err value untouched.
   */
  map<A>(_f: (t: T) => A): Result<A, E> {
    return err(this.error)
  }

  /**
   * Maps a Result<T, E> to Result<T, U> by applying a function to a contained
   * Err value, leaving an Ok value untouched.
   */
  mapErr<U>(f: (e: E) => U): Result<T, U> {
    return err(f(this.error))
  }

  /**
   * fold() is like chaining map and mapErr, with the distinction that both
   * functions must have the same return type, and that it forces error handling.
   */
  fold<A>(_ok: (t: T) => A, err: (e: E) => A): A {
    return err(this.error)
  }
}
