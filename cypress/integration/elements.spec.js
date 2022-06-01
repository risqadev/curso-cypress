/// <reference types="cypress" />

describe('Work with basic elements', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Text', () => {
        
        cy.get('body')
            .should('contain', 'Cuidado')
        
        cy.get('span')
            .should('contain', 'Cuidado')
        
        cy.get('.facilAchar')
            .should('contain', 'Cuidado')
            .should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    })

    it('Links', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.get('a[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
        
        cy.reload()

        cy.get('#resultado').should('have.not.text', 'Voltou!')

        // cy.get('a[href="#"]').click()
        cy.contains('Voltar').click()   // outra forma de pegar

        cy.get('#resultado').should('have.text', 'Voltou!')
        
    })
})