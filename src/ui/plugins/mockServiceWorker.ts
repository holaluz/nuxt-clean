import { Plugin } from '@nuxt/types'
import { setupWorker } from 'msw'
import { ArticleServiceMock } from '../../modules/article/infrastructure/ArticleService.mock'

const mockServiceWorker: Plugin = ({ isDev }) => {
  if (isDev) {
    const worker = setupWorker(...ArticleServiceMock)
    worker.start()
  }
}

export default mockServiceWorker
