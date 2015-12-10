(function () {
    'use strict';

    var prompts = [{
            type: 'input',
            name: 'nome',
            message: 'Nome do campo:'
        }, {
            type: 'input',
            name: 'label',
            message: 'Label do campo:'
        }, {
            type: "list",
            name: "tipo",
            message: "Tipo do campo:",
            default: "String",
            choices: [
                "CNPJ / CPF",
                "Combobox",
                "Date",
                "Decimal",
                "Email",
                "Imagem",
                "Integer",
                "String"
            ]
        }, {
            when: function (data) {
                return data.tipo === 'Combobox';
            },
            type: "confirm",
            name: "comboboxDataFromService",
            message: "Carregar opções de um serviço?",
            default: true
        }, {
            when: function (data) {
                return data.tipo === 'Combobox' && data.comboboxDataFromService;
            },
            type: "confirm",
            name: "comboboxRecursoExistente",
            message: "Serviço e recurso existem?",
            default: true
        }, {
            when: function (data) {
                return data.tipo === 'Combobox' && data.comboboxDataFromService && !data.comboboxRecursoExistente;
            },
            type: "input",
            name: "comboboxService",
            message: "Nome do Serviço/Recurso a ser criado (ex.: SERVICES.banco.bancos):"
        }, {
            when: function (data) {
                return data.tipo === 'Combobox' && data.comboboxDataFromService && data.comboboxRecursoExistente;
            },
            type: "input",
            name: "comboboxService",
            message: "Nome do Service/Resource (ex.: Bancos):"
        }, {
            when: function (data) {
                return data.tipo === 'Combobox' && !data.comboboxDataFromService;
            },
            type: "input",
            name: "comboboxData",
            message: "Dados da Combobox (ex.: Chave1:Valor1;Chave2:Valor2):"
        }, {
            type: "checkbox",
            name: "telas",
            message: "Adicionar campo às telas:",
            choices: [
                "consulta",
                "formulario"
            ]
        }, {
            type: 'confirm',
            name: 'adicionarOutro',
            message: 'Adicionar outro campo?',
            default: true
        }
    ];

    module.exports = {
        prompts: prompts
    };
})();