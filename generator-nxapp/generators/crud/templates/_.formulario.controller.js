(function() {
    'use strict';

    angular.module('nxApp').controller('<%= capitalize(crudName) %>FormController', <%= capitalize(crudName) %>FormController);

    function <%= capitalize(crudName) %>FormController($scope, $stateParams, <%= capitalize(crudName) %>Service, $state, nxToast
                <%  if (hasImageField) { %>
                    , $base64
                <%  } %>
                <%  ld.forEach(fields, function (field) {
                        if (field.tipo === "Combobox") { %>
                            <%  if (field.comboboxDataFromService) { %>
                                    , <%= field.comboboxService%>
                            <%  } %>
                <%      }
                    }) 
                %>
            ) {
        var vm = this;
        var id<%= capitalize(crudName) %> = $stateParams.id;

        vm.showButtonClear = <%= capitalize(crudName) %>Service.hasId(id<%= capitalize(crudName) %>);
        vm.<%=crudName.toLowerCase()%> = <%= capitalize(crudName) %>Service.findById(id<%= capitalize(crudName) %>) || {};

        vm.save = function(crud) {
            return <%= capitalize(crudName) %>Service.save(crud, id<%= capitalize(crudName) %>, function() {
                vm.showToastSave();
            });
        };

        vm.showToastSave = function() {
            nxToast.show('Salvo com sucesso').then(
                function() {
                    $state.go($state.current.transition || $state.current.name);
                }
            );
        };

        vm.cancel = function() {
            $state.go($state.current.transition);
        };

        vm.clear = function() {
            vm.<%=crudName.toLowerCase()%> = {};
            $scope.<%=crudName.toLowerCase()%>Form.$setPristine(true);
            $scope.<%=crudName.toLowerCase()%>Form.$setUntouched(true);
        };

        <%  if (hasImageField) { %>
            //@TODO: Componentizar
            vm.fileChanged = function(element) {
                if (element.files[0]) {
                    var image = element.files[0];
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        vm.<%=crudName.toLowerCase()%>.logo_name = image.name;
                        vm.<%=crudName.toLowerCase()%>.logo = $base64.encode(e.target.result);
                        $scope.$apply();
                    };
                    reader.readAsBinaryString(image);
                }
            };
        <%  } %>
    
        <%  ld.forEach(fields, function (field) {
                if (field.tipo === "Combobox") { %>
                    <%  if (!field.comboboxDataFromService) { %>
                            vm.list<%= capitalize(field.nome)%> = <%= field.comboboxData%>;
                    <%  } else { %>
                            vm.list<%= capitalize(field.nome)%> = <%= field.comboboxService%>.query();
                    <%  } %>
        <%      }
            }) 
        %>
    }
})();