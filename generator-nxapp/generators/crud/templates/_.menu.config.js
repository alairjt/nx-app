(function () {
    "use strict";

    angular.module('nxApp').config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                    .state('home.<%= menu.toLowerCase() %>', {
                        data: {
                            displayMenu: true,
                            hideMessagesForHTTPCodes: [],
                            displayName: '<%= capitalize(menu) %>'
                        }
                    })
                    ;
        }]);
})();
