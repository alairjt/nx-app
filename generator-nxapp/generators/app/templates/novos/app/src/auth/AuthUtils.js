(function () {
    "use strict";

    angular.module("nxApp")
            .factory('AuthUtils', AuthUtils);

    function AuthUtils($q, $window, $http, $rootScope, $base64, $injector, $state) {
        var _cookie,
                _angular = angular,
                _storage = localStorage,
                CHAVE_COOKIE = "NXKEY",
                CHAVE_COOKIE_DEBUG = CHAVE_COOKIE + "_DEBUG",
                appConfig,
                appPermitidas = [];

        try {
            appConfig = $injector.get('AppConfig');
        } catch (e) {
            appConfig = {
                getConfigs: function () {
                    return undefined;
                }
            };
        }

        var _emDesenvolvimento = function () {
            var expressaoLocalHost = /localhost/i,
                    cookie = _pegarCookieLocalStorage();

            return expressaoLocalHost.test(cookie.url === "" ? $window.location.href : cookie.url);
        };

        var _inicializarCookie = function () {
            _cookie = {username: "", operacoes: null, ticket: "", autenticado: false, url: ''};

            return _cookie;
        };

        var _redirecionarParaLogin = function () {
            $state.go('login');
        };

        var _estaAutenticado = function () {
            _cookie = _pegarCookieLocalStorage();

            return _cookie.autenticado;
        };

        var _removerCookie = function () {
            return _storage.removeItem(CHAVE_COOKIE) || _storage.removeItem(CHAVE_COOKIE_DEBUG);
        };

        var _definirCookieLocalStorage = function (cookie) {
            //Para debug
//                _storage.setItem(CHAVE_COOKIE_DEBUG, _angular.toJson(cookie));

            return _storage.setItem(CHAVE_COOKIE, _encode64(_angular.toJson(cookie)));
        };

        var _definirUsuario = function (cookie) {
            $rootScope.username = cookie.username;
            $rootScope.perfis = [];

            if (cookie.operacoes) {
                angular.forEach(cookie.operacoes.perfis, function (value) {
                    $rootScope.perfis.push(value.nome);
                });
            }
        };

        var _definirUsuarioLogado = function (cookie) {
            _definirCookieLocalStorage(cookie);
            _definirUsuario(cookie);
        };

        var _encode64 = function (str) {
            return str ? $base64.encode(str) : false;
        };

        var _decode64 = function (str) {
            return str ? $base64.decode(str) : false;
        };

        var _pegarCookieLocalStorage = function () {
            var cookie = _decode64(_storage.getItem(CHAVE_COOKIE));

            if (!cookie) {
                cookie = _inicializarCookie();
            }

            return _angular.fromJson(cookie);
        };

        var _redirecionarNaoAutenticado = function () {
            var autenticado = _estaAutenticado();
            if (!autenticado) {
                _redirecionarParaLogin();
            }

            return false;
        };

        var _redirecionarAcessoNegado = function (rotaNome) {
            $state.transitionTo("home.negado", {rota: rotaNome});
        };

        var _verificarOperacao = function (operacao) {
            var cookie = _pegarCookieLocalStorage(), retorno = false;
            //Se estiver autenticado, tiver operações e perfis disponíveis
            if (cookie.autenticado && cookie.operacoes && cookie.operacoes.perfis) {
                //Percorre os perfis
                for (var i = 0; i < cookie.operacoes.perfis.length; i++) {
                    var perfil = cookie.operacoes.perfis[i];
                    //Verifica se o componente e a permissão existem
                    if (operacao.parent && perfil.componentes && perfil.componentes[operacao.parent.name] && (retorno = perfil.componentes[operacao.parent.name].hasOwnProperty(operacao.name))) {
                        break;
                    }
                }
            }

            //Trata para retornar sempre true ou false
            return retorno ? true : false;
        };

        var _verificarListaOperacoes = function (operacoes) {
            var retorno = false, cookie = _pegarCookieLocalStorage();
            if (cookie.autenticado && cookie.operacoes && operacoes) {
                if (Array.isArray(operacoes)) {
                    if (operacoes.length > 0) {
                        for (var i = 0; i < operacoes.length; i++) {
                            if (_verificarOperacao(operacoes[i])) {
                                retorno = true;
                            }
                        }
                    } else {
                        //libera o acesso quando foi definido na rota
                        //a lista de operacoes em branco
                        retorno = true;
                    }
                } else {
                    retorno = _verificarOperacao(operacoes);
                }
            }

            return retorno;
        };

        var _verificarPermissaoAplicacao = function () {
            var hasPermission = false;
            var applications = _buscarAplicacoesPermitidas();
            var configs = appConfig.getConfigs();
            if (!applications || !applications.length || !configs) {
                return;
            }
            angular.forEach(applications, function (application) {
                if (application.name === configs.name) {
                    hasPermission = true;
                }
            });

            if (!hasPermission) {
                _redirecionarAplicacaoOuNegarAcesso(applications[0].baseUrl);
            }
        };

        var _redirecionarAplicacaoOuNegarAcesso = function (url) {
            if (!_emDesenvolvimento()) {
                $window.location.href = url;
            } else {
                $state.transitionTo("home.negado", {rota: 'Usuário sem permissão de acesso à aplicação.'});
            }
        };

        var _buscarOperacoes = function (auth) {
            var deferred = $q.defer();
            //Busca as operações apenas uma vez
            if (!auth.operacoes) {
                deferred.resolve({operacoes: [], status: {}, success: true});
//                    $http.get(serviceUtils.getApiEndPoint(SERVICES.rbacPermissoes.rbac) + "/" + auth.username).success(function (data, status) {
//                        deferred.resolve({operacoes: data, status: status, success: true});
//                    }).error(function (data, status) {
//                        deferred.reject({error: data, status: status, success: false});
//                    });
            } else {
                deferred.resolve({operacoes: auth.operacoes, success: true});
            }
            return deferred.promise;
        };

        var _sair = function () {
            //@TODO: Verificar exclusão de ticket no NexxAuth.
            //_excluirTicket();
            _removerCookie();
            _redirecionarParaLogin();
        };

        var _buscarAplicacoesPermitidas = function () {
            var retorno = appPermitidas;

            if (retorno.length === 0) {
//                    angular.forEach(HIVE_COMMON.applications, function (aplicacao) {
//                        if (_freeAccessApp(aplicacao) || _verificarOperacao(aplicacao)) {
//                           retorno.push(aplicacao);
//                        }
//                    });
            }

            return retorno;
        };

        var _freeAccessApp = function (aplicacao) {
            return (aplicacao.parent && aplicacao.parent.name === "HiveWeb" && aplicacao.autenticar === false);
        };

        var _adicionarHashCookieUrl = function (url) {
            if (url.indexOf("http://localhost") === -1) {
                return url;
            }

            if (url.indexOf('#/') === -1) {
                url += '#/';
            }

            url += _storage.getItem(CHAVE_COOKIE);

            return url;
        };

        var _redirecionarAplicacao = function () {
            if (!_estaAutenticado()) {
                _redirecionarParaLogin();
                $rootScope.logando = false;
                $rootScope.erroValidacaoLogin = true;
                return;
            } else {
                $state.transitionTo('home.dashboard');
            }
        };

        var _restaurarSessao = function () {
            _definirUsuarioLogado(_pegarCookieLocalStorage());
        };

        return {
            estaAutenticado: _estaAutenticado,
            sair: _sair,
            removerCookie: _removerCookie,
            redirecionarNaoAutenticado: _redirecionarNaoAutenticado,
            pegarCookieLocalStorage: _pegarCookieLocalStorage,
            definirCookieLocalStorage: _definirCookieLocalStorage,
            definirUsuarioLogado: _definirUsuarioLogado,
            verificarListaOperacoes: _verificarListaOperacoes,
            verificarOperacao: _verificarOperacao,
            buscarOperacoes: _buscarOperacoes,
            redirecionarAplicacao: _redirecionarAplicacao,
            emDesenvolvimento: _emDesenvolvimento,
            verificarPermissaoAplicacao: _verificarPermissaoAplicacao,
            redirecionarParaLogin: _redirecionarParaLogin,
            redirecionarAcessoNegado: _redirecionarAcessoNegado,
            restaurarSessao: _restaurarSessao,
            buscarAplicacoesPermitidas: _buscarAplicacoesPermitidas
        };
    }
})();