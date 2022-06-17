const locators = {
    LOGIN: {
        USER: '[data-test="email"]',
        PASSWORD: '[data-test="passwd"]',
        BTN_LOGIN: '.btn'
    },
    MENU: {
        MOVIMENTACAO: '[data-test="menu-movimentacao"]',
        CONTAS: '[href="/contas"]',
        EXTRATO: '[data-test="menu-extrato"]',
        SETTINGS: '[data-test=menu-settings]',
        RESET: '[href="/reset"]'
    },
    CONTAS: {
        NOME: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        BTN_ALTERAR: nomeConta => 
            `table.table tr:contains(${nomeConta}) i.far.fa-edit`,
        BTN_REMOVER: nomeConta => 
            `table.table tr:contains(${nomeConta}) i.far.fa-trash-alt`
    },
    MOVIMENTACAO: {
        DESCRICAO: '[data-test="descricao"]',
        VALOR: '[data-test="valor"]',
        INTERESSADO: '[data-test="envolvido"]',
        BTN_SALVAR: '.btn-primary'
    },
    EXTRATO: {
        LINHAS: '.list-group > li',
        BUSCA_MOVIMENTACAO: (description, value, innerElement = '') =>
            `.list-group > li:has(span:contains(${description}) ~ small:contains(${value.replace('.', ',')})) ${innerElement}`
    },
    MESSAGE: '.toast-message'
}

export default locators;