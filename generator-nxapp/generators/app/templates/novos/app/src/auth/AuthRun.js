(function () {
    "use strict";

    angular.module('nxApp')
        .run(AuthRun);

    function AuthRun($rootScope, AuthService, AuthUtils, $window, $base64) {
        CriarCookiePelaUrl();

        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            AuthService.authorize(toState);
        });
        
        function CriarCookiePelaUrl() {
            try {
                if (!AuthUtils.emDesenvolvimento()) {
                    return;
                }

                var hash = $window.location.hash.substring('#/'.length);    

                var cookie = angular.fromJson($base64.decode(hash));

                if (cookie.autenticado) {
                    AuthUtils.definirUsuarioLogado(cookie);
                }

                return cookie;
            } catch (e) {
            }
        };
    }
})();