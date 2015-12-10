(function() {
    'use strict';

    angular.module('nxApp').controller('BankFormController', BankFormController);

    function BankFormController($scope, $stateParams, BankService, $state, nxToast, $base64) {
        var vm = this;
        var idBank = $stateParams.id;

        vm.showButtonClear = BankService.hasId(idBank);
        vm.bank = BankService.findById(idBank) || {};

        vm.save = function(crud) {
            return BankService.save(crud, idBank, function() {
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
            vm.bank = {};
            $scope.bankFormulario.$setPristine(true);
            $scope.bankFormulario.$setUntouched(true);
        };

        vm.fileChanged = function(element) {
            if (element.files[0]) {
                var image = element.files[0];
                var reader = new FileReader();
                reader.onload = function(e) {
                    vm.bank.logo_name = image.name;
                    vm.bank.logo = $base64.encode(e.target.result);
                    $scope.$apply();
                };
                reader.readAsBinaryString(image);
            }
        };
    }
})();
