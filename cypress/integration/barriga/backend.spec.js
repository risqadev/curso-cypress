/// <reference types='cypress' />

describe('Should test at a functional level', () => {
    const headers = {
        Authorization: undefined
    }

    before(() => {
        cy.getToken('umemailqualquer@gmail.com', 'b!!^9@bK').then(token => {
            headers.Authorization = `JWT ${token}`
        })
    })
    
    beforeEach(() => {
        cy.resetRest(headers.Authorization)
    })

    it('Should create an account', () => {
        cy.request({
            method: 'POST',
            url: '/contas',
            headers,
            body: {
                nome: 'Nova conta criada'
            }
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Nova conta criada')
        })
    })

    it('Should edit an account', () => {
        cy.getAccountByName(headers.Authorization, 'Conta para alterar')
            .then( ([ conta ]) => {
                cy.request({
                    method: 'PUT',
                    url: `/contas/${conta.id}`,
                    headers,
                    body: {
                        nome: 'Conta para alterada via API'
                    }
                }).as('response')
            })
        
        cy.get('@response').then(({ status, body: conta }) => {
            expect(status).to.be.equal(200)
            expect(conta.nome).to.be.equal('Conta para alterada via API')
        })
    })

    it('Should not create an account with same name', () => {
        cy.request({
            method: 'POST',
            url: '/contas',
            headers,
            body: {
                nome: 'Conta para alterar'
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(({status, body}) => {
            expect(status).to.be.equal(400)
            expect(body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
    })

    it('Should create a transaction', () => {
        const hoje = new Date()
        
        const transacao = {
            tipo: "REC",
            status: true,
            conta_id: undefined,
            descricao: "Transacao inseria via API",
            valor: 32.99,
            envolvido: "Nome do interessado",
            data_transacao: `${hoje.getDate().toString().padStart(2, '0')}/${(hoje.getMonth()+1).toString().padStart(2, '0')}/${hoje.getFullYear()}`,
            data_pagamento: `${(hoje.getDate() + 1).toString().padStart(2, '0')}/${(hoje.getMonth()+1).toString().padStart(2, '0')}/${hoje.getFullYear()}`
        }

        cy.getAccountByName(headers.Authorization, 'Conta para movimentacoes')
            .then( ([ conta ]) => {
                transacao.conta_id = conta.id
            })
        
        cy.request({
            method: 'POST',
            url: '/transacoes',
            headers,
            body: transacao
        }).as('response')
        .then(({ status, body }) => {
            expect(status).to.be.equal(201)
            console.log(body)
            expect(body.descricao).to.be.equal(transacao.descricao)
            expect(body.valor).to.be.equal(`${transacao.valor}`)
        })
    })

    it.only('Should get balance', () => {
        const contaParaBuscar = 'Conta para saldo'
        const movimentacao = 'Movimentacao 1, calculo saldo'
        const saldoAntes = '534.00'
        const saldoDepois = '4.034,00'

        let contaRecuperada = undefined

        cy.request({
            method: 'GET',
            url: '/saldo',
            headers
        })
        .then(({ status, body }) => {
            expect(status).to.be.equal(200)
            contaRecuperada = body.find(conta => conta.conta === contaParaBuscar)
            expect(contaRecuperada.saldo).to.be.equal(saldoAntes)
        }).as('preCheck')
        .then( () => {
            cy.request({
                method: 'PUT',
                url: `/contas/${contaRecuperada.conta_id}`,
                headers,
                body: {
                    visivel: true
                }
            }).as('postResponse')
        })
        
        cy.get('@postResponse').then(({ status, body: conta }) => {
            expect(status).to.be.equal(200)
            expect(conta.nome).to.be.equal('Conta para alterada via API')
        })
    })

    it('Should edit a transaction', () => {
        
    })

    it('Should delete a transaction', () => {
        
    })

    it('Should delete an account', () => {
        
    })
})