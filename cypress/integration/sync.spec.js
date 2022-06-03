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

    it('find', () => {
        cy.get('#buttonList')
            .click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')
        // cy.get('#lista li')
        //     .find('span')
        //     .should('contain', 'Item 2')
        cy.get('#lista li span')
            .should('contain', 'Item 1')
        cy.get('#lista li span')
            .should('contain', 'Item 2')
    })

    it('timeout', () => {
        cy.get('#buttonDelay')
            .click()
        cy.get('#novoCampo')  // default timeout 4 s
            .should('exist')

        cy.reload()

        cy.get('#buttonDelay')
            .click()
        cy.get('#novoCampo', { timeout: 1000 })
            .should('exist')
    })

    it('wait', () => {
        cy.get('#buttonList')
            .click()
        cy.wait(5000)   // espera fixa. usar com cautela
        cy.get('#lista li span')
            .should('have.length', 2)
            .should('contain', 'Item 2')
    })

    it("click doesn't retry", () => {
        cy.get('#buttonCount')
            .click()
            .should('have.value', '111')
    })

    it.only("then vs. should", () => {
        cy.get('#buttonList')
            .click()
        cy.get('#lista li span', {timeout: 7000})
            .should('have.length', 2)
        cy.get('#lista li span')
            .then(elements => {
                // console.log(elements)
                expect(elements).have.length(2)
                return 2    // com then é possível alterar o retorno
            })
            .then(previous => {
                expect(previous).eq(2)
            })
        cy.get('#lista li span')
            .should(elements => {
                // console.log(elements)
                expect(elements).have.length(2)
                return 2    // com should não é possível alterar o retorno. O que foi recebido será passado adiante.
            })
            .then(previous => {
                expect(previous).eq(2)
            })
    })
})