const fs = require('fs')

describe('Testes do cypress.config.js', () => {
    

    it('conta o total de arquivos da pasta API', () => {
        
        cy.task('lerPasta', 'cypress/e2e/api')
            .then(totalArquivos => {
                expect(totalArquivos).to.eq(2)
            })
    })

    // erro porque o browser não consegue executar FS
    it.skip('conta o total de arquivos da pasta UI', () => {
        cy.log(fs.readdirSync('cypress/e2e/ui').length)
    })

    it.only('valida a conexão com o mongo', () => {
        cy.task('conectarMongo')

        // .then(resultadoDaQuery => {
        //     expect(resultadoDaQuery[0].name).to.eq('Pedro')
        // })
        console.log('teste de log no browser')
    })
})