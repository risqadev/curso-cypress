/// <reference types='cypress' />

describe('work with alerts', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html', {
            onBeforeLoad: win => {
                cy.stub(win, 'open').as('popup')
            }
        })
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

    it.only('alert with stub', () => {
        const stub = cy.stub().as('alerta')

        cy.on('window:alert', stub)

        cy.get('#alert')
            .click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
            })

        cy.get('@alerta').should('have.been.calledOnce')
    })
})