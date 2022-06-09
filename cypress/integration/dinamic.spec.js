/// <reference types='cypress' />

describe('Dinamic tests', () => {
    const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']
    let user

    before(() => {
        cy.fixture('userData').then(data => {
            user = {...data}
        })
    })

    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    foods.forEach(food => {
        it(`Preenche form com comida ${food}`, () => {
            cy.get('#formNome').type(user.nome)
            cy.get('#formSobrenome').type(user.sobrenome)
            cy.get(`input[name=formSexo][value=${user.sexo}]`).click()
            cy.xpath(`//label[contains(., "${food}")]`).click()
            cy.get('#formEscolaridade').select(user.escolaridade)
            cy.get('#formEsportes').select(user.esportes)
            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('have.text', 'Cadastrado!')
        })
    })
})