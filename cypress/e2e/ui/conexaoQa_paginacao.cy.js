describe('paginação da página de QAs', () => {
    

    it('valida paginação com 7 perfis', { tags: '@smoke' }, () => {
        
        cy.intercept('GET', '/api/profile', { fixture: 'paginacao_7_usuarios' })
            .as('perfis')

        cy.visit('/perfis')

        cy.get('.paginationBttns li')
            .should('not.exist')
    })

    ;[
        { fixture: 'paginacao_8_usuarios', resultadoEsperado: ['<', '1', '2', '>'] },
        { fixture: 'paginacao_63_usuarios', resultadoEsperado: ['<', '1', '2', '3', '4', '5', '6', '7', '8', '9', '>'] },
        { fixture: 'paginacao_64_usuarios', resultadoEsperado: ['<', '1', '2', '3', '4', '5', '6', '...', '8', '9', '10', '>'] },
    ].forEach(({ fixture, resultadoEsperado }) => {

        it(`validar a ${fixture}`, () => {

            cy.intercept('GET', '/api/profile', { fixture })
                .as('perfis')
    
            cy.visit('/perfis')
    
            cy.get('.paginationBttns li')
                .each((el, i) => {
    
                    cy.wrap(el)
                        .should('have.text', resultadoEsperado[i])
                })
        })
    })
})