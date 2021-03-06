// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("getBooks", () => {
    cy.intercept(
        "GET",
        'https://api.itbook.store/1.0/new', 
        { fixture: 'books.json' }).as('getBooks')

    cy.visit('http://localhost:3000')
    cy.wait('@getBooks')
})

Cypress.Commands.add("getSearch", (searchTerm) => {
    cy.intercept(
        "GET",
        'https://api.itbook.store/1.0/search/*', 
        { fixture: 'foundBooks.json' }).as('getFoundBooks')
    
    cy.get("input")
        .type(searchTerm)
        .should("have.value", searchTerm)
    
    cy.get('button').contains(/search/i).click()

    cy.wait('@getFoundBooks')
})