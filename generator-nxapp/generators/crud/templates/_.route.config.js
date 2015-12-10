(function() {
    'use strict';

    angular.module('nxApp').config(<%= capitalize(crudName) %>Config);

    function <%= capitalize(crudName) %>Config($stateProvider) {
        $stateProvider
            .state('home.<%= menu.toLowerCase() %>.<%= crudName.toLowerCase() %>', {
                url: '<%= crudName.toLowerCase() %>',
                views: {
                    'content@': {
                        templateUrl: '<%= crudName.toLowerCase() %>/<%= crudName.toLowerCase() %>.tpl.html',
                        controller: '<%= capitalize(crudName) %>Controller',
                        controllerAs: 'vm'
                    }
                },
                data: {
                    displayMenu: true,
                    displayName: '<%= capitalize(crudName) %>',
                    operacoes: []
                }
            })
            .state('home.<%= menu.toLowerCase() %>.<%= crudName.toLowerCase() %>.new', {
                url: '/new',
                transition: 'home.novo.<%= crudName.toLowerCase() %>',
                views: {
                    'content@': {
                        templateUrl: '<%= crudName.toLowerCase() %>/<%= crudName.toLowerCase() %>-form.tpl.html',
                        controller: '<%= capitalize(crudName) %>FormController',
                        controllerAs: 'vm'
                    }
                },
                data: {
                    displayMenu: false,
                    displayName: 'Novo',
                    operacoes: []
                }
            })
            .state('home.<%= menu.toLowerCase() %>.<%= crudName.toLowerCase() %>.edit', {
                url: '/edit/:id',
                transition: 'home.<%= menu.toLowerCase() %>.<%= crudName.toLowerCase() %>',
                views: {
                    'content@': {
                        templateUrl: '<%= crudName.toLowerCase() %>/<%= crudName.toLowerCase() %>-form.tpl.html',
                        controller: '<%= capitalize(crudName) %>FormController',
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