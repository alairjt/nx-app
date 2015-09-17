(function () {
    'use strict';

    var menuUtils = require('../../menuUtils.js'),
        prompts = [{
                    type: "input",
                    name: 'crudName',
                    message: 'CRUD name'
                }, {
                    type: "list",
                    name: "menu",
                    message: "Add to the menu",
                    choices: function () {
                        return menuUtils.getMenus();
                    }
                }, {
                    type: "list",
                    name: "tipoVisualizacao",
                    message: "Search type",
                    choices: [
                        'Simple',
                        'Grouped'
                    ],
                    default: 'Simple'
                }, {
                    when: function (response) {
                        return response.tipoVisualizacao === 'Grouped';
                    },
                    type: "input",
                    name: "campoGrupo",
                    message: "Field name that will be grouped"
                }, {
                    when: function (response) {
                        return response.tipoVisualizacao === 'Grouped';
                    },
                    type: "input",
                    name: "campoGrupoDetalhes",
                    message: "Field name of the details"
                }, {
                    when: function (response) {
                        return response.tipoVisualizacao === 'Grouped';
                    },
                    type: "input",
                    name: "campoGrupoTotal",
                    message: "Field name of totals"
                }, {
                    type: "list",
                    name: "servico",
                    message: "Service name",
                    choices: [
                        "banco",
                        "cartao",
                        "cliente",
                        "endereco",
                        "grupo",
                        "pagamentoCadastro",
                        "pagamentoOperacao",
                        "rbac",
                        "rbacPermissoes"
                    ]
                }, {
                    when: function (response) {
                        return !response.novoRecurso;
                    },
                    type: "input",
                    name: "recurso",
                    message: "Resource name"
                }];

    module.exports = {
        prompts: prompts
    };
})();