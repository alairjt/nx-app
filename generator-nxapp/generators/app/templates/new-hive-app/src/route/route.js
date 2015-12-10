(function () {
    'use strict';

    angular.module('nxApp')

    .config(['$stateProvider', '$urlRouterProvider', 'ModuleLoaderProvider', function ($stateProvider, $urlRouterProvider, ModuleLoaderProvider) {
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
    }]);
})();
