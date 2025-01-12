describe('Tests the rate field', () => {
    const inputFields = [
      'homePrice',
      'form-1_downPayment',
      'form-1_downPaymentPercent',
      'rate'
    ]
      beforeEach(() => {
        cy.visit('/mortgage-calculator/')
  
        // Validate appropriate page selection
        cy.get('#zmm-calc-payment').within(() => {
          cy.contains('Mortgage Calculator')
        })
      // Confirm page layout contains appropriate input fields
      Object.values(inputFields).forEach((input) => {
        cy.get(`input[id="${input}"]`)
        })
      })
    it('Bug/Expected Failure - Tests Updating Rate Field', () => {
  
      /***
       * This is highlighting a bug
       * Using enter causes the page to reset
       * Clicking 'somewhere else' on the page after typing causes the 
       * calculations to happen with the new value, enter SHOULD do the same
       */
      cy.get('input[id=rate]').clear()
      cy.get('input[id=rate]').type('3.0{enter}')
      cy.get('input[id=rate]').should('have.value', '3.0')
    })
      it('Tests Calculations after updating rates', () => {
        // Set the intercept to acquire the request payload conatinaing the calculator info
        cy.intercept('POST', 'https://cs.zg-api.com/click/zg_prod_web/*').as('ratesRequest')
    
        // Wait for the defined route to complete then pull the calculator info
        cy.wait('@ratesRequest').then((xhr) => {
          const initialPayload = JSON.parse(xhr.request.body)
          cy.wrap(initialPayload.financing_calculator).as('initialRateInfo')
        })
    
        // Update the rate to 3.0 and click home price to facilitate a random click because of the Enter bug
        cy.get('input[id=rate]').clear().type('3.0')
        cy.contains('Home price').click()
    
        // Wait twice indicating to use the second request (updated info)
        cy.wait('@ratesRequest').wait('@ratesRequest').then((xhr) => {
          const updatedPayload = JSON.parse(xhr.request.body)
          cy.wrap(updatedPayload.financing_calculator).as('updatedRateInfo')
        })
    
        // Retain the wrapped values
        cy.get('@initialRateInfo').then((initialInfo) => {
          cy.get('@updatedRateInfo').then((updatedInfo) => {
            cy.assertValueChanges(initialInfo, updatedInfo)
          })
        })
      })
    })