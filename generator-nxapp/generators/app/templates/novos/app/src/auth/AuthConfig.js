(function () {
    "use strict";

    angular.module('nxApp')
        .config(AuthConfig);

    function AuthConfig($stateProvider) {
        $stateProvider.state('home.negado', {
            url: 'negado/:rota',
            views: {
                'content@': {
                    controller: "negadoController",
                    template: '<div class="alert alert-warning" role="alert"><i class="fa fa-exclamation-triangle"></i> <strong>[{{rotaName | translate}}]</strong> - {{"message.acesso_negado" | translate}}</div>'
                }
            },
            data: {
                displayMenu: false,
                displayName: 'Acesso negado',
                operacoes: []
            }
        });
    }
})();