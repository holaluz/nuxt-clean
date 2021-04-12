import { setupServer } from 'msw/node'

export const mockServer: typeof setupServer = (...requestHandlers) => {
  const mockServer = setupServer(...requestHandlers)
  // Enable API mocking before tests.
  beforeAll(() => mockServer.listen())
  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => mockServer.resetHandlers())
  // Disable API mocking after the tests are done.
  afterAll(() => mockServer.close())
  return mockServer
}
