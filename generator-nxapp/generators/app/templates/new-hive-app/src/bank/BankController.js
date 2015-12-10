(function() {
    'use strict';

    angular.module('nxApp').
    controller('BankController', BankController);

    function BankController(BankService, $state, $filter, $mdDialog) {
        var vm = this;

        vm.config = {
            query: {
                filter: '',
                order: 'name',
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

        vm.filter = function(searchFilter) {
            vm.config.query.page = 1;
            vm.filtered = $filter('filter')(vm.listaBank, searchFilter);
            return vm.filtered;
        };

        vm.addBank = function() {
            $state.go('home.novo.bank.new');
        };

        vm.edit = function(idBank) {
            $state.go('home.novo.bank.edit', {
                id: idBank
            });
        };

        vm.deferred = BankService.query(function(data) {
            vm.listaBank = vm.filtered = data;
        }).$promise;

        vm.showFilter = function(ev) {
            //@TODO: Criar diretiva para dialog filtros
            $mdDialog.show({
                controller: FilterController,
                templateUrl: 'bank/dialog-filter.tpl.html',
                clickOutsideToClose: true,
                targetEvent: ev
            }).then(
                function(data) {
                    vm.filter(data);
                }
            );
        };
    }

    FilterController.$inject = ['$scope', '$mdDialog'];

    function FilterController($scope, $mdDialog) {
        $scope.filter = {};

        $scope.search = function(filter) {
            $mdDialog.hide(filter);
        };
    }
})();
