/// <reference types='cypress' />

describe('work with alerts', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    // beforeEach(() => {
    //     cy.reload()
    // })

    it.only('alert', () => {
        // cy.get('#alert')
        //     .click()
        // cy.on('window:alert', msg => {
        //     expect(msg).to.be.equal('Alert Simples')
        // })

        cy.checkAlert('#alert', 'Alert Simples')
    })

    it('alert with stub', () => {
        const stub = cy.stub().as('alerta')

        cy.on('window:alert', stub)

        cy.get('#alert')
            .click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
            })

        cy.get('@alerta').should('have.been.calledOnce')
    })

    it('Confirm', () => {
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')
        })

        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Confirmado')
        })

        cy.get('#confirm').click()
    })

    it('Deny', () => {
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')
            return false
        })

        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Negado')
        })

        cy.get('#confirm').click()
    })

    it('Prompt', () => {
        const input = 42

        cy.window().then(win => {
            cy.stub(win, 'prompt').returns(input)
        })

        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal(`Era ${input}?`)
        })

        cy.on('window:alert', msg => {
            expect(msg).to.be.equal(':D')
        })

        cy.get('#prompt').click()
    })

    it('Challenge', () => {
        const stub = cy.stub()
        cy.on('window:alert', stub)

        cy.get('#formCadastrar')
            .click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio')
            })
        
        cy.get('#formNome').type('José')

        cy.get('#formCadastrar')
            .click()
            .then(() => {
                expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio')
            })

        cy.get('[data-cy="dataSobrenome"]').type('Anchieta')

        cy.get('#formCadastrar')
            .click()
            .then(() => {
                expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio')
            })
        
        cy.get('#formSexoMasc').click()

        cy.get('#formCadastrar')
            .click()
        
        cy.get('#resultado > :nth-child(1)').should('have.text', 'Cadastrado!')
    })
})