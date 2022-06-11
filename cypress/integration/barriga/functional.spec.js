/// <reference types='cypress' />

describe('Should test at a functional level', () => {
    before(() => {
        cy.visit('https://barrigareact.wcaquino.me/')
        cy.get('[data-test="email"]').type('umemailqualquer@gmail.com')
        cy.get('[data-test="passwd"]').type('b!!^9@bK')
        cy.get('.btn').click()
    })

    // beforeEach(() => {
    //     cy.reload()
    // })

    it('login', () => {
        cy.get('.toast-message').should('contain', 'Bem vindo, Ricardo!')
    })

    it('Should create an account', () => {
        cy.get('[data-test="menu-settings"]').click()
        cy.get('[href="/contas"]').click()
        cy.get('[data-test="nome"]').type('Conta de teste')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Conta inserida com sucesso!')
    })

    it.only('Should edit an account', () => {
        cy.get('[data-test="menu-settings"]').click()
        cy.get('[href="/contas"]').click()
        cy.get('table.table tr:contains("Conta de teste") i.far.fa-edit')
            .click()
        cy.get('[data-test="nome"]')
            .clear()
            .type('Conta alterada')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Conta atualizada com sucesso!')
    })
})