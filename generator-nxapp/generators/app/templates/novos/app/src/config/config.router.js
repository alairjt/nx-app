(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name app.config:uiRouter
     * @description
     * # Config
     * Config for the router
     */
    angular.module('nxApp')
        .run(Run)
        .config(Route);

    function Run($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }

    function Route($stateProvider, $urlRouterProvider, ModuleLoaderProvider) {
        $urlRouterProvider
                .otherwise('/dashboard');
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'login/login.tpl.html',
                controller: 'LoginController',
                controllerAs: 'vm',
                data: {
                    authenticate: false
                }
            })
            .state('home', {
                abstract: true,
                url: '/',
                views: {
                    '': {
                        templateUrl: 'views/layout.tpl.html'
                    },
                    'aside': {
                        templateUrl: 'views/aside.tpl.html'
                    },
                    'body': {
                        templateUrl: 'views/content.tpl.html'
                    }
                }
            })
            .state('home.dashboard', {
                url: 'dashboard',
                templateUrl: 'dashboard/dashboard.tpl.html',
                data: {title: 'Dashboard', folded: true},
                controller: 'DashboardController',
                controllerAs: 'vm'
            })
            ;

        ModuleLoaderProvider.init(['modules.json']);
    }
})();
