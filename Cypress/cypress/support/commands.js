/// <reference types = "cypress" />

/*
***********************************************
This example commands.js shows you how to
create various custom commands and overwrite
existing commands.

For more comprehensive examples of custom
commands please read more here:
https://on.cypress.io/custom-commands
***********************************************


-- This is a parent command --
Cypress.Commands.add('login', (email, password) => { ... })


-- This is a child command --
Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })


-- This is a dual command --
Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })


-- This will overwrite an existing command --
Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
*/

Cypress.Commands.add('upgrade', () => {
    cy.get('span', { timeout: 7000 }).should('not.be.disabled').then(($a) => {
        if ($a.text().includes('Update your app')) {
            cy.contains('span', 'Update Later').click({ force: true });
        } else {
            cy.log('Update your app page not displayed');
        }
    })
})

Cypress.Commands.add('clickContinueBtn', () => {
    cy.get('[data-cy="app.components.Common.continue_btn_caps"]').click()
})

Cypress.Commands.add('clickNextBtn', () => {
    cy.get('[data-cy="app.components.Common.next_btn_caps"]').click()
})

Cypress.Commands.add('clickBack', () => {
    cy.get('[data-cy="app.components.Common.Back_btn_caps"]').click()
})

Cypress.Commands.add('clickBtn', (buttonName) => {
    cy.get('[data-cy="*"]').contains(buttonName).click()
})

Cypress.Commands.add('verifyText', (locator, expectedText) => {
    cy.get(locator).should('have.text', expectedText)
})

Cypress.Commands.add('clickPurposeOfLoanDD', (purposeOfLoan) => {
    cy.get('span', { timeout: 7000 }).should('be.visible').then(($a) => {
        if($a.text().includes('Enter the purpose for which you require this loan.')) {
            cy.get('[aria-activedescendant=react-select-2--value]')
                .click({ force: true });
            cy.get('[id=react-select-2--option-4]').click();
            cy.contains('span', 'Continue').click();
        } else {
            cy.log('select purpose of loan not displayed');
        }
    })
})

Cypress.Commands.add('viewSummaryandCharges', () => {
    cy.get('span', { timeout: 7000 }).should('be.visible').then(($a) => {
        if($a.text().includes('View Summary & charges')) {
            cy.contains('span', 'View Summary & charges').click({force:true});
        } else {
            cy.log('direclty view summary btn displayed');
        }
    })
})

Cypress.Commands.add('visitURL', (url) => {
    cy.visit(url, { failOnStatusCode: false });
    cy.upgrade()
})

Cypress.Commands.add('getIframeBody', () => {
    // get the iframe > document > body
    // and retry until the body element is not empty
    return cy
        .get('#insurance')
        .its('0.contentDocument.body').should('not.be.empty')
        .then(cy.wrap)
  })