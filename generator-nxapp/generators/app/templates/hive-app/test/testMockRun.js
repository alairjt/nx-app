var testMockRun = angular.module('testMockRun', ['base64']);

testMockRun .run(function ($httpBackend) {
    window.onbeforeunload = jasmine.createSpy('onbeforeunload');
    
    $httpBackend.when("GET", 'translate/pt-br/messages.json').respond([]);
});