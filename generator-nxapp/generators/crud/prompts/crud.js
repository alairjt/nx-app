(function () {    
    'use strict';
    
    var utils = require('../utils.js');
    var menuUtils = require('../../menuUtils.js');
    
    var prompts = [{
                    type: "input",
                    name: 'crudName',
                    message: 'Qual o nome do CRUD?'
                }, {
                    type: "list",
                    name: "menu",
                    message: "Adicionar ao menu?",
                    choices: function () {
                        return menuUtils.getMenus();
                    }
                }, {
                    type: "list",
                    name: "tipoVisualizacao",
                    message: "Qual tipo da consulta?",
                    choices: [
                        'Simples',
                        'Agrupada'
                    ],
                    default: 'Simples'
                }, {
                    when: function (response) {
                        return response.tipoVisualizacao === 'Agrupada';
                    },
                    type: "input",
                    name: "campoGrupo",
                    message: "Informe o nome do campo a ser agrupado"
                }, {
                    when: function (response) {
                        return response.tipoVisualizacao === 'Agrupada';
                    },
                    type: "input",
                    name: "campoGrupoDetalhes",
                    message: "Informe o nome do campo dos detalhes"
                }, {
                    when: function (response) {
                        return response.tipoVisualizacao === 'Agrupada';
                    },
                    type: "input",
                    name: "campoGrupoTotal",
                    message: "Informe o nome do campo do totalizador"
                }, {
                    type: "list",
                    name: "servico",
                    message: "Qual serviço utilizar?",
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
                    message: "Qual recurso será utilizado?"
                }];

    module.exports = {
        prompts: prompts
    };
})();