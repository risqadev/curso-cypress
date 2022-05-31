/// <reference types="cypress" />

describe('Cypress basics', () => {
    it('Should visit a page and assert title', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        // const title = cy.title()
        // console.log(title)

        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .and('contain', 'Campo')
        
        // TODO imprimir log no console
        // TODO escrever o log em um campo de texto
    })

    it.only('Should find and interact with an element', () => {
        const page = 'https://wcaquino.me/cypress/componentes.html'
        cy.visit(page)

        // cy.get('#naoexiste')
        cy.get('#buttonSimple')
            .should('have.value', 'Clique Me!')
            .click()
            .should('have.value', 'Obrigado!')

    })
})