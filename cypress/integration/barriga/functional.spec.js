/// <reference types='cypress' />

import locators from "../../support/locators"
import fixtureConta from "../../fixtures/contaData.json"
import '../../support/commandsContas'

describe('Should test at a functional level', () => {
    before(() => {
        cy.login('umemailqualquer@gmail.com', 'b!!^9@bK')
        cy.resetApp()
    })
    
    // beforeEach(() => {
    //     cy.reload()
    // })

    it('Should create an account', () => {
        cy.acessarMenuConta()
        cy.inserirConta(fixtureConta.contaNova.nome)
        
        cy.get(locators.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Should edit an account', () => {
        // cy.acessarMenuConta()
        cy.get(locators.CONTAS.BTN_ALTERAR(fixtureConta.contaNova.nome))
            .click()
        cy.get(locators.CONTAS.NOME)
            .clear()
            .type(fixtureConta.contaAlterada.nome)
        cy.get(locators.CONTAS.BTN_SALVAR).click()
        cy.get(locators.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })

    it('Should not create an account with same name', () => {
        // cy.acessarMenuConta()
        cy.inserirConta(fixtureConta.contaAlterada.nome)
        cy.get(locators.MESSAGE).should('contain', 'code 400')
    })

    it('Should create a transaction', () => {
        cy.get(locators.MENU.MOVIMENTACAO).click()
        cy.get(locators.MOVIMENTACAO.DESCRICAO).type(fixtureConta.movimentacao.descricao)
        cy.get(locators.MOVIMENTACAO.VALOR).type(fixtureConta.movimentacao.valor)
        cy.get(locators.MOVIMENTACAO.INTERESSADO).type(fixtureConta.movimentacao.interessado)
        cy.get(locators.MOVIMENTACAO.BTN_SALVAR).click()

        cy.get(locators.EXTRATO.LINHAS).should('have.length', 7)
        cy.get(locators.EXTRATO.BUSCA_MOVIMENTACAO(fixtureConta.movimentacao.descricao, fixtureConta.movimentacao.valor))
            .should('exist')
    })

    it('Should edit a transaction', () => {
        // cy.get(locators.MENU.EXTRATO).click()
        cy.get(locators.EXTRATO.BUSCA_MOVIMENTACAO(fixtureConta.movimentacao.descricao, fixtureConta.movimentacao.valor, 'i.fa-edit'))
            .click()
        cy.get(`${locators.MOVIMENTACAO.DESCRICAO}[value="${fixtureConta.movimentacao.descricao}"]`)
            .clear()
            .type(fixtureConta.movimentacao.descricaoAlteracao)
        cy.get(`${locators.MOVIMENTACAO.VALOR}[value="${fixtureConta.movimentacao.valor}"]`)
            .clear()
            .type(fixtureConta.movimentacao.valorAlteracao)
        cy.get(locators.MOVIMENTACAO.BTN_SALVAR).click()

        cy.get(locators.EXTRATO.LINHAS).should('have.length', 7)
        cy.get(locators.EXTRATO.BUSCA_MOVIMENTACAO(fixtureConta.movimentacao.descricaoAlteracao, fixtureConta.movimentacao.valorAlteracao))
            .should('exist')
    })

    it('Should delete a transaction', () => {
        // cy.get(locators.MENU.EXTRATO).click()
        cy.get(locators.EXTRATO.BUSCA_MOVIMENTACAO(fixtureConta.movimentacao.descricaoAlteracao, fixtureConta.movimentacao.valorAlteracao, 'i.fa-trash-alt'))
            .click()
        cy.get(locators.MESSAGE).should('contain', 'Movimentação removida com sucesso!')
        cy.get(locators.EXTRATO.LINHAS).should('have.length', 6)
        cy.get(locators.EXTRATO.BUSCA_MOVIMENTACAO(fixtureConta.movimentacao.descricaoAlteracao, fixtureConta.movimentacao.valorAlteracao))
            .should('not.exist')
    })

    it('Should delete an account', () => {
        cy.acessarMenuConta()
        cy.get(locators.CONTAS.BTN_REMOVER(fixtureConta.contaAlterada.nome)).click()
        cy.get(locators.MESSAGE).should('contain', 'Conta excluída com sucesso!')
    })
})