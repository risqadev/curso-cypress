/// <reference types="cypress" />

describe('Cypress basics', () => {
    it.only('Should visit a page and assert title', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        // const title = cy.title()
        // console.log(title)

        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .and('contain', 'Campo')

        cy.title().then(title => {
            console.log(title)
        })
        cy.title().should(title => {
            console.log(title)
        })
        
        // TODO imprimir log no console
        // TODO escrever o log em um campo de texto
    })

    it('Should find and interact with an element', () => {
        const page = 'https://wcaquino.me/cypress/componentes.html'
        cy.visit(page)

        cy.pause()

        // cy.get('#naoexiste')
        cy.get('#buttonSimple')
            // .debug()
            .should('have.value', 'Clique Me!')
            .click()
            .should('have.value', 'Obrigado!')

    })
})