/// <reference types='cypress' />

describe('work with alerts', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    // beforeEach(() => {
    //     cy.reload()
    // })

    it('alert', () => {
        cy.get('#alert')
            .click()
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Alert Simples')
        })
    })
})