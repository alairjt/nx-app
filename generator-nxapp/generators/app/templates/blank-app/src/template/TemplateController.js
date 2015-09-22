app.controller('templateController', ['$scope', 'HIVE_COMMON', function($scope, HIVE_COMMON) {   
    //Carrega as constantes para uso no menu do HIVE
    $scope.HIVE_COMMON = HIVE_COMMON;    
    
    //Define o menu ativo do cabeçalho
    $scope.application = HIVE_COMMON.applications.<%=strUtils.decapitalize(props.appName)%>; 
}]);