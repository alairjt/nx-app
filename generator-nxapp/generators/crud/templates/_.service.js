(function () {
    'use strict';

    angular.module('nxApp').factory('<%= capitalize(crudName) %>Service', ['<%= capitalize(crudName) %>', function (<%= capitalize(crudName) %>) {
        var buscar = <%= capitalize(crudName) %>.query;

        var salvar = function (<%= crudName.toLowerCase() %>, id, cbSuccess, cbError) {
            if (emEdicao(id)) {
                <%= capitalize(crudName) %>.update({id: id}, <%= crudName.toLowerCase() %>, cbSuccess, cbError);
            } else {
                <%= capitalize(crudName) %>.save(<%= crudName.toLowerCase() %>, cbSuccess, cbError);
            }
        };

        var buscarPorId = function (id, cbSuccess, cbError) {
            return <%= capitalize(crudName) %>.get({id: id}, cbSuccess, cbError);
        };

        var buscarParaEdicao = function (id, cbSuccess, cbError) {
            if (!emEdicao(id)) {
                return;
            }
            
            return buscarPorId(id, cbSuccess, cbError);
        };
        
        var fileChanged = function (element, callback) {
            if (element.files[0]) {
                var image = element.files[0];
                var reader = new FileReader();
                reader.onload = function (e) {
                    callback(image, e);
                };
                reader.readAsBinaryString(image);
            }
        };

        var emEdicao = function (id) {
            return id !== undefined;
        };

        return {
            buscar: buscar,
            buscarPorId: buscarPorId,
            buscarParaEdicao: buscarParaEdicao,
            emEdicao: emEdicao,
            fileChanged: fileChanged,
            salvar: salvar
        };
    }]);
})();
