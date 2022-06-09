/// <reference types='cypress' />

describe('Time', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Going back to the past with clock()', () => {
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '09/06/2022')

        // cy.clock()
        // cy.get('#buttonNow').click()
        // cy.get('#resultado > span').should('contain', '31/12/1969')

        const instant = new Date(2012, 3, 10, 15, 23, 50)
        cy.clock(instant.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '10/04/2012')
    })

    it.only('Adding time with tick()', () => {
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span')
            .invoke('text')
            .then(parseInt)
            .should('gt', 1654814146761)
        
        cy.clock()
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span')
            .invoke('text')
            .then(parseInt)
            .should('lte', 0)

        // cy.wait(1000)

        cy.tick(1000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span')
            .invoke('text')
            .then(parseInt)
            .should('gte', 1000)
        
        cy.tick(5000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span')
            .invoke('text')
            .then(parseInt)
            .should('gte', 6000)
    })
})