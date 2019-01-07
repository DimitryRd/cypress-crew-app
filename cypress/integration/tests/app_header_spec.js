describe('App header', () => {
    beforeEach(() => {
        cy.visit('localhost:3000')
    });

    it('should have proper url', function () {
        cy.url().should('contain', 'http://localhost:3000/')
    });

    it('should contain logo', function () {
        cy.get('.App-logo')
            .should('have.attr', 'src')
            .and('have.string', '/static/media/logo.10147893.png', 'Wrong logo is used');
    });

    it('should have correct App Title ', function () {
        cy.get('.App-title').contains('OpenOceanStudio: Crew Applications')
    });
});


