/// <reference types='cypress' />

describe('Should test at a functional level', () => {
    let authorization;

    before(() => {
        cy.getToken('umemailqualquer@gmail.com', 'b!!^9@bK').then(token => {
            authorization = `JWT ${token}`
        })
    })
    
    beforeEach(() => {
        cy.resetRest(authorization)
    })

    it('Should create an account', () => {
        cy.request({
            method: 'POST',
            url: '/contas',
            headers: {
                Authorization: authorization
            },
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
        
    })

    it('Should not create an account with same name', () => {
        
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