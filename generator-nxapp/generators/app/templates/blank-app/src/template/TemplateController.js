app.controller('templateController', ['$scope', 'TemplateService', 'HIVE_COMMON', function($scope, TemplateService, HIVE_COMMON) {   
    TemplateService.getMenu().success(function (data) {
        $scope.menus = data;
    });
    
    //Carrega as constantes para uso no menu do HIVE
    $scope.HIVE_COMMON = HIVE_COMMON;    
    
    //Define o menu ativo do cabeçalho
    $scope.application = HIVE_COMMON.applications.<%=props.appName%>; 
}]);