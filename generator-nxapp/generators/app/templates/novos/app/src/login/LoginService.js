(function () {
    "use strict";

    angular.module('nxApp')
        .factory('LoginService', LoginService);

    function LoginService($q, $http, $compile, $rootScope) {
        var _verificarLogin = function (username, password) {
            var deferred = $q.defer();
            var url = "https://devweb2.nexxera.com/nexxauth/cas/v1/tickets";

            $http.post(url, $.param({username: username, password: password}), {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data, status) {
                var compileData = $compile(data)($rootScope);
                var retorno = {data: compileData[2].action, status: status, success: true};
                deferred.resolve(retorno);
            }).error(function (data, status) {
                var retorno = {data: data, status: status, success: false};
                deferred.reject(retorno);
            });

            return deferred.promise;
        };

        return {
            verificarLogin: _verificarLogin
        };
    }
})();