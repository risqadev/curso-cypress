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
        cy.request({
            method: 'GET',
            url: '/contas',
            headers,
            qs: {
                nome: 'Conta para alterar'
            }
        }).then(({ status, body: [ conta ] }) => {
            expect(status).to.be.equal(200)
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

    it.only('Should not create an account with same name', () => {
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
        
    })

    it('Should get balance', () => {
        
    })

    it('Should edit a transaction', () => {
        
    })

    it('Should delete a transaction', () => {
        
    })

    it('Should delete an account', () => {
        
    })
})