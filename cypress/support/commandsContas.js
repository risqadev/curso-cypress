import locators from "./locators";

Cypress.Commands.add('acessarMenuConta', () => {
    cy.get(locators.MENU.SETTINGS).click()
    cy.get(locators.MENU.CONTAS).click()
})

Cypress.Commands.add('inserirConta', name => {
    cy.get(locators.CONTAS.NOME).type(name)
    cy.get(locators.CONTAS.BTN_SALVAR).click()
})

Cypress.Commands.add('consultarSaldo', (conta, saldoEsperado) => {
    cy.get(locators.MENU.HOME)
        .click()
    cy.get(locators.HOME.BUSCA_CONTA(conta, '~ td'))
        .should('contain', saldoEsperado)
})