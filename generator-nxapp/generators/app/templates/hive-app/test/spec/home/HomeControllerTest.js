'use strict';

describe('[Controller] HomeController.js', function () {
    var $scope, $controller, $rootScope, createController;
    
    beforeEach(function () {
        module('hiveApp', 'nxTemplatesTest', 'testMockRun');
        
        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $controller = $injector.get('$controller');

            $scope = $rootScope.$new();
            
            createController = function () {
                return $controller('HomeController', {
                    '$scope': $scope
                });
            };

            $scope.$digest();
        });
    });
    
    it('Deve criar o controller', function () {
        //Given
        createController();
        //When
        //Then
    });
});
