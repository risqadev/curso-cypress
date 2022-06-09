/// <reference types='cypress' />

describe('Fixtures tests', () => {    
    it('Get data from fixture file', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.fixture('userData').then((usuario) => {
            cy.get('#formNome').type(usuario.nome)
            cy.get('#formSobrenome').type(usuario.sobrenome)
            cy.get(`input[name=formSexo][value=${usuario.sexo}]`).click()
            cy.get(`input[name=formComidaFavorita][value=${usuario.comida}]`).click()
            cy.get('#formEscolaridade').select(usuario.escolaridade)
            cy.get('#formEsportes').select(usuario.esportes)
            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('have.text', 'Cadastrado!')
        })
    })
})