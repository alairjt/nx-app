(function () {
    'use strict';

    var prompts = function (parent) {
        return [{
                type: "input",
                name: 'crudName',
                message: 'Nome do crud:'
            }, {
                type: "input",
                name: "menu",
                message: "Adicionar ao menu:"
            }, {
                type: "confirm",
                name: "createMenu",
                message: "Criar menu?",
                default: false
            }, {
                type: "list",
                name: "tipoVisualizacao",
                message: "Tipo da consulta:",
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
                message: "Nome do campo a ser agrupado:"
            }, {
                when: function (response) {
                    return response.tipoVisualizacao === 'Grouped';
                },
                type: "input",
                name: "campoGrupoDetalhes",
                message: "Nome do campo de detalhes:"
            }, {
                when: function (response) {
                    return response.tipoVisualizacao === 'Grouped';
                },
                type: "input",
                name: "campoGrupoTotal",
                message: "Nome do campo de totais:"
            }, {
                when: function () {
                    return !parent.servico;
                },
                type: "input",
                name: "servico",
                message: "Nome do serviço:"
            }, {
                when: function (response) {
                    return !response.novoRecurso && !parent.path;
                },
                type: "input",
                name: "recurso",
                message: "Nome do recurso:"
            }];
    };

    module.exports = {
        prompts: prompts
    };
})();