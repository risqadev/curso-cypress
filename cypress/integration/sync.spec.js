/// <reference types="cypress" />

describe('Esperas...', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Aguardar o elemento ficar disponível', () => {
        cy.get('#novoCampo')
            .should('not.exist')
        cy.get('#buttonDelay')
            .click()
        cy.get('#novoCampo')
            .should('not.exist')
        cy.get('#novoCampo')
            // .should('not.exist') // falha pois o retorno do should nesse caso é null, impossibilitando o encadeamento seguinte (Yelds)
            .should('exist')
            .type('funciona')
    })
})