// cypress/integration/data-validation-test.js

// Import the JSON data from the file
import jsonData from '../src/configs/testdata';

// Import the test configuration from the file
import testConfig from '../src/configs/testurl.json';

// Destructure the testUrl from the configuration
const { testUrl } = testConfig;

describe('Data Validation Test', () => {
  it('Inserts and Validates JSON Data', () => {
    // Visit the dynamic-table.html page using the stored URL
    cy.visit(testUrl);

    // Click the summary to reveal the table data
    cy.get('summary').should('contain', 'Table Data').click();

    // Select the element with the ID "jsondata" using cy.get
    cy.get('#jsondata')
      .clear() // Clear the content of the textarea
      .type(JSON.stringify(jsonData), { parseSpecialCharSequences: false })
      .blur(); // Trigger the blur event

    // Click the Refresh button
    cy.get('[id="refreshtable"]').click();

    // Wait for the content to load
    cy.wait(1000); // Adjust the time as needed

    // Fetch the inserted data from your application
    cy.get('[id="jsondata"]').then(($textarea) => {
      const text = $textarea.val(); // Retrieve the value of the textarea
      const fetchedData = JSON.parse(text);

      // Validate the inserted data
      expect(fetchedData).to.deep.equal(jsonData);
    });
  });
});