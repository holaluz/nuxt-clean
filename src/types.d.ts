type UseCase<P, C> = {
  execute: (parameters: P, callbacks: C) => void
}

type AsyncUseCase<P, C> = {
  execute: (parameters: P, callbacks: C) => Promise<void>
}
