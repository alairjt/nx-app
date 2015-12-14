(function() {
    'use strict';

    angular.module('nxApp').
    controller('<%= capitalize(crudName) %>Controller', <%= capitalize(crudName) %>Controller);

    function <%= capitalize(crudName) %>Controller(<%= capitalize(crudName) %>Service, $state, $filter, $mdDialog) {
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

        vm.filter = function(searchFilter) {
            vm.config.query.page = 1;
            vm.filtered = $filter('filter')(vm.list<%= capitalize(crudName) %>, searchFilter);
            return vm.filtered;
        };

        vm.add<%= capitalize(crudName) %> = function() {
            $state.go($state.current.name.concat('.new'));
        };

        vm.edit = function(id<%= capitalize(crudName) %>) {
            $state.go($state.current.name.concat('.edit'), {
                id: id<%= capitalize(crudName) %>
            });
        };

        vm.deferred = <%= capitalize(crudName) %>Service.query(function(data) {
            vm.list<%= capitalize(crudName) %> = vm.filtered = data;
        }).$promise;

        vm.showFilter = function(ev) {
            //@TODO: Criar diretiva para dialog filtros
            $mdDialog.show({
                controller: FilterController,
                templateUrl: '<%=crudName.toLowerCase()%>/dialog-filter.tpl.html',
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