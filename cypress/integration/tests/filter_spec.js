describe('Filter', function () {

    const search = (searchObj) => {

        if (searchObj.name) {
            cy.get('#name').type(searchObj.name)
        }
        if (searchObj.city) {
            cy.get('#city').type(searchObj.city);
        }
        cy.contains('Submit').click();
    };

    beforeEach(() => {
        cy.visit('localhost:3000')
    });

    it('should filtrate with valid full name', function () {

        //Verify that both fields are empty
        cy.get('#name')
            .clear()
            .should('be.empty');
        cy.get('#city')
            .clear()
            .should('be.empty');

        cy.get('#name').type('julia');

        cy.contains('Submit').click();
        cy.get('.CrewMember-container').contains('julia').should('be.visible');
        cy.get('.CrewMember-container').its('length').should('eq', 1);

        //Clear the results; Move to the end of suite
        cy.contains('Clear').click();
        cy.get('.CrewMember-container').its('length').should('greaterThan', 1);

    })

    it('should filtrate with valid partial name', function () {

        const searchRequest = {
            name: 'da'
        };

        search(searchRequest);
        cy.get('.CrewMember-container').contains('danielle').should('be.visible');
        cy.get('.CrewMember-container').contains('linda').should('be.visible');
        cy.get('.CrewMember-container').its('length').should('eq', 2);

    });

    it('should filtrate with valid full city', function () {

        const searchRequest = {
            city: 'hereford'
        };

        search(searchRequest);
        cy.get('.CrewMember-container').contains('hereford').should('be.visible');
        cy.get('.CrewMember-container').its('length').should('eq', 1);
    });

    it('should filtrate with valid partial city', function () {

        const searchRequest = {
            city: 'ff'
        };

        search(searchRequest);
        cy.get('.CrewMember-container').contains('cardiff').should('be.visible');
        cy.get('.CrewMember-container').contains('sheffield').should('be.visible');
        cy.get('.CrewMember-container').its('length').should('eq', 2);
    });

    it('should filtrate with partial name and city', function () {

        const searchRequest = {
            name: 'da',
            city: 'ff'
        };

        search(searchRequest);
        cy.get('.CrewMember-container').contains('cardiff').should('be.visible');
        cy.get('.CrewMember-container').its('length').should('eq', 1);
    });

    //Negative tests
    it('shouldn\'t filtrate with invalid name', function () {

        const searchRequest = {
            name: 'xxx'
        };

        search(searchRequest);
        cy.get('.CrewMember-container').should('not.exist');

    });

    it('shouldn\'t filtrate with invalid city', function () {

        const searchRequest = {
            city: 'xxx'
        };

        search(searchRequest);
        cy.get('.CrewMember-container').should('not.exist');
    });

    it('shouldn\'t filtrate with valid name and invalid city', function () {

        const searchRequest = {
            name: 'gonzalez',
            city: 'xxx'
        };

        search(searchRequest);
        cy.get('.CrewMember-container').should('not.exist');
    });

    it('shouldn\'t filtrate with invalid name and valid city', function () {

        const searchRequest = {
            name: 'xxx',
            city: 'sheffield'
        };

        search(searchRequest);
        cy.get('.CrewMember-container').should('not.exist');
    });

    it('shouldn\'t filtrate with empty fields', function () {

        cy.get('#name')
            .clear()
            .should('be.empty');
        cy.get('#city')
            .clear()
            .should('be.empty');

        cy.get('.CrewMember-container').its('length').should('eq', 5);
    });
});