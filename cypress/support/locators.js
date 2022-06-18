const locators = {
    LOGIN: {
        USER: '[data-test="email"]',
        PASSWORD: '[data-test="passwd"]',
        BTN_LOGIN: '.btn'
    },
    MENU: {
        HOME: '[data-test="menu-home"]',
        MOVIMENTACAO: '[data-test="menu-movimentacao"]',
        CONTAS: '[href="/contas"]',
        EXTRATO: '[data-test="menu-extrato"]',
        SETTINGS: '[data-test=menu-settings]',
        RESET: '[href="/reset"]'
    },
    HOME: {
        BUSCA_CONTA: (name, complement = '') =>
            `tbody td:contains(${name}) ${complement}`
    },
    CONTAS: {
        NOME: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        BTN_ALTERAR: nomeConta => 
            `table.table tr:contains(${nomeConta}) i.fa-edit`,
        BTN_REMOVER: nomeConta => 
            `table.table tr:contains(${nomeConta}) i.fa-trash-alt`
    },
    MOVIMENTACAO: {
        DESCRICAO: '[data-test=descricao]',
        VALOR: '[data-test=valor]',
        INTERESSADO: '[data-test=envolvido]',
        CONTA: '[data-test="conta"]',
        STATUS: '[data-test=status]',
        BTN_SALVAR: '.btn-primary'
    },
    EXTRATO: {
        LINHAS: '.list-group > li',
        BUSCA_MOVIMENTACAO: (description, complement = '') =>
            `.list-group > li:has(span:contains('${description}')) ${complement}`
    },
    MESSAGE: '.toast-message'
}

export default locators;