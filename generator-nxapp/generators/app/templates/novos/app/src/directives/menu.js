(function () {
    'use strict';

    angular.module('nxApp')
        .directive('nxMenus', ['MenuFactory', '$state', function (MenuFactory, $state) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    appTitle: '='
                },
                link: function (scope) {
                    scope.menus = [];

                    scope.getMenuOperacoes = function (menu) {
                        var state = $state.get(menu.href),
                            retorno;
                        if (state && state.data && state.data.operacoes) {
                            retorno = state.data.operacoes;
                        }

                        return retorno;
                    };

                    scope.menus = MenuFactory.get();
                },
                templateUrl: 'directives/menu.tpl.html'
            };
        }]);
})();
