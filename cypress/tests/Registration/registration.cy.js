import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps"

Given('the user opens the registration modal', () => {
    cy.visit('/');
    cy.contains('Register').click({ force: true })
})

And('user click the register button', () => {
    cy.get('[data-testid="form-btn"]').click({ force: true })
})

When('required fields are empty', () => {
    cy.get('[name="username"]').should('have.value', '')
    cy.get('[data-testid="email-input"]').should('have.value', '')
    cy.get('#Password').should('have.value', '')
    cy.get('.css-gg4vpm > :nth-child(1) > input').should('have.value', '')
    cy.get('.css-gg4vpm > :nth-child(2) > input').should('have.value', '')
    cy.get('.css-gg4vpm > :nth-child(3) > input').should('have.value', '')
    cy.get('[name=termsAndConditions]').should('have.prop', 'indeterminate')
    
})

Then('error messages should display', () => {
    cy.contains('Username is required').should('be.visible')
    cy.contains('Email is required').should('be.visible')
    cy.contains('Password is required').should('be.visible')
    cy.contains('Date of birth is required').should('be.visible')
})

When('username field is not at least 6 characters long', () => {
    cy.wait(5000)
    cy.get('[name="username"]').type('Five', { force: true })
    cy.get('[data-testid="email-input"]').dblclick({ force: true })
})

When('username field is spaces only', () => {
    cy.wait(5000)
    cy.get('[name="username"]').type('      ', { force: true })
    cy.get('[data-testid="email-input"]').dblclick({ force: true })
})

When('username field is special characters only', () => {
    cy.wait(5000)
    cy.get('[name="username"]').type('@@@@@@', { force: true })
    cy.get('[data-testid="email-input"]').dblclick({ force: true })
})

Then('error message for username field should display for {string} issue', (issue) => {
    if (issue === "not at least 6 characters")
        cy.contains('Your username must be at least 6 characters long.').should('be.visible')
    if (issue === "with spaces" || issue === "with special characters")
        cy.contains('Username can only contain alphanumeric char without spaces.').should('be.visible')
})

When('email field has {string} as the incorrect format', (email) => {
    cy.get('[data-testid="email-input"]').type(email, { force: true })
    cy.get('#Password').dblclick({ force: true })
})

Then('error message for email field should display', () => {
    cy.contains('Email format incorrect.').should('be.visible')
})

When('password is not at least 6 characters', () => {
    cy.get('#Password').type('test', { force: true })
    cy.get('[data-testid="email-input"]').dblclick({ force: true })
})

Then('error message for password field should display', () => {
    cy.contains('Password should be at least 6 characters.').should('be.visible')
})

When('date has {string}, {string} and {string} not completely filled', (month, day, year) => {
    if (day) {
        cy.get('.css-gg4vpm > :nth-child(1) > input').type(day, { force: true }) 
    }

    if (month) {
        cy.get('.css-gg4vpm > :nth-child(2) > input').type(month, { force: true }) 
    }

    if (year) {
        cy.get('.css-gg4vpm > :nth-child(3) > input').type(year, { force: true }) 
    }
    cy.get('#Password').dblclick({ force: true })
})

Then('error message for date field should display based on the {string}, {string}, and {string} values', (month, day, year) => {
    if ((!day && !month && year) || (month && year && !day) || (day > 31 && day)) 
        cy.contains('Invalid day. Day should be between 1 and 31.').should('be.visible')
    else if ((day && year && !month) || (month > 12 && month))
        cy.contains('Invalid month. Month should be between 1 and 12.').should('be.visible')
    else if ((year < 1900 && year)) 
        cy.contains('Invalid year. Year should be 1900 or later.').should('be.visible')
    else 
     cy.contains('Invalid numeric values for year, month, or day.').should('be.visible')
})

When('all required fields were completely filled', () => {
    cy.get('[name="username"]').type('sampleuser', { force: true})
    cy.get('[data-testid="email-input"]').type('sample@gmail.com', { force: true})
    cy.get('#Password').type('password', { force: true })
    cy.get('.css-gg4vpm > :nth-child(1) > input').type('26', { force: true })
    cy.get('.css-gg4vpm > :nth-child(2) > input').type('12', { force: true })
    cy.get('.css-gg4vpm > :nth-child(3) > input').type('1994', { force: true })
    cy.get('[name=termsAndConditions]').click({ force: true })
})

Then('a Captcha test should display after click the Register button', () => {
    cy.intercept('POST', 'https://hcaptcha.com/getcaptcha/3dc816bb-0e73-42fb-b980-6753e477e269').as('captcha')
        cy.get('[data-testid="form-btn"]').click({ force: true })
    cy.wait('@captcha')
})