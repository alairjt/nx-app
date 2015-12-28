(function () {
    'use strict';

    angular.module('approval')
        .controller('ApprovalController', ApprovalController);

    function ApprovalController(ApprovalService, $filter) {
        var vm = this;

        vm.config = {
            query: {
                filter: '',
                order: '',
                limit: 10,
                page: 1
            },
            table: {
                row_per_page: {
                    text: $filter('translate')('Registros por página').concat(':'),
                    of: $filter('translate')('de')
                }
            }
        };

        vm.filter = function (searchFilter) {
            vm.config.query.page = 1;
            vm.filtered = $filter('filter')(vm.listApprovals, searchFilter);
            return vm.filtered;
        };

        vm.deferred = ApprovalService.query(function (data) {
            vm.listApprovals = vm.filtered = data;
        }).$promise;
    }
})();
