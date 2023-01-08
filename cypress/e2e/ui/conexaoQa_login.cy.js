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
                expect(response.body.errors[0].msg).to.eq('Não há perfil para este usuário')
            })

        // valida se o usuário está logado
        cy.getElement('dashboard-welcome')
            .should('contain', 'Teste Iterasys')
    })
})