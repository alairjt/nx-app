(function() {
    'use strict';

    angular.module('nxApp').factory('BankService', BankService);

    function BankService(Bank) {
        var query = Bank.query;

        var service = {
            query: query,
            findById: findById,
            hasId: hasId,
            fileChanged: fileChanged,
            save: save
        };

        return service;

        function save(bank, id, cbSuccess, cbError) {
            var data = new Bank(bank);

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

            return Bank.get({
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
