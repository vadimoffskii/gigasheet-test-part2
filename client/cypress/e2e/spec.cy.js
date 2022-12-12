/* eslint-disable no-undef */
describe('Testing the basic logic of the application', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should render the home page', () => {
    cy.contains('h2', 'Website rank filtering')
    cy.contains('label', 'Up to 10 input domain names one per line:')
    cy.get('input').should('have.value', '')
    cy.contains('button', 'Highlight top ranking')
  })

  it('should check basic logic', () => {
    cy.get('[type="submit"]').click()
    cy.get('input:invalid').should('have.length', 1)
    cy.get('input:invalid').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill out this field.')
    })
    cy.get('input').should('have.value', '').type('google.com lego.com noname.ua')
    cy.get('[type="submit"]').click()
    cy.contains('button', 'Highlight top ranking')

    const labels = [
      'Results:',
      'google.com',
      'lego.com',
      'No details found for noname.ua',
    ];

    cy.get('ul li').each((item, index, list) => {
      expect(list).to.have.length(4);
      expect(Cypress.$(item).text()).to.eq(labels[index]);
      expect(Cypress.$(list[1])).to.have.class('highlight');
      expect(Cypress.$(list[3])).to.have.class('error');
    })
  })
})