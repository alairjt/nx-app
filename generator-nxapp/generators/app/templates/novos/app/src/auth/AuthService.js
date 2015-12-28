(function () {
    "use strict";
    
    angular.module('nxApp')
        .factory('AuthService', AuthService);

        function AuthService($rootScope, AuthUtils) {
            var _authorize = function (toState) {
                if (toState && toState.data && toState.authenticate === false) {
                    return true;
                }

                $rootScope.logando = true;
                //Verifica se existe identity
                if (AuthUtils.estaAutenticado()) {
                    //Tratamento para quando é utilizado o refresh
                    //e o usuário já está logado
                    AuthUtils.restaurarSessao();
                    AuthUtils.verificarPermissaoAplicacao();
                    if (toState && toState.data && toState.data.operacoes && !AuthUtils.verificarListaOperacoes(toState.data.operacoes)) {
                        var displayName = toState.data.displayName;
                        AuthUtils.redirecionarAcessoNegado(displayName);
                    }
                } else {
                    AuthUtils.redirecionarAplicacao();
                }

                $rootScope.logando = false;
            };

            return {
                authorize: _authorize
            };
        }
})();