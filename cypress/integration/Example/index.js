import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps'

const title = 'title title'
const slug = 'my-slug'

Given('I open the application', () => {
  cy.visit('/')
})

Then('I see a a list of articles', () => {
  cy.findByRole('heading', { level: 3, name: /Demo for getRecentArticles/i })

  cy.get('article').should('have.length', 100)
})

When('I submit form', () => {
  cy.intercept('POST', /\/posts/).as('createPost')

  cy.findByLabelText(/title/i).type(title)
  cy.findByLabelText(/slug/i).type(slug)

  cy.findByRole('button', { name: /Submit new post/i }).click()
})

Then('a new article is created', () => {
  cy.findByText(/Everything went better than expected/i)

  cy.wait('@createPost').should(({ response }) => {
    expect(response.statusCode).to.equal(201)
    expect(response.body).to.include({ title, slug })
  })
})
