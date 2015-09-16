(function () {
    "use strict";
    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/");
            $stateProvider
                    .state('home', {
                        url: '/',
                        views: {
                            'content@': {
                                templateUrl: "home/home.tpl.html",
                                controller: "HomeController"
                            }
                        },
                        data: {
                            hideMessagesForHTTPCodes : [204],
                            displayName: 'Home',
                            operacoes: []
                        }

                    })
                    .state('home.consultas', {
                        data: {
                            hideMessagesForHTTPCodes : [],
                            displayName: 'Consultas'
                        }
                    })
                    ;
        }]);
})();
