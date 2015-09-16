(function (){
	'use strict';

	app.controller('Consulta<%= capitalize(crudName) %>Controller', ['$scope', 'HIVE_COMMON', '$filter', '<%= capitalize(crudName) %>Service',
            function($scope, HIVE_COMMON, $filter, <%= capitalize(crudName) %>Service) {
                var self = this;
                $scope.criterio = "";
                $scope.campoOrderBy = "";
                $scope.reverse = false;
                $scope.currentPage = 1;
                $scope.pageSize = HIVE_COMMON.pageSize;
                
                <%= capitalize(crudName) %>Service.buscar(function(data){
                    self.lista<%= capitalize(crudName) %> = $scope.filtered = data;
                });

                self.filtrar = function (lista) {
                    return $filter('filter')(lista, $scope.criterio);
                };
                
                $scope.$watch('criterio', function () {
                    $scope.filtered = self.filtrar(self.lista<%= capitalize(crudName) %>);
                });

                $scope.ordenarCamposPor = function (campo) {
                    $scope.campoOrderBy = campo;
                    $scope.reverse = !$scope.reverse;
                };
                
                $scope.selecionarRegistro = function (registro) {
                    $scope.<%= crudName.toLowerCase() %>Selecionado = registro;
                };
                
                <% if (attrs.tipoVisualizacao === 'Agrupada') { %>
                    $scope.expandir = function (grupo) {
                       $scope.grupoExpandido = ($scope.grupoExpandido === grupo) ? {} : grupo;
                    };

                    $scope.titleGrupo = function (grupo) {
                       return ($scope.grupoExpandido === grupo) ? "Recolher" : "Expandir";
                    };

                    $scope.styleGrupo = function (grupo) {
                       var selecionado = {'background-color': '#cccccc', 'font-weight': 'bold', 'cursor': 'pointer'};
                       var naoSelecionado = {'background-color': '#dbdbdb', 'cursor': 'pointer'};

                       return ($scope.grupoExpandido === grupo) ? selecionado : naoSelecionado;
                    };

                    $scope.expandido = function (grupo) {
                       return $scope.grupoExpandido === grupo;
                    };
                <% } %>
            }
	]);
})();