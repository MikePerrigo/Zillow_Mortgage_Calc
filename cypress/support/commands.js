Cypress.Commands.add('validateError', (message) => {
    cy.get(`p[class^="StyledFormHelp"]`).parent().contains(message)
})

Cypress.Commands.add('assertValueChanges', (initialRateInfo, updatedRateInfo) => {
    expect(initialRateInfo.interest_rt).to.not.equal(updatedRateInfo.interest_rt)
    expect(initialRateInfo.estimated_monthly_payment_amt).to.not.equal(updatedRateInfo.estimated_monthly_payment_amt)
})