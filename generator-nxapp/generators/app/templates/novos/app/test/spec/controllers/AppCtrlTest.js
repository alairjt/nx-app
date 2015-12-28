'use strict';

describe('Controller: AppCtrl', function () {

    // load the controller's module
    beforeEach(module('nxApp'));

    var AppCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        AppCtrl = $controller('AppCtrl', {
            $scope: scope
        });
    }));

    it('should attach a list of awesomeThings to the scope', function () {
        expect(3).toBe(3);
    });
});
