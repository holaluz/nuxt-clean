type UseCase<P, C> = {
  execute: (parameters: P, callbacks: C) => void
}
