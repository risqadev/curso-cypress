/// <reference types='cypress' />

import locators from '../../support/locators'
import fixConta from '../../fixtures/contaData.json'
import '../../support/commandsContas'
import buildEnv from '../../support/buildEnv'

describe('Should test at a functional level', () => {
    const user = {
        name: 'fake user',
        password: 'fake pswd'
    }

    after(() => {
        cy.clearLocalStorage()
    })

    before(() => {
        buildEnv()

        cy.login(user.name, user.password)
        // cy.resetApp()
    })
    
    // beforeEach(() => {
    //     cy.reload()
    // })

    it('Should create an account', () => {
        cy.intercept({
            method: 'POST',
            url: '/contas'
        }, {
            id: 3,
            nome: "Conta de teste",
            visivel: true,
            usuario_id: 3
        })

        cy.acessarMenuConta()

        cy.intercept({
            method: 'GET',
            url: '/contas'
        }, [{
            id: 1,
            nome: "Conta para alterar",
            visivel: true,
            usuario_id: 1
        }, {
            id: 2,
            nome: "Conta falsa para teste de front-end",
            visivel: true,
            usuario_id: 2
        }, {
            id: 3,
            nome: "Conta de teste",
            visivel: true,
            usuario_id: 3
        }])

        cy.inserirConta(fixConta.conta.nomeNova)
        
        cy.get(locators.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Should edit an account', () => {
        cy.intercept({
            method: 'PUT',
            url: '/contas/*'
        }, {
            id: 1,
            nome: "Conta para alterar",
            visivel: true,
            usuario_id: 1
        })

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
        cy.intercept({
            method: 'POST',
            url: '/contas'
        }, {
            statusCode: 400
        })

        cy.acessarMenuConta()
        cy.inserirConta('Conta mesmo nome')
        cy.get(locators.MESSAGE).should('contain', 'code 400')
    })

    it('Should create a transaction', () => {
        cy.intercept({
            method: 'POST',
            url: '/transacoes'
        }, {
            statusCode: 201
        })

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
        const conta = 'Carteira'
        const movimentacao = 'Movimentacao 1, calculo saldo'
        const saldoAntes = '100,00'
        const saldoDepois = '4.034,00'

        cy.intercept({
            method: 'GET',
            url: '/transacoes/*'
        }, {
            "conta": "Conta para saldo",
            "id": 1189631,
            "descricao": "Movimentacao 1, calculo saldo",
            "envolvido": "CCC",
            "observacao": null,
            "tipo": "REC",
            "data_transacao": "2022-07-15T03:00:00.000Z",
            "data_pagamento": "2022-07-15T03:00:00.000Z",
            "valor": "3500.00",
            "status": false,
            "conta_id": 1276322,
            "usuario_id": 30802,
            "transferencia_id": null,
            "parcelamento_id": null
        })

        cy.intercept({
            method: 'PUT',
            url: '/transacoes/*'
        }, {
            statusCode: 200
        })

        cy.intercept({
            method: 'GET',
            url: '/saldo'
        }, [{
            conta_id: 238,
            conta: "Carteira",
            saldo: "4034.00"
        }, {
            conta_id: 239,
            conta: "Conta falsa para teste de front-end",
            saldo: "5000.00"
        }])

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

    it.skip('Should edit a transaction', () => {
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

    it.only('Should delete a transaction', () => {
        cy.get(locators.MENU.EXTRATO).click()

        cy.intercept({
            method: 'GET',
            url: '/extrato/*'
        }, [{
            "conta": "Conta para saldo",
            "id": 1189631,
            "descricao": "Movimentacao 1, calculo saldo",
            "envolvido": "CCC",
            "observacao": null,
            "tipo": "REC",
            "data_transacao": "2022-07-15T03:00:00.000Z",
            "data_pagamento": "2022-07-15T03:00:00.000Z",
            "valor": "3500.00",
            "status": false,
            "conta_id": 1276322,
            "usuario_id": 30802,
            "transferencia_id": null,
            "parcelamento_id": null
        }])

        cy.get(locators.EXTRATO.BUSCA_MOVIMENTACAO('Movimentacao para exclusao', 'i.fa-trash-alt'))
        .click()

        cy.get(locators.MESSAGE).should('contain', 'Movimentação removida com sucesso!')
        // cy.get(locators.EXTRATO.LINHAS).should('have.length', 6)
        cy.get(locators.EXTRATO.BUSCA_MOVIMENTACAO('Movimentacao para exclusao'))
            .should('not.exist')
    })

    it.skip('Should delete an account', () => {
        cy.acessarMenuConta()
        cy.get(locators.CONTAS.BTN_REMOVER('Conta mesmo nome')).click()
        cy.get(locators.MESSAGE).should('contain', 'Conta excluída com sucesso!')
        cy.get(locators.CONTAS.BTN_ALTERAR('Conta mesmo nome'))
            .should('not.exist')
    })
})