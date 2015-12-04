'use strict';

describe('[Controller] Formulario<%= capitalize(crudName) %>Controller.js', function () {
    var $scope, $controller, $rootScope, $httpBackend, createController;
    
    var retorno = [{id: 1, nomeBanco: 'nome1'}, {id: 2, nomeBanco: 'nome2'}];

    beforeEach(function () {
        module('nxApp');
        
        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            $rootScope = $injector.get('$rootScope');
            $controller = $injector.get('$controller');

            $scope = $rootScope.$new();
            
            createController = function () {
                return $controller('Formulario<%= capitalize(crudName) %>Controller', {
                    '$scope': $scope
                });
            };

            $scope.$digest();
        });
    });
    
    afterEach(function () {
//        $httpBackend.verifyNoOutstandingExpectation();
//        $httpBackend.verifyNoOutstandingRequest();
//        $httpBackend.resetExpectations();
    });

    it('Deve iniciar as variáveis', function () {
//        var ctrl = createController();
    });
});
