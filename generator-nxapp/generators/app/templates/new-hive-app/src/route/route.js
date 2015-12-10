(function () {
    'use strict';

    angular.module('nxApp')

    .config(Route);

    Route.$inject = ['$stateProvider', '$urlRouterProvider', 'ModuleLoaderProvider'];

    function Route($stateProvider, $urlRouterProvider, ModuleLoaderProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('home', {
            url: '/',
            views: {
                'content@': {
                    templateUrl: 'home/home.tpl.html',
                    controller: 'HomeController',
                    controllerAs: 'home'
                },
                'name@': {
                    template: 'Dashboard'
                }
            },
            data: {
                displayMenu: true,
                displayName: 'Dashboard',
                icon: 'dashboard',
                hideMessagesForHTTPCodes: [204],
                operacoes: []
            }
        });

        ModuleLoaderProvider.init(['config.json']);
    }

})();
