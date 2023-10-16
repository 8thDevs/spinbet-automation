# spinbet-automation

Create test cases and automation scripts for Registration and Casino Lobby Search Validations

The test cases were written in Gherkin Syntax to provide readability to the users on what to test in each scenario. 

It is both composed of happy and rainy scenarios.

For the automation scripts, we used Cypress Cucumber to optimize and reuse scripts written in Cypress.

How to run the automation scripts:

* Run _npx cypress open_ -> This will open the Cypress GUI
* We select the type of testing and browser for running the tests (E2E Testing only)
* We can see _cy.js_ and _feature_ files
* The _feature_ files are the only ones we should be running

