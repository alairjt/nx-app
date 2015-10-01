var modules = ['nxNexxeraComponentsModule',
    'ui.router', 'base64',  'nxTranslate', 'nxStyleModule'];

var app = angular.module("hiveApp", modules);

app.provider('AppConfig', function () {
    this.configs = {name: '<%=props.appName.toUpperCase() %>', baseUrl: '/<%=props.appName%>/', title: '<%=props.appName%>', class: "glyphicon glyphicon-question-sign"};
    this.$get = function () {
        var configs = this.configs;
        return {
            getConfigs: function () {
                return configs;
            }
        };
    };
});
