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
        
        <%  if (hasImageField) { %>
            //@TODO: Componentizar
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
        <%  } %>

        var emEdicao = function (id) {
            return id !== undefined;
        };

        return {
            buscar: buscar,
            buscarPorId: buscarPorId,
            buscarParaEdicao: buscarParaEdicao,
            emEdicao: emEdicao,
            <%  if (hasImageField) { %>
                fileChanged: fileChanged,
            <%  } %>
            salvar: salvar
        };
    }]);
})();






(function() {
    'use strict';

    angular.module('nxApp').factory('<%= capitalize(crudName) %>Service', <%= capitalize(crudName) %>Service);

    function <%= capitalize(crudName) %>Service(<%= capitalize(crudName) %>) {
        var query = <%= capitalize(crudName) %>.query;

        var service = {
            query: query,
            findById: findById,
            hasId: hasId,
            fileChanged: fileChanged,
            save: save
        };

        return service;

        function save(<%= crudName.toLowerCase() %>, id, cbSuccess, cbError) {
            var data = new <%= capitalize(crudName) %>(<%= crudName.toLowerCase() %>);

            if (hasId(id)) {
                data.$update({
                    id: id
                }, cbSuccess, cbError);
            } else {
                data.$save(cbSuccess, cbError);
            }

            return data;
        }

        function findById(id, cbSuccess, cbError) {
            if (!hasId(id)) {
                return;
            }

            return <%= capitalize(crudName) %>.get({
                id: id
            }, cbSuccess, cbError);
        }

        function fileChanged(element, callback) {
            if (element.files[0]) {
                var image = element.files[0];
                var reader = new FileReader();
                reader.onload = function(e) {
                    callback(image, e);
                };
                reader.readAsBinaryString(image);
            }
        }

        function hasId(id) {
            return id !== undefined;
        }
    }
})();