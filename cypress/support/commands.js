import Ajv from 'ajv'
import { definitionHelper } from '../utils/schemaDefinitions'

// loga na aplicação via API
Cypress.Commands.add('login', (email, password) => {

    cy.request({
        method: 'POST',
        url: '/api/auth',
        body: {
            email,
            password
        }
    }).then(() => {

        Cypress.Cookies.defaults({
            preserve: 'jwt'
        })
    })
})

// executa teste de contrato em uma API
Cypress.Commands.add('testeContrato', (schema, resposta) => {

    // função que mostra os erros
    const getSchemaError = ajvErros => {
        return cy.wrap(
            `Campo: ${ajvErros[0]['instancePath']} é invalido. Erro: ${ajvErros[0]['message']}`
        )
    }

    // iniciar o AJV
    const ajv = new Ajv()
    const validacao = ajv.addSchema(definitionHelper).compile(schema)
    const valido = validacao(resposta)

    // verificar se o schema passou ou falhou
    if (!valido) {
        getSchemaError(validacao.errors).then(schemaError => {
            throw new Error(schemaError)
        })
    } else
        expect(valido, 'Validação de contrato').to.be.true
})

// seleciona um elemento pelo atributo data-test
Cypress.Commands.add('getElement', seletor => {
    return cy.get(`[data-test=${seletor}]`)
})