Cypress.Commands.add('validateError', (message) => {
    cy.get(`p[class^="StyledFormHelp"]`).parent().contains(message)
})