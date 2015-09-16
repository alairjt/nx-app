(function () {
    'use strict';

    var prompts = [{
            type: 'input',
            name: 'nome',
            message: 'Nome do campo'
        }, {
            type: 'input',
            name: 'label',
            message: 'Label do campo'
        }, {
            type: "list",
            name: "tipo",
            message: "Tipo do campo",
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
            message: "Os dados da combobox serão carregados a partir de um serviço?",
            default: true
        }, {
            when: function (data) {
                return data.tipo === 'Combobox' && data.comboboxDataFromService;
            },
            type: "confirm",
            name: "comboboxRecursoExistente",
            message: "Serviço/Recurso já utilizado na WEB?",
            default: true
        }, {
            when: function (data) {
                return data.tipo === 'Combobox' && data.comboboxDataFromService && !data.comboboxRecursoExistente;
            },
            type: "input",
            name: "comboboxService",
            message: "Informe o serviço/recurso a ser criado (ex.: SERVICES.banco.bancos)"
        }, {
            when: function (data) {
                return data.tipo === 'Combobox' && data.comboboxDataFromService && data.comboboxRecursoExistente;
            },
            type: "input",
            name: "comboboxService",
            message: "Informe o serviço/recurso a ser utilizado (ex.: Bancos)"
        }, {
            when: function (data) {
                return data.tipo === 'Combobox' && !data.comboboxDataFromService;
            },
            type: "input",
            name: "comboboxData",
            message: "Informe os dados da combobox no formato Chave1:Valor1;Chave2:Valor2"
        }, {
            type: "checkbox",
            name: "telas",
            message: "Utilizar o campo nas telas:",
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