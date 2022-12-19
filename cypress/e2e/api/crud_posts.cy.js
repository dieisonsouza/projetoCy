describe('CRUD - Posts', () => {
    
    before(() => {

        cy.request({
            method: 'POST',
            url: '/apa/auth',
            body: {
                email: 'testeIterasys@iterasys.com',
                password: '123456'
            }
        })
    })

    it('teste', () => {
        cy.log('Teste')
    })
})