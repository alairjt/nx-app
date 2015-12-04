(function () {
    'use strict';

    angular.module('hiveApp')
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('home', {
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
                        hideMessagesForHTTPCodes: [204],
                        displayName: 'Dashboard',
                        operacoes: []
                    }
                });
        }]);
})();