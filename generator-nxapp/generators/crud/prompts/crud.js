(function () {
    'use strict';

    var prompts = [{
                    type: "input",
                    name: 'crudName',
                    message: 'CRUD name'
                }, {
                    type: "input",
                    name: "menu",
                    message: "Add to the menu"
                }, {
                    type: "confirm",
                    name: "createMenu",
                    message: "Create menu",
                    default: false
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
                    type: "input",
                    name: "servico",
                    message: "Service name"
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