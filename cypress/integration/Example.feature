Feature: Example
  I want to interact with the app

  Background:
    Given I open the application

  Scenario: Article list
    Then I see a a list of articles

  Scenario: Submit form
    When I submit form
    Then a new article is created
