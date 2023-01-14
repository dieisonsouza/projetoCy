describe('página de login', () => {
    
    beforeEach(() => {
        cy.visit('/login')
    })

    it('faz o login válido', () => {

        cy.intercept('GET', '/api/profile/me')
            .as('apiLogin')

        // preenche o email
        cy.getElement('login-email')
            .type(Cypress.env('email'), { log: false, delay: 50 })

        // preenche a senha
        cy.getElement('login-password')
            .type(Cypress.env('password'))

        // clicar no login
        cy.getElement('login-submit')
            .click()
            .wait('@apiLogin')
            .then(({ response }) => {
                expect(response.body.company).to.eq('Iterasys')
            })

        // valida se o usuário está logado
        cy.getElement('dashboard-welcome')
            .should('contain', 'Iterasys')
    })
})