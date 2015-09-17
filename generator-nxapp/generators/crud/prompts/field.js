(function () {
    'use strict';

    var prompts = [{
            type: 'input',
            name: 'nome',
            message: 'Field name'
        }, {
            type: 'input',
            name: 'label',
            message: 'Field label'
        }, {
            type: "list",
            name: "tipo",
            message: "Field type",
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
            message: "Combobox data loaded from a service",
            default: true
        }, {
            when: function (data) {
                return data.tipo === 'Combobox' && data.comboboxDataFromService;
            },
            type: "confirm",
            name: "comboboxRecursoExistente",
            message: "Service and resource exists in the Web apps",
            default: true
        }, {
            when: function (data) {
                return data.tipo === 'Combobox' && data.comboboxDataFromService && !data.comboboxRecursoExistente;
            },
            type: "input",
            name: "comboboxService",
            message: "Service/Resource that will be created (ex.: SERVICES.banco.bancos)"
        }, {
            when: function (data) {
                return data.tipo === 'Combobox' && data.comboboxDataFromService && data.comboboxRecursoExistente;
            },
            type: "input",
            name: "comboboxService",
            message: "Service/Resource name (ex.: Bancos)"
        }, {
            when: function (data) {
                return data.tipo === 'Combobox' && !data.comboboxDataFromService;
            },
            type: "input",
            name: "comboboxData",
            message: "Combobox data (ex.: Chave1:Valor1;Chave2:Valor2)"
        }, {
            type: "checkbox",
            name: "telas",
            message: "Add field to pages",
            choices: [
                "consulta",
                "formulario"
            ]
        }, {
            type: 'confirm',
            name: 'adicionarOutro',
            message: 'Add another field',
            default: true
        }
    ];

    module.exports = {
        prompts: prompts
    };
})();