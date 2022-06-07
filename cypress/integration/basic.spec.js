/// <reference types="cypress" />

describe('Cypress basics', () => {
    it.only('Should visit a page and assert title', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        // const title = cy.title()
        // console.log(title)

        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .and('contain', 'Campo')


        let syncTitle

        cy.title().then(title => {
            console.log(title)
            syncTitle = title
            cy.get('#formNome').type(title)
        })
        cy.title().should(title => {
            console.log(title)
            // cy.get('#formNome').type(title)
        })

        // cy.get('[data-cy="dataSobrenome"]').type(syncTitle)
        cy.get('[data-cy="dataSobrenome"]').then(elm => {
            cy.wrap(elm).type(syncTitle)
        })
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