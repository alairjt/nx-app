(function() {
    'use strict';

    angular.module('nxApp').factory('Bank', Bank);

    function Bank($nxResource, ServicesRegister) {
        ServicesRegister.bancoService.addResource('bancos', 'bancos/:id');

        return $nxResource(ServicesRegister.bancoService.bancos.getFullPath());
    }
})();
