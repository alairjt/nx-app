'use strict';

describe('[Controller] <%= capitalize(crudName) %>FormController.js', function () {
    var $scope, $stateParams, $controller, $rootScope, $httpBackend, createController;

    var retorno = {'code': '237', 'name': 'Bradesco', 'logo_name': 'bradesco-logo.jpg'};

    beforeEach(function () {
        module('nxApp', 'nxTemplatesTest');

        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            $rootScope = $injector.get('$rootScope');
            $controller = $injector.get('$controller');

            $scope = $rootScope.$new();
            $scope.<%=crudName.toLowerCase()%>Form = {'$setPristine': function () {}, '$setUntouched': function () {}};

            createController = function () {
                return $controller('<%= capitalize(crudName) %>FormController', {
                    '$scope': $scope,
                    '$stateParams': $stateParams
                });
            };
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
        $stateParams = {id: 1};
        var ctrl = createController();
        $httpBackend.flush();
        //When
        //Then
        expect(ctrl.<%=crudName.toLowerCase()%>.code).toBe('237');
    });

    it('Deve trazer o formulário limpo', function () {
        $stateParams = {};
        var ctrl = createController();
        //When
        //Then
        expect(ctrl.<%=crudName.toLowerCase()%>.code).toBe(undefined);
    });

    it('Deve salvar o formulário', function () {
        //Given
        var data = {'code': '033', 'name': 'Santander', 'logo_name': 'santander.jpg'};
        $httpBackend.expect('POST', /.*/).respond(
            data
        );
        var ctrl = createController();
        var saved = ctrl.save(data);
        $httpBackend.flush();
        //When
        //Then
        expect(saved.code).toBe(data.code);
        expect(saved.name).toBe(data.name);
    });

    it('Deve editar o Bank', function () {
        //Given
        var data = {'code': '033', 'name': 'Santander', 'logo_name': 'santander.jpg'};
        $httpBackend.expect('GET', /.*/).respond(
            retorno
        );
        $stateParams = {id: 1};
        //When
        var ctrl = createController();
        $httpBackend.flush();
        //Then
        expect(ctrl.<%=crudName.toLowerCase()%>.code).toBe('237');
        expect(ctrl.<%=crudName.toLowerCase()%>.name).toBe('Bradesco');
        //When
        $httpBackend.expect('PUT', /.*/).respond(
            data
        );
        var saved = ctrl.save(data);
        $httpBackend.flush();
        //Then
        expect(saved.code).toBe('033');
        expect(saved.name).toBe('Santander');
    });

    it('Deve limpar o formulário', function () {
        //Given
        $httpBackend.expect('GET', /.*/).respond(
            retorno
        );
        $stateParams = {id: 1};
        //When
        var ctrl = createController();
        $httpBackend.flush();
        ctrl.clear();
        //Then
        expect(ctrl.<%=crudName.toLowerCase()%>.code).toBe(undefined);
        expect(ctrl.<%=crudName.toLowerCase()%>.name).toBe(undefined);
    });
});