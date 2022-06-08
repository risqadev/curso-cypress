/// <reference types='cypress' />

describe('Work with Popup', () => {
    it('testar o popup diretamente', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html')

        cy.on('window:alert', msg => expect(msg).to.be.equal('Click OK!'))

        cy.get('#tfield')
            .type('Texto digitado')
            .should('have.value', 'Texto digitado')
        
        cy.get('#otherButton').click()
    })

    it('conferindo a execução de um popup', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.window().then(win => {
            cy.stub(win, 'open').as('winPopup')
        })

        cy.get('#buttonPopUp').click()
        // cy.get('[href="./frame.html"]').click()

        cy.get('@winPopup').should('be.calledOnce')
    })

    describe.only('with links', () => {
        beforeEach(() => {
            cy.visit('https://wcaquino.me/cypress/componentes.html')
        })

        it('check popup url', () => {
            cy.contains('Popup2')
                .should('have.prop', 'href')
                .and('equal', 'https://wcaquino.me/cypress/frame.html')
        })

        it('should access popup dinamically', () => {
            cy.contains('Popup2').then(elm => {
                const href = elm.prop('href')
                cy.visit(href)
                cy.get('#tfield').type('A simple text')
            })
        })

        it('should force link on same page', () => {
            cy.contains('Popup2')
                .invoke('removeAttr', 'target')
                .click()
            
            cy.get('#tfield').type('A simple text')
        })

        it('should change link and remove attribute', () => {
            cy.contains('Popup2')
                .invoke('attr', 'href', '#')
                .invoke('removeAttr', 'target')
                .click()
        })
    })
})