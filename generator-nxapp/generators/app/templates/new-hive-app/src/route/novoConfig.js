(function() {
    'use strict';

    angular.module('nxApp').config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('home.novo', {
                data: {
                    displayMenu: true,
                    hideMessagesForHTTPCodes: [],
                    displayName: 'Novo'
                }
            });
    }]);
})();
