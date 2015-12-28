(function () {
    'use strict';

    angular.module('approval')

    .factory('Approval', Approval);

    Approval.$inject = ['$nxResource', 'ServicesRegister'];

    function Approval($nxResource, ServicesRegister) {
        ServicesRegister.add('financialTransaction', 'plataforma-financeira-core', 'api/v1');
        ServicesRegister.financialTransaction.addResource('approval', 'approval/:id');

        return $nxResource(ServicesRegister.financialTransaction.approval.getFullPath());
    }
})();
