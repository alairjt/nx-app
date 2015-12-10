(function() {
    'use strict';

    angular.module('nxApp').config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider) {
        $stateProvider
            .state('home.novo.bank', {
                url: 'bank',
                views: {
                    'content@': {
                        templateUrl: 'bank/bank.tpl.html',
                        controller: 'BankController',
                        controllerAs: 'vm'
                    }
                },
                data: {
                    displayMenu: true,
                    displayName: 'Banco',
                    operacoes: []
                }
            })
            .state('home.novo.bank.new', {
                url: '/new',
                transition: 'home.novo.bank',
                views: {
                    'content@': {
                        templateUrl: 'bank/bank-form.tpl.html',
                        controller: 'BankFormController',
                        controllerAs: 'vm'
                    }
                },
                data: {
                    displayMenu: false,
                    displayName: 'Novo',
                    operacoes: []
                }
            })
            .state('home.novo.bank.edit', {
                url: '/edit/:id',
                transition: 'home.novo.bank',
                views: {
                    'content@': {
                        templateUrl: 'bank/bank-form.tpl.html',
                        controller: 'BankFormController',
                        controllerAs: 'vm'
                    }
                },
                data: {
                    displayMenu: false,
                    displayName: 'Editar',
                    operacoes: []
                }
            });
    }
})();
