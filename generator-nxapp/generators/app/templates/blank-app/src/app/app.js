var modules = ['ngAnimate', 'ngSanitize', 'ngResource', 
    'ui.router', 'ui.utils', 'ui.bootstrap', 'ui.select',
    'googlechart', 'base64',  'constants', 'nxHiveCommonModule', 
    'nxNexxeraComponentsModule', 'nxTranslate'];

var app = angular.module("hiveApp", modules);

/**
 * TODO: Habilitar appConfig apos adicionar a aplicacao na constants HIVE_COMMON.
 * 

app.provider('appConfig', ['HIVE_COMMON', function (HIVE_COMMON) {
    this.configs = HIVE_COMMON.applications.<%=props.appName%>;
    this.$get = function () {
        var configs = this.configs;
        return {
            getConfigs: function () {
                return configs;
            }
        };
    };
}]);

**/


app.config(['$sceDelegateProvider', function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'https://aenhive-dev.nexxera.com/**',
        'https://aenhive-qa.nexxera.com/**'
                // MAS UMA AQUI A DE PRODUÇÂO.
    ]);
}]);