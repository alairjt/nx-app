(function () {
    'use strict';

    var lodash = require('lodash'),
        strUtils = require('../strUtils');
        
    var getDisplayField = function (crudName, field) {
        var mask = obterInputType(field.tipo).mask;
        var filter = mask !== '' ? ' | ' + mask : "";

        return crudName.toLowerCase() + "." + field.nome + filter;
    };

    var obterInputType = function (tipo) {
        var type = "text", mask = "";
        switch (tipo) {
            case "Integer":
                type = mask = "number";
                break;
            case "Email":
                type = mask = "email";
                break;
            case "Decimal":
                type = mask = "currency";
                break;
            case "CNPJ / CPF":
                type = mask = "cpfcnpj";
                break;
            default:
                type = "text";
                break;
        }

        return {type: type, mask: mask};
    };

    var obterInputPorTipo = function (crudName, field) {
        var criarInput = function (crudName, field) {
            var specsField = obterInputType(field.tipo);
            return '<input type="' + specsField.type + '" ' + specsField.mask + ' class="form-control"' +
                    ' id="' + field.nome + '" name="' + field.nome + '"' +
                    ' ng-model="vm.' + crudName.toLowerCase() + '.' + field.nome + '"' +
                    ' ng-required="true"/>';
        };

        var criarInputImagem = function (crudName, field) {
            return '<input ng-model="vm.image" value="' + crudName.toLowerCase() + '.' + field.nome + '" onchange="angular.element(this).scope().fileChanged(this, \'' + field.nome + '\');" type="file" accept="image/*" />';
        };

        var criarInputDate = function (crudName, field) {
            return '<calendar label="Data" model="vm.' + crudName.toLowerCase() + '.' + field.nome + '" format="dd/MM/yyyy"></calendar>';
        };

        var criarInputCombobox = function (crudName, field) {
            return '<select class="form-control" name="' + field.nome + '" ng-model="vm.' + crudName.toLowerCase() + field.nome + '" id="' + field.nome + '"' +
                    'ng-options="data as data.nome for data in vm.list' + strUtils.capitalize(field.nome) + '" ng-required="true">' +
                    '</select>';
        };

        var input = "";

        switch (field.tipo) {
            case "CNPJ / CPF":
            case "Decimal":
            case "Email":
            case "Integer":
            case "String":
                input = criarInput(crudName, field);
                break;
            case "Combobox":
                input = criarInputCombobox(crudName, field);
                break;
            case "Date":
                input = criarInputDate(crudName, field);
                break;
            case "Imagem":
                input = criarInputImagem(crudName, field);
                break;
            default:
                input = criarInput(crudName, field);
                break;
        }

        return input;
    };

    var processarRetornoPrompt = function (check, callbackTrue, callbackFalse) {
        return check ? callbackTrue() : callbackFalse();
    };

    var efetuarParseComboboxData = function (data) {
        if (!data)
            return;

        var retorno = [];
        var dados = data.split(";");
        for (var key in dados) {
            var chaveValor = dados[key].split(":");
            retorno.push({nome: chaveValor[0], valor: chaveValor[1]});
        }

        return JSON.stringify(retorno);
    };

    var hasFieldFormulario = function (fields) {
        var retorno = false;
        for (var key in fields) {
            if (lodash.contains(fields[key].telas, "formulario") === true) {
                retorno = true;
                break;
            }
        }
        
        return retorno;
    };
    
    var hasImageField = function (fields) {
        var retorno = false;
        for (var key in fields) {
            if (lodash.contains(fields[key].tipo, "Imagem") === true) {
                retorno = true;
                break;
            }
        }
        
        return retorno;
    };

    module.exports = {
        efetuarParseComboboxData: efetuarParseComboboxData,
        getDisplayField: getDisplayField,
        hasFieldFormulario: hasFieldFormulario,
        hasImageField: hasImageField,
        obterInputPorTipo: obterInputPorTipo,
        obterInputType: obterInputType,
        processarRetornoPrompt: processarRetornoPrompt
    };
})();