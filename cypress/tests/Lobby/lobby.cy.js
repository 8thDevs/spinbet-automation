import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps"

let first_word_count, second_word_count
Given('the user visit the Casino lobby', () => {
    cy.visit('/casino');
})

When('searching for a game with not at least 3 characters', () => {
    cy.get('input[placeholder="Search Your Game..."]').type("a", { force: true })
})

Then('an error message should be visible', () => {
    cy.contains('Search requires at least 3 characters...').should('be.visible')
})

When('searching for a game with {string} as an existing word', (word) => {
    cy.get('input[placeholder="Search Your Game..."]').type(word, { force: true })
    cy.wait(5000)
    cy.get('.css-www3uy').click({ force: true })
})

Then('the games should be filtered with the searched word {string}', (word) => {
    cy.get('.css-udl5tf').find('h3.css-xl95bq').each(($element) => {
        expect($element.text().toLowerCase()).to.contains(word, { matchCase: false})
    })
})

When('searching for a game with {string} and {string} as existing words', (first_word, second_word) => {
    cy.get('input[placeholder="Search Your Game..."]').type(first_word, { force: true })
    cy.wait(5000)
    cy.get('.css-www3uy').click({ force: true })

    cy.get('.css-udl5tf').then(($game) => {
        first_word_count = $game.length
    })

    cy.get('input[placeholder="Search Your Game..."]').clear({ force: true })

    cy.get('input[placeholder="Search Your Game..."]').type(second_word, { force: true })
    cy.wait(5000)
    cy.get('.css-www3uy').click({ force: true })

    cy.get('.css-udl5tf').then(($game) => {
        second_word_count = $game.length
    })
})

Then('the number of games searched should be the same', () => {
    expect(first_word_count).to.equal(second_word_count)
})