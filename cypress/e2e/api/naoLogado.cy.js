describe('API - Profile', () => {

    let urlPerfis = '/api/profile'
    
    context('todos os perfis', () => {
        it('valida a API de perfis', () => {
            cy.log('Teste de texto')
            cy.request({
                method: 'GET',
                url: urlPerfis
            }).then(respostaApi => {
                expect(respostaApi.status).to.eq(200)
                expect(respostaApi.duration).to.be.lessThan(10000)
                expect(respostaApi.body[0].status).to.eq('QA Junior')
                expect(respostaApi.body[0].user.name).to.eq('dino')
                expect(respostaApi.body[0].skills[2]).to.eq('Cypress')
                expect(respostaApi.body[0].skills).to.have.lengthOf(4)
                expect(respostaApi.body[0].date).to.not.be.null
                expect(respostaApi.headers['x-powered-by']).to.eq('Express')
            }) 
        })
    })

    context('perfil específico', () => {

        let urlPerfil = '/api/profile/user'

        it('seleciona um usuário inválido', () => {
            cy.request({
                method: 'GET',
                url:`${urlPerfil}/1`,
                failOnStatusCode: false
            }).then(({ status, body }) => {
                expect(status).to.eq(404)
                expect(body.errors[0].msg).to.eq('Perfil não encontrado')
            })
        })

        it('seleciona um usuário válido', () => {
            let usuarioId = '638e46754c44ad0164056f3f'

            cy.request({
                method: 'GET',
                url: `${urlPerfil}/${usuarioId}`
            }).then(({ status, body }) => {
                expect(status).to.eq(200)
                expect(body.status).to.eq('QA Junior')
            })
        })

        it('valida um usuário buscando na base', () => {
            cy.request({
                method: 'GET',
                url: urlPerfis
            }).then(({ body }) => {

                cy.request({
                    method: 'GET',
                    url: `${urlPerfil}/${body[0].user._id}`
                }).then(({ status, body }) => {
                    expect(status).to.eq(200)
                    expect(body.user._id).to.eq('638e46754c44ad0164056f3f')
                })
            })
        })
    })
})