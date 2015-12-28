var testMockRun = angular.module('testMockRun', ['base64', 'nx.angular']);

testMockRun.filter('translate', function () {
    return function (text) {
        return text;
    };
});

testMockRun.config(ServicesRegisterConfig);

ServicesRegisterConfig.$inject = ['ServicesRegisterProvider'];

function ServicesRegisterConfig(ServicesRegisterProvider) {
    ServicesRegisterProvider.init({
        apiEndPoint: 'localhost'
    });
}

testMockRun.run(function ($httpBackend) {
    window.onbeforeunload = jasmine.createSpy('onbeforeunload');

    $httpBackend.when("GET", 'translate/pt-br/messages.json').respond([]);
});
