import { Article } from '@domain/Article'

export const state = () => ({
  loading: false,
  articles: [] as Article[],
  error: null as string | null,
})

export type RootState = ReturnType<typeof state>

export default state
