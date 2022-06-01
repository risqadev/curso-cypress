/// <reference types="cypress" />

describe('Work with basic elements', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Text', () => {
        
        cy.get('body')
            .should('contain', 'Cuidado')
        
        cy.get('span')
            .should('contain', 'Cuidado')
        
        cy.get('.facilAchar')
            .should('contain', 'Cuidado')
            .should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    })

    it('Links', () => {
        cy.get('a[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
        
        cy.reload()

        cy.get('#resultado').should('have.not.text', 'Voltou!')

        // cy.get('a[href="#"]').click()
        cy.contains('Voltar').click()   // outra forma de pegar

        cy.get('#resultado').should('have.text', 'Voltou!')
        
    })

    it('TextFields', () => {
        cy.get('#formNome').type('Cypress Test')
        cy.get('#formNome').should('have.value', 'Cypress Test')

        cy.get('#elementosForm\\:sugestoes')
            .type('Text area')
            .should('have.value', 'Text area')
        
        cy.get('[data-cy="dataSobrenome"]')
            .type('Teste12345{backspace}{backspace}')
            .should('have.value', 'Teste123')
        
        cy.get('#elementosForm\\:sugestoes')
            .clear()
            .type('Erro{selectall}acerto'/* , { delay: 100 } */)
            .should('have.value', 'acerto')    
        })
        
        it('Radio buttons', () => {
            cy.get('[name="formSexo"]')
                .should('have.length', 2)
            
            cy.get('#formSexoFem')
                .click()
                .should('be.checked')

            cy.get('#formSexoMasc')
                .should('not.be.checked')
        })

        it('Checkbox', () => {
            cy.get('#formComidaPizza')
                .click()
                .should('be.checked')
            
            cy.get('[name="formComidaFavorita"]')
                .click({ multiple: true })
            
            cy.get('#formComidaPizza')
                .should('not.be.checked')
            
            cy.get('#formComidaVegetariana')
                .should('be.checked')
        })

        it('Combo box', () => {
            cy.get('[data-test=dataEscolaridade]')
                .select('2o grau completo')
                .should('have.value', '2graucomp')

            cy.get('[data-test=dataEscolaridade]')
                .select('1graucomp')
                .should('have.value', '1graucomp')
            
            //TODO validar opções do combo
        })

        it.only('Multi combo', () => {
            cy.get('[data-testid="dataEsportes"]')
                .select(['natacao', 'Corrida'])
            
            //TODO validar opções selecionadas do combo multiplo
        })
})