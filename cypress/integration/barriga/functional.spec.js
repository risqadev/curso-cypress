/// <reference types='cypress' />

import locators from '../../support/locators'
import fixConta from '../../fixtures/contaData.json'
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
        cy.inserirConta(fixConta.conta.nomeNova)
        
        cy.get(locators.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Should edit an account', () => {
        cy.acessarMenuConta()
        cy.get(locators.CONTAS.BTN_ALTERAR('Conta para alterar'))
            .click()
        cy.get(locators.CONTAS.NOME)
            .clear()
            .type(fixConta.conta.nomeAlterada)
        cy.get(locators.CONTAS.BTN_SALVAR).click()
        cy.get(locators.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })

    it('Should not create an account with same name', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta mesmo nome')
        cy.get(locators.MESSAGE).should('contain', 'code 400')
    })

    it('Should create a transaction', () => {
        cy.get(locators.MENU.MOVIMENTACAO).click()
        cy.get(locators.MOVIMENTACAO.DESCRICAO).type(fixConta.movimentacao.descricao)
        cy.get(locators.MOVIMENTACAO.VALOR).type(fixConta.movimentacao.valor)
        cy.get(locators.MOVIMENTACAO.INTERESSADO).type(fixConta.movimentacao.interessado)
        cy.get(locators.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
        cy.get(locators.MOVIMENTACAO.STATUS).click()
        cy.get(locators.MOVIMENTACAO.BTN_SALVAR).click()

        // cy.get(locators.EXTRATO.LINHAS).should('have.length', 7)
        cy.get(locators.EXTRATO.BUSCA_MOVIMENTACAO(fixConta.movimentacao.descricao, 
                `small:contains('${fixConta.movimentacao.valor.replace('.', ',')}')`))
            .should('exist')
    })

    it('Should get balance', () => {
        const conta = 'Conta para saldo'
        const movimentacao = 'Movimentacao 1, calculo saldo'
        const saldoAntes = '534,00'
        const saldoDepois = '4.034,00'

        cy.consultarSaldo(conta, saldoAntes)
        cy.get(locators.MENU.EXTRATO)
            .click()
        cy.get(locators.EXTRATO.BUSCA_MOVIMENTACAO(movimentacao, 'i.fa-edit'))
            .click()
        cy.get(`${locators.MOVIMENTACAO.DESCRICAO}[value="${movimentacao}"]`)
        cy.get(locators.MOVIMENTACAO.STATUS)
            .click()
        cy.get(locators.MOVIMENTACAO.BTN_SALVAR)
            .click()
        cy.get(locators.MESSAGE)
            .should('contain', 'Movimentação alterada com sucesso!')
        cy.consultarSaldo(conta, saldoDepois)
    })

    it('Should edit a transaction', () => {
        cy.get(locators.MENU.EXTRATO).click()
        cy.get(locators.EXTRATO.BUSCA_MOVIMENTACAO('Movimentacao de conta', 'i.fa-edit'))
            .click()
        cy.get(`${locators.MOVIMENTACAO.DESCRICAO}[value='Movimentacao de conta']`)
            .clear()
            .type(fixConta.movimentacao.descricaoAlteracao)
        cy.get(`${locators.MOVIMENTACAO.VALOR}[value='1500']`)
            .clear()
            .type(fixConta.movimentacao.valorAlteracao)
        cy.get(locators.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(locators.MESSAGE).should('contain', 'Movimentação alterada com sucesso!')
        cy.get(locators.EXTRATO.BUSCA_MOVIMENTACAO(fixConta.movimentacao.descricaoAlteracao, 
                `small:contains('${fixConta.movimentacao.valorAlteracao.replace('.', ',')}')`))
            .should('exist')
    })

    it('Should delete a transaction', () => {
        cy.get(locators.MENU.EXTRATO).click()
        cy.get(locators.EXTRATO.BUSCA_MOVIMENTACAO('Movimentacao para exclusao', 'i.fa-trash-alt'))
            .click()
        cy.get(locators.MESSAGE).should('contain', 'Movimentação removida com sucesso!')
        // cy.get(locators.EXTRATO.LINHAS).should('have.length', 6)
        cy.get(locators.EXTRATO.BUSCA_MOVIMENTACAO('Movimentacao para exclusao'))
            .should('not.exist')
    })

    it('Should delete an account', () => {
        cy.acessarMenuConta()
        cy.get(locators.CONTAS.BTN_REMOVER('Conta mesmo nome')).click()
        cy.get(locators.MESSAGE).should('contain', 'Conta excluída com sucesso!')
        cy.get(locators.CONTAS.BTN_ALTERAR('Conta mesmo nome'))
            .should('not.exist')
    })
})