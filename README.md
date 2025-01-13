# Zillow_Mortgage_Calc
Cypress tests for Zillow Mortgage Calculator

# Installation/Setup/First Run
To set up Cypress for the first time: 

- `npm install cypress --save-dev` will install the latest version of Cypress
- Alternatively, `npm install` will install dependencies from the `package.json` file

Once installed, run `npx cypress open` to open the sandbox and finish any initial configuration.

# Test Direction

`input.cy.js` was designed to be a data-driven, json sourced test set that covers error validation of input fields. 

This test set cycles through happy path and common errors on the Down Payment, Home Price and Interest Rate fields.

The test set driven through json, and then parametrized through a `forEach` test allows for quick addition and scaling of new tests. 

A validator function was added to the general `commands.js` file which accepts an error message passed through the json, and verifies it's presence when conditions are met.

# Running Tests

To run tests via CLI: 

```
npx cypress run
```

To run a specific spec file via CLI:

```
npx cypress run --spec "cypress/e2e/my-spec.cy.js"
```
