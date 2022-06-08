/// <reference types='cypress' />

describe('Work with iframes', () => {
    it('iframe', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.get('#frame1').then(iframe => {
            const body = iframe.contents().find('body')

            cy.wrap(body).find('#tfield')
                .type('Texto digitado')
                .should('have.value', 'Texto digitado')
        })
    })

    it('testar o iframe diretamente', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html')

        cy.on('window:alert', msg => expect(msg).to.be.equal('Click OK!'))

        cy.get('#tfield')
            .type('Texto digitado')
            .should('have.value', 'Texto digitado')
        
        cy.get('#otherButton').click()
    })
})