import { tests } from '../fixtures/tests.json'

describe('Tests Input Fields', () => {
    beforeEach(() => {
        cy.visit('/mortgage-calculator/')
    })
    describe('Tests Home Price Field', () => {
        tests.home_price.forEach((test) => {
            it(`Tests the home price field with ${test.title}`, () => {
                if(test.value) {
                    cy.get('input[id="homePrice"]').clear().type(test.value)
                } else {
                    // If no home value attempt to update rate with no value
                    cy.get('input[id="homePrice"]').clear()
                }
                // Re-executing calculations this way instead of enter, because of the bug highlighted in the other test
                cy.contains('Home price').click()
                if(test.error_message) {
                    cy.validateError(test.error_message)
                } else {
                    // Validate acceptable values do not trigger error state on input field
                    cy.get('input[id="homePrice"]').should('have.attr', 'aria-invalid', 'false')
                }
            })
        })
    })

});