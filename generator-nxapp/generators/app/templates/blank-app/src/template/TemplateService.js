(function () {
    'use strict';
    app.factory('TemplateService', ['$http', function ($http) {
            var _getMenu = function () {
                return $http.get("template/menu.json");
            };

            return {
                getMenu: _getMenu
            };
        }]);
})();
