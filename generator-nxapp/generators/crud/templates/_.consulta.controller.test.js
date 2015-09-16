'use strict';

describe('[Controller] Consulta<%= capitalize(crudName) %>Controller.js', function () {
    var $scope, $controller, $rootScope, $httpBackend, createController;
    
    var retorno = [{id: 1, descricao: 'descricao1'}, {id: 2, descricao: 'descricao2'}];

    beforeEach(function () {
        module('hiveApp', 'nxTemplatesTest', 'testMockRun');
        
        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            $rootScope = $injector.get('$rootScope');
            $controller = $injector.get('$controller');

            $scope = $rootScope.$new();
            
            createController = function () {
                return $controller('Consulta<%= capitalize(crudName) %>Controller', {
                    '$scope': $scope
                });
            };

            $scope.$digest();
        });
    });
    
    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.resetExpectations();
    });

    it('Deve iniciar as variáveis', function () {
        //Given
        $httpBackend.expect('GET', /.*/).respond(
            retorno
        );
        var ctrl = createController();
        $httpBackend.flush();
        //When
        //Then
        expect(ctrl.lista<%= capitalize(crudName) %>.length).toBe(2);
        expect($scope.criterio).toEqual("");
        expect($scope.campoOrderBy).toEqual("");
        expect($scope.reverse).toEqual(false);
        expect($scope.currentPage).toEqual(1);
        expect($scope.pageSize).toEqual(10);
    });

    it('Deve filtrar os <%= capitalize(crudName) %>', function () {
        //Given
        $httpBackend.expect('GET', /.*/).respond(
            retorno
        );
        var ctrl = createController();
        $httpBackend.flush();
        //When
        $scope.criterio = '2';
        $scope.$apply();
        var filtered = ctrl.filtrar(ctrl.lista<%= capitalize(crudName) %>);
        //Then
        expect(filtered.length).toBe(1);
        expect(filtered[0].id).toBe(2);
        expect(filtered[0].descricao).toBe("descricao2");
    });
});
