(function () {
    'use strict';
    /**
     * @ngdoc overview
     * @name nxApp
     * @description
     * # nxApp
     *
     * Main module of the application.
     */
    angular.module('nxApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngMessages',
        'ngRoute',
        'ngTouch',
        'ngMaterial',
        'ngMdIcons',
        'ui.router',
        'base64',
        'nx.angular'
    ])

    .filter('translate', function () {
        return function (text) {
            return text;
        };
    })

    .config(ServicesRegisterConfig)

    .config(ThemingConfig);

    ServicesRegisterConfig.$inject = ['ServicesRegisterProvider'];

    function ServicesRegisterConfig(ServicesRegisterProvider) {
        //@TODO: Passar API END POINT para constant
        ServicesRegisterProvider.init({
            apiEndPoint: 'https://{subdomain}-dev.nexxera.com/'
        });
    }

    ThemingConfig.$inject = ['$mdThemingProvider'];

    function ThemingConfig($mdThemingProvider) {
        $mdThemingProvider.setDefaultTheme('grey');
        $mdThemingProvider.theme('grey')
            .primaryPalette('green', {
                'hue-1': '200',
                'hue-2': '400',
                'hue-3': '800'
            });
    }

})();
