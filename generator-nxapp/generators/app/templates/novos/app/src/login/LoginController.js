(function () {
    'use strict';

    angular.module('nxApp')
        .controller('LoginController', LoginController);
    
    function LoginController($q, AuthUtils, LoginService) {
        var vm = this;

        vm.login = function (user) {
            verificarLogin(user).then(
                function(cookie) {
                    AuthUtils.buscarOperacoes(cookie).then(
                        function (data) {
                            cookie.operacoes = data.operacoes;
                            AuthUtils.definirCookieLocalStorage(cookie);
                            AuthUtils.redirecionarAplicacao();
                        }
                    );
                }
            );
        };
        
        var verificarLogin = function(user) {
            var defer = $q.defer();
            vm.logando = true;
            LoginService.verificarLogin(user.username, user.password).then(
                //Autenticado
                function(data) {
                    var cookie = AuthUtils.pegarCookieLocalStorage();
                    
                    cookie.autenticado = true;
                    cookie.username = user.username;
                    cookie.urlGetTicketServer = data.data;
                    defer.resolve(cookie);
                },
                //Não autenticado
                function(data) {
                    AuthUtils.removerCookie();
                    vm.erroValidacaoLogin = data.status === 400;
                    vm.erroServidorIndisponivel = data.status === 404 || data.status === 0;
                    vm.erroInternoServidor = data.status >= 500;
                    defer.reject(data);
                }
            );
    
            return defer.promise;
        };
    }
})();