'use strict';

describe('[Controller] <%= capitalize(crudName) %>Controller', function () {
    var $scope, $controller, $rootScope, $httpBackend, createController;

    var retorno = [{'code': '237', 'name': 'Bradesco', 'logo_name': 'bradesco-logo.jpg'}];

    beforeEach(function () {
        module('nxApp', 'nxTemplatesTest');

        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            $rootScope = $injector.get('$rootScope');
            $controller = $injector.get('$controller');

            $scope = $rootScope.$new();

            createController = function () {
                return $controller('<%= capitalize(crudName) %>Controller');
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
        expect(ctrl.config.query.page).toBe(1);
        expect(ctrl.config.query.limit).toBe(10);
    });

    it('Deve filtrar os <%= capitalize(crudName) %>', function () {
        //Given
        $httpBackend.expect('GET', /.*/).respond(
            retorno
        );
        var ctrl = createController();
        $httpBackend.flush();
        //When
        var filtered = ctrl.filter('Bradesco');

        //Then
        expect(filtered.length).toBe(1);
        expect(filtered[0].code).toBe('237');
        expect(filtered[0].name).toBe('Bradesco');
    });

    it('Deve não trazer <%= capitalize(crudName) %>', function () {
        //Given
        $httpBackend.expect('GET', /.*/).respond(
            retorno
        );
        var ctrl = createController();
        $httpBackend.flush();
        //When
        var filtered = ctrl.filter('Santander');

        //Then
        expect(filtered.length).toBe(0);
    });
});