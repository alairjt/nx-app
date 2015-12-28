(function () {
    'use strict';
    
    angular.module('nxApp')
        .factory('AuthInterceptor', AuthInterceptor)
        .config(InterceptorConfig);

        function AuthInterceptor($injector) {
            var PARAM_TICKET = '?SAMLart=';
            var buscarTicketServico = function (config) {
                var auth = $injector.get("AuthUtils"),
                    cookie = auth.pegarCookieLocalStorage ? auth.pegarCookieLocalStorage() : {};
            
                if (!cookie.urlGetTicketServer) {
                    return config.url;
                }
                
                var ticket = "";
                
                //Utiliza jQuery para requisição sincrona -- no angular todas as requisições estão - hardcoded - asincronas
                $.ajax({
                    type: "POST",
                    url: cookie.urlGetTicketServer,
                    async: false,
                    data: {service: config.url}
                }).success(function (data) {
                    ticket = data;
                }).error(function () {
                    //Direciona para o login
                    auth.sair();
                });
                
                return ticket;
            };
            
            return {
                request: function (config) {
                    config.headers = config.headers || {};

                    var validaServer = /(^https?\:\/\/)?.+(.html|.js|.json)$/;

                    if (!validaServer.test(config.url)) {
                        config.url = config.url.concat(PARAM_TICKET).concat(buscarTicketServico(config));
                    }

                    return config;
                }
            };
        }
    
        function InterceptorConfig($httpProvider) {
            $httpProvider.interceptors.push('AuthInterceptor');
        }
})();