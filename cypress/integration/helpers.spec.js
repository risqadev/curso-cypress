/// <reference types="cypress" />

describe('helpers', () => {
    // before(() => {
    //     cy.visit('https://wcaquino.me/cypress/componentes.html')
    // })

    // beforeEach(() => {
    //     cy.reload()
    // })

    it('wrap', () => {
        const obj = {
            nome: 'User',
            idade: 20
        }

        expect(obj).to.have.property('nome')
        // obj.should('have.property', 'nome')
        cy.wrap(obj).should('have.property', 'nome')


        cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.get('#formNome').then(elm => {
            // elm.type('texto para digitar')
            cy.wrap(elm).type('texto para digitar')
        })

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(10)
            }, 500)
        })

        cy.get('#buttonSimple').then(() => console.log('Encontrei o primeiro botão...'))
        cy.wrap(promise).then(num => console.log(num))
        cy.get('#buttonList').then(() => console.log('Encontrei o segundo botão...'))

        cy.wrap(1).then(() => { return 2 }).should('eq', 2) // como já dito, é possível alterar o que será passado adiante com o then
        cy.wrap(1).should(() => { return 2 }).should('eq', 2) // mas não com o should, que sempre vai passar adiante o mesmo que foi recebido
    })

    it('its...', () => {
        const obj = {
            nome: 'User',
            idade: 20,
            endereco: {
                rua: 'Rua dos Bobos',
                numero: 0
            }
        }

        cy.wrap(obj)
            .should('have.property', 'nome', 'User')
        cy.wrap(obj)
            .its('nome')
            .should('be.equal', 'User')
        cy.wrap(obj)
            .its('endereco')
            .should('have.property', 'rua', 'Rua dos Bobos')
        cy.wrap(obj)
            .its('endereco')
            .its('rua')
            .should('contain', 'Bobos')
        cy.wrap(obj)
            .its('endereco.rua')
            .should('contain', 'dos')

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.title().its('length').should('be.equal', 20)
    })

    it.only('invoke...', () => {
        const getValue = () => 1
        const soma = (a, b) => a + b

        cy.wrap( { fn: getValue } ).invoke('fn').should('eq', 1)
        cy.wrap( { fn: soma } ).invoke('fn', 2, 5).should('eq', 7)

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#formNome').invoke('val', 'Texto via invoke')

        cy.window().invoke('alert', 'Teste de chamada de alert via invoke')
        cy.window().invoke('console.log', 'Teste de chamada do concole via invoke')

        cy.get('#resultado')
            .invoke('html', '<input type="button" value="inserido com invoke">')
    })
})