(function () {
    'use strict';

    angular.module('nxApp')
        .config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
            $ocLazyLoadProvider.config({
                debug: false,
                events: true
            });
        }]);
})();

