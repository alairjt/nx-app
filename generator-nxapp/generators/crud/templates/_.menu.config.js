(function () {
    "use strict";

    angular.module('nxApp').config(<%= capitalize(menu) %>Config);
    
    function <%= capitalize(menu) %>Config($stateProvider) {
        $stateProvider
            .state('home.<%= menu.toLowerCase() %>', {
                data: {
                    displayMenu: true,
                    hideMessagesForHTTPCodes: [],
                    displayName: '<%= capitalize(menu) %>'
                }
            })
            ;
    }
})();
