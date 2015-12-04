(function (){
    'use strict';

    angular.module('nxApp').controller('Formulario<%= capitalize(crudName) %>Controller', Formulario<%= capitalize(crudName) %>Controller);
    
    Formulario<%= capitalize(crudName) %>Controller.$inject = ['$scope', '$stateParams', '<%= capitalize(crudName) %>Service', '$base64',
        <%  ld.forEach(fields, function (field) {
                if (field.tipo === "Combobox") { %>
                    <%  if (field.comboboxDataFromService) { %>
                            '<%= field.comboboxService%>',
                    <%  } %>
        <%      }
            }) 
        %>];

    function Formulario<%= capitalize(crudName) %>Controller($scope, $stateParams, <%= capitalize(crudName) %>Service, $base64
        <%  ld.forEach(fields, function (field) {
                if (field.tipo === "Combobox") { %>
                    <%  if (field.comboboxDataFromService) { %>
                            , <%= field.comboboxService%>
                    <%  } %>
        <%      }
            }) 
        %>
        ) {
        var id<%= capitalize(crudName) %> = $stateParams.id;

        $scope.mostrarBotaoLimpar = <%= capitalize(crudName) %>Service.emEdicao(id<%= capitalize(crudName) %>);
        $scope.<%= crudName.toLowerCase() %>Selecionado = <%= capitalize(crudName) %>Service.buscarParaEdicao(id<%= capitalize(crudName) %>) || {};

        $scope.salvar = function (<%= crudName %>) {
                return <%= capitalize(crudName) %>Service.salvar(<%= crudName %>, id<%= capitalize(crudName) %>);
        };

        $scope.cancelar = function () {
            $scope.<%= crudName.toLowerCase() %>Selecionado = {};
            $scope.<%= crudName.toLowerCase() %>Formulario.$setPristine(true);
        };

        <%  if (hasImageField) { %>
                $scope.fileChanged = function (element, field) {
                    <%= capitalize(crudName) %>Service.fileChanged(element, function (image, e) {
                        $scope.<%= crudName.toLowerCase() %>Selecionado.nomeImagem = image.name;
                        $scope.<%= crudName.toLowerCase() %>Selecionado[field] = $base64.encode(e.target.result);
                        $scope.$apply();
                    });
                };
        <%  } %>    

        <%  ld.forEach(fields, function (field) {
                if (field.tipo === "Combobox") { %>
                    <%  if (!field.comboboxDataFromService) { %>
                            $scope.lista<%= capitalize(field.nome)%> = <%= field.comboboxData%>;
                    <%  } else { %>
                            $scope.lista<%= capitalize(field.nome)%> = <%= field.comboboxService%>.query();
                    <%  } %>
        <%      }
            }) 
        %>
    }
})();
