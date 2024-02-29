// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
//support file
// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

Cypress.on('fail', (err) => {
    console.error(err)
    // const at = new Date().toISOString()
    const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(11, -1);
    err.message = localISOTime + '\n' + err.message
    throw err
})

Cypress.on('command:start', ({ attributes }) => {
    if (attributes.type === 'parent') {
        // const at = new Date().toISOString()
        const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        const localISOTime = (new Date(Date.now() - tzoffset)).toISOString()
            .slice(11, -1);
        Cypress.log({
            name: `${localISOTime} - ${attributes.name}`,
        })
    }
})
beforeEach(() => {
    cy.task('beforeTest', Cypress.currentTest.title)
})

afterEach(() => {
    cy.task('afterTest', Cypress.currentTest.title)
})

