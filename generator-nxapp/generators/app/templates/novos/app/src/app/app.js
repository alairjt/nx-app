(function () {
    'use strict';

    /**
     * @ngdoc overview
     * @name app
     * @description
     * # app
     *
     * Main module of the application.
     */
    angular
            .module('nxApp', [
                'ngAnimate',
                'ngAria',
                'ngCookies',
                'ngMessages',
                'ngResource',
                'ngSanitize',
                'ngMaterial',
                'ngStorage',
                'ngStore',
                'ui.router',
                'ui.utils',
                'ui.bootstrap',
                'ui.load',
                'pascalprecht.translate',
                'oc.lazyLoad',
                'angular-loading-bar',
                'ngMdIcons',
                'base64',
                'nx.angular',
                'md.data.table',
                'googlechart',
                'cfp.loadingBar'
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
            apiEndPoint: 'https://{subdomain}-dev.cloudint.nexxera.com/'
        });
    }

    ThemingConfig.$inject = ['$mdThemingProvider', 'cfpLoadingBarProvider'];

    function ThemingConfig($mdThemingProvider, cfpLoadingBarProvider) {
        cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Carregando...</div>';
        cfpLoadingBarProvider.latencyThreshold = 500;

        $mdThemingProvider.setDefaultTheme('grey');
        $mdThemingProvider.theme('grey')
                .primaryPalette('green', {
                    'hue-1': '200',
                    'hue-2': '400',
                    'hue-3': '800'
                });
    }
})();
