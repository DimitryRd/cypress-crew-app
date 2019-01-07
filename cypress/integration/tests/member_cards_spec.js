describe('Crew Member Cards', function () {

    beforeEach(() => {
        cy.visit('localhost:3000')
    });

    it('should be in 3 columns', function () {

        cy.get('h2').contains('Applied').should('exist');
        cy.get('h2').contains('Interviewing').should('exist');
        cy.get('h2').contains('Hired').should('exist');

    });

    it('should have photo and name', function () {

        /**
         * Get all cards and check if they have proper attributes
         */
        cy.get('.CrewMember-info')
            .should('have.length', 5)
            .each(card => {
                cy.wrap(card).within(() => {
                    cy.get('div')
                        .should('have.class', 'CrewMemeber-photo')
                        .should('have.class', 'CrewMemeber-name');
                });
            })
    });

    it('should change its columns', function () {

        /**
         *Move card from Applied column to Interviewing and verify position
         */
        cy.xpath('//div[contains(text(),"lloyd gonzalez")]/following::button').first().click();
        cy.xpath('//h2[contains(text(), "Interviewing")]/ancestor::div[1]//child::*[contains(text(), "lloyd gonzalez")]')
            .should('exist');

        /**
         * Move card from Interviewing ot Hired and verify position
         */
        cy.xpath('//div[contains(text(),"lloyd gonzalez")]/following::button[@class="CrewMember-up"]').first().click();
        cy.xpath('//h2[contains(text(), "Hired")]/ancestor::div[1]//child::*[contains(text(), "lloyd gonzalez")]')
            .should('exist');

        cy.get('div >.CrewMember-info').contains('lloyd gonzalez')
            .debug()
            .parentsUntil('.CrewMember-container')
            .parent()
            .find('button')
            .click();

        cy.get('div >.CrewMember-info').contains('lloyd gonzalez')
            .parentsUntil('.App-column')
            .find('h2').contains('Interviewing').should('exist')

        cy.get('h2').contains('Interviewing')
            .parent()
            .children()
            .find('div').contains('lloyd gonzalez').should('exist');

        cy.get('div >.CrewMember-info').contains('lloyd gonzalez')
            .parentsUntil('.CrewMember-container')
            .parent()
            .find('button[type="button"]').not('.CrewMember-up')
            .click();

        cy.get('h2').contains('Interviewing')
            .parent()
            .children()
            .find('div').should('not.exist');

    });

});