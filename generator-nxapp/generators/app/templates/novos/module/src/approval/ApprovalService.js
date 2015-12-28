(function () {
    'use strict';

    angular.module('approval')
        .factory('ApprovalService', ApprovalService);

    function ApprovalService(Approval) {
        var query = Approval.query;

        var service = {
            query: query,
            findById: findById,
            hasId: hasId,
            save: save
        };

        return service;

        function save(acquirers, id, cbSuccess, cbError) {
            var data = new Approval(acquirers);

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

            return Approval.get({
                id: id
            }, cbSuccess, cbError);
        }

        function hasId(id) {
            return id !== undefined;
        }
    }
})();
