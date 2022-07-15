// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import locators from "./locators"

Cypress.Commands.add('checkAlert', (locator, message) => {
    cy.get(locator)
        .click()
    cy.on('window:alert', msg => {
        expect(msg).to.be.equal(message)
    })
})

Cypress.Commands.add('login', (user, password) => {
    cy.visit('https://barrigareact.wcaquino.me/')
    cy.get(locators.LOGIN.USER).type(user)
    cy.get(locators.LOGIN.PASSWORD).type(password)
    cy.get(locators.LOGIN.BTN_LOGIN).click()
    cy.get(locators.MESSAGE).should('contain', 'Bem vindo, Ricardo!')
})

Cypress.Commands.add('resetApp', () => {
    cy.get(locators.MENU.SETTINGS).click()
    cy.get(locators.MENU.RESET).click()
    cy.get(locators.MESSAGE).should('contain', 'Dados resetados com sucesso!')
})

Cypress.Commands.add('getToken', (email, senha) => {
    cy.request({
        method: 'POST',
        url: '/signin',
        body: {
            email,
            senha,
            redirecionar: false
        }
    }).then(( { status, body: { token } } ) => {
        expect(status).to.be.equal(200)
        expect(token).not.to.be.empty
        Cypress.env('token', token)
        return token
    }).as('getToken')
})

Cypress.Commands.add('resetRest', () => {
    cy.request({
        method: 'GET',
        url: '/reset'
    }).as('reset')
    .its('status').should('be.equal', 200)
})

Cypress.Commands.add('getAccountByName', (name) => {
    cy.request({
        method: 'GET',
        url: '/contas',
        qs: {
            nome: name
        }
    }).then(({ status, body }) => {
        expect(status).to.be.equal(200)
        return body
    })
})

Cypress.Commands.overwrite('request', (originalFn, ...optionsArr) => {
    if( optionsArr.length === 1 &&
        typeof(optionsArr[0]) === 'object' &&
        !!Cypress.env('token'))
    {
        optionsArr[0].headers = {
            Authorization: `JWT ${Cypress.env('token')}`
        }
    }

    return originalFn(...optionsArr)
})