const user = {
    name: 'fake user',
    password: 'fake pswd'
}

const buildEnv = () => {
    cy.intercept({
        method: 'POST',
        url: '/signin'
    }, {
        id: 345,
        nome: user.name,
        token: 'fake token'
    })

    cy.intercept({
        method: 'GET',
        url: '/saldo'
    }, [{
        conta_id: 238,
        conta: "Carteira",
        saldo: "100.00"
    }, {
        conta_id: 239,
        conta: "Conta falsa para teste de front-end",
        saldo: "5000.00"
    }])

    cy.intercept({
        method: 'GET',
        url: '/contas'
    }, [{
        id: 1,
        nome: "Conta para alterar",
        visivel: true,
        usuario_id: 1
    }, {
        id: 2,
        nome: "Conta para movimentacoes",
        visivel: true,
        usuario_id: 2
    }])

    cy.intercept({
        method: 'GET',
        url: '/extrato/*'
    }, { fixture: 'transactions' })

    cy.intercept({
        method: 'DELETE',
        url: '/transacoes/*'
    }, {
        statusCode: 204
    })
}

export default buildEnv;