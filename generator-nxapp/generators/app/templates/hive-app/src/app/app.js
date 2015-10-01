var modules = ['ngAnimate', 'ngSanitize', 'ngResource', 
    'ui.router', 'ui.utils', 'ui.bootstrap', 'ui.select',
    'googlechart', 'base64',  'constants', 'nxHiveCommonModule', 
    'nxNexxeraComponentsModule', 'nxTranslate', 'nxStyleModule'];

var app = angular.module("hiveApp", modules);

/**
 * TODO: Habilitar appConfig apos adicionar a aplicacao na constants HIVE_COMMON.
 * 

app.provider('AppConfig', ['HIVE_COMMON', function (HIVE_COMMON) {
    this.configs = HIVE_COMMON.applications.<%=strUtils.decapitalize(props.appName)%>;
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